# Use official Python image
FROM python:3.9

# Set working directory
WORKDIR /app

# Copy the requirements file first
COPY requirements.txt /app/requirements.txt  # ✅ Fix: Ensure correct file path

# Install dependencies
RUN pip install --no-cache-dir -r /app/requirements.txt

# Now copy the rest of the application files
COPY . /app

# Expose the port Cloud Run uses
EXPOSE 8080

# Run the application
CMD ["gunicorn", "-w", "4", "-k", "eventlet", "-b", "0.0.0.0:8080", "wsgi:app"]
