# Use official Python image
FROM python:3.9

# Set working directory
WORKDIR /app

# Copy project files
COPY . /app

# Install dependencies
RUN pip install -r requirements.txt

# Expose the port Cloud Run uses
EXPOSE 8080

# Run the application
CMD ["gunicorn", "-w", "4", "-k", "eventlet", "-b", "0.0.0.0:8080", "wsgi:app"]
