# Use official Python image
FROM python:3.9

# Set working directory
WORKDIR /app

# Copy requirements.txt first to install dependencies before copying other files
COPY requirements.txt /app/

# Install dependencies
RUN pip install -r requirements.txt

# Now copy the rest of the application files
COPY . /app

# Expose the port Cloud Run uses
EXPOSE 8080

# Run the application
CMD ["gunicorn", "-w", "4", "-k", "eventlet", "-b", "0.0.0.0:8080", "wsgi:app"]
