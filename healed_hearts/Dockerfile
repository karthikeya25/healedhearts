# Use official Python image
FROM python:3.9

# Set working directory
WORKDIR /app

# Copy the application files (without installing dependencies yet)
COPY . /app

# Expose the port Cloud Run uses
EXPOSE 8080

# Install dependencies when the container starts
CMD pip install --no-cache-dir flask flask-session flask-socketio flask-limiter textblob langdetect eventlet gunicorn && \
    gunicorn -w 4 -k eventlet -b 0.0.0.0:8080 wsgi:app
