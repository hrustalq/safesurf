#!/bin/bash

# Configuration
BACKUP_DIR="/var/backups/safesurf/postgres"
KEEP_DAYS=7

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Generate timestamp
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Create backup
docker-compose exec -T postgres pg_dumpall -U postgres > "$BACKUP_DIR/backup_$TIMESTAMP.sql"

# Compress backup
gzip "$BACKUP_DIR/backup_$TIMESTAMP.sql"

# Remove old backups
find $BACKUP_DIR -type f -mtime +$KEEP_DAYS -delete

echo "Database backup completed: backup_$TIMESTAMP.sql.gz" 