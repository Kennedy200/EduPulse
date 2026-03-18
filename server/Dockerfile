# Use Python 3.11
FROM docker.io/library/python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y build-essential libpq-dev && rm -rf /var/lib/apt/lists/*

# IMPORTANT: We are pointing to the server folder specifically
COPY server/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install gunicorn whitenoise

# Copy everything from the server folder into the container
COPY server/ .

# Collect static files
RUN python manage.py collectstatic --noinput

# We use a shell command to run migrations, create the admin, and then start Gunicorn
CMD python manage.py migrate && python create_admin.py && gunicorn --bind 0.0.0.0:8000 core.wsgi:application
