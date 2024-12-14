#!/bin/bash

# Wait for database to be ready
echo "Waiting for database to be ready..."
until docker-compose -f docker-compose.dev.yml exec -T postgres pg_isready -U ${POSTGRES_USER:-postgres} > /dev/null 2>&1; do
  echo -n "."
  sleep 1
done
echo "Database is ready!"

# Run migrations
echo "Running database migrations..."
docker-compose -f docker-compose.dev.yml exec -T api npx prisma migrate deploy

# Generate Prisma Client
echo "Generating Prisma Client..."
docker-compose -f docker-compose.dev.yml exec -T api npx prisma generate

echo "Migration completed successfully!" 