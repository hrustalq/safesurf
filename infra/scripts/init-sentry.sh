#!/bin/bash

# Wait for Sentry to be ready
echo "Waiting for Sentry to be ready..."
sleep 30

# Create initial user
docker-compose exec -T sentry sentry createuser \
  --email admin@example.com \
  --password password \
  --superuser --no-input

# Initialize database
docker-compose exec -T sentry sentry upgrade --noinput 