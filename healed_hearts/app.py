
from flask import Flask, render_template, request, jsonify, session
import sqlite3
from flask_session import Session
from flask_socketio import SocketIO, join_room, leave_room
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import random
from textblob import TextBlob
from langdetect import detect

app = Flask(__name__)
app.secret_key = 'your_secret_key'
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)

socketio = SocketIO(app, manage_session=False)
limiter = Limiter(get_remote_address, app=app, default_limits=["200 per second"])

active_chats = {}

def get_db_connection():
    conn = sqlite3.connect('database.db', check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn

with get_db_connection() as conn:
    conn.execute('''CREATE TABLE IF NOT EXISTS stories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        image_url TEXT,
        story_text TEXT,
        likes INTEGER DEFAULT 0
    )''')
    conn.execute('''CREATE TABLE IF NOT EXISTS flagged_attempts (
        username TEXT PRIMARY KEY,
        attempts INTEGER DEFAULT 0
    )''')
    conn.commit()

def is_story_safe(story_text):
    try:
        if detect(story_text) != 'en':
            return False, "Stories must be written in English."
        analysis = TextBlob(story_text)
        if any(word in story_text.lower() for word in ["kill", "hate", "abuse", "violence"]):
            return False, "Stories with violent or abusive language are not allowed."
        if analysis.sentiment.polarity < -0.5:
            return False, "Stories with extremely negative sentiment are not allowed."
        return True, "Story is safe to post."
    except Exception as e:
        return False, f"Error in processing story: {str(e)}"

@app.route('/')
def index():
    conn = get_db_connection()
    stories = conn.execute('SELECT * FROM stories ORDER BY id DESC').fetchall()
    conn.close()
    return render_template('index.html', stories=stories)

@app.route('/post-story', methods=['GET', 'POST'])
@limiter.limit("10 per minute")
def post_story():
    if request.method == 'POST':
        username = session.get('username', f"User_{random.randint(1000, 9999)}")
        image_url = request.form.get('image_url', '/static/images/story_placeholder.png')
        story_text = request.form.get('story_text')
        is_safe, message = is_story_safe(story_text)
        conn = get_db_connection()
        if not is_safe:
            attempts = conn.execute('SELECT attempts FROM flagged_attempts WHERE username = ?', (username,)).fetchone()
            if attempts:
                new_attempts = attempts['attempts'] + 1
                conn.execute('UPDATE flagged_attempts SET attempts = ? WHERE username = ?', (new_attempts, username))
            else:
                new_attempts = 1
                conn.execute('INSERT INTO flagged_attempts (username, attempts) VALUES (?, ?)', (username, new_attempts))
            conn.commit()
            conn.close()
            if new_attempts >= 5:
                return jsonify({"status": "blocked", "message": "Your account is blocked due to repeated inappropriate content."}), 403
            return jsonify({"status": "error", "message": message, "attempts": new_attempts}), 400
        conn.execute('INSERT INTO stories (username, image_url, story_text) VALUES (?, ?, ?)', (username, image_url, story_text))
        conn.commit()
        conn.close()
        return jsonify({"status": "success", "message": "Story posted successfully."})
    return render_template('post_story.html')

@socketio.on('join_chat')
def handle_join_chat(data):
    username = session.get('username')
    if 'room' not in session:
        if len(active_chats) > 0:
            for room, users in active_chats.items():
                if len(users) == 1:
                    session['room'] = room
                    join_room(room)
                    active_chats[room].append(username)
                    socketio.emit('chat_started', {'room': room}, to=room)
                    return
        room = f"room_{random.randint(1000, 9999)}"
        session['room'] = room
        join_room(room)
        active_chats[room] = [username]

@socketio.on('send_message')
def handle_send_message(data):
    room = session.get('room')
    if room:
        socketio.emit('receive_message', {
            'username': session['username'],
            'message': data['message']
        }, to=room)

@socketio.on('leave_chat')
def handle_leave_chat():
    room = session.get('room')
    if room in active_chats:
        leave_room(room)
        active_chats[room].remove(session['username'])
        if len(active_chats[room]) == 0:
            del active_chats[room]
        session.pop('room', None)
        socketio.emit('user_left', {'username': session['username']}, to=room)

if __name__ == "__main__":
    socketio.run(app, debug=True, threaded=True, host="0.0.0.0", port=8080)
