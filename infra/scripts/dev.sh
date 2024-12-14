#!/bin/bash

# Copy environment file if it doesn't exist
if [ ! -f .env ]; then
    cp .env.example .env
fi

# Start services
docker-compose up -d

# Show services status
docker-compose ps 