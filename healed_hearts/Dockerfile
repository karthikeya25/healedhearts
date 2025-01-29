# Use official Python image
FROM python:3.9

# Set working directory inside the container
WORKDIR /app

# Copy only requirements.txt first (for better caching)
COPY requirements.txt /app/requirements.txt

# Install dependencies
RUN pip install --no-cache-dir -r /app/requirements.txt

# Now copy the rest of the application files
COPY . /app

# Expose the port Cloud Run uses
EXPOSE 8080

# Run the application with proper startup command
CMD ["gunicorn", "-w", "1", "-k", "eventlet", "-b", "0.0.0.0:8080", "wsgi:app"]
