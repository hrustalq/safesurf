#!/bin/bash

# Exit on error
set -e

# Configuration
DEPLOY_PATH="/var/www/safesurf"
REPOSITORY="git@github.com:hrustalq/safesurf.git"

echo "Starting deployment..."

# Connect to server and execute deployment
ssh $DEPLOY_USER@$DEPLOY_HOST bash -s << 'ENDSSH'
    # Update deployment path
    cd $DEPLOY_PATH

    # Pull latest changes
    git pull origin main

    # Load environment variables
    source .env

    # Build and deploy services
    cd infra

    # Backup database
    ./scripts/backup-db.sh

    # Deploy with zero downtime
    docker-compose -f docker-compose.yml pull
    docker-compose -f docker-compose.yml up -d --remove-orphans

    # Clean up old images
    docker image prune -f

    echo "Deployment completed successfully!"
ENDSSH 