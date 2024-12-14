#!/bin/sh

# Run migrations
echo "Running database migrations..."
npx prisma migrate deploy

# Generate Prisma Client (if needed)
echo "Generating Prisma Client..."
npx prisma generate

# Start the application
echo "Starting the application..."
exec "$@" 