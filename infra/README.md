# Infrastructure Setup

This directory contains all infrastructure configurations for our applications.

## Services

### Core Services
- PostgreSQL (Database)
- Redis (Cache & Queue)
- MinIO (S3-compatible storage)
- Nginx (Reverse proxy)

### Monitoring & Logging
- Elasticsearch (Logging)
- Kibana (Log visualization)
- Prometheus (Metrics)
- Grafana (Monitoring)
- Sentry (Error tracking)

### Development Tools
- Mailhog (Email testing)
- Swagger UI (API documentation)

## Quick Start

1. Copy environment file:
```bash
cp .env.example .env
# Edit .env with your configurations
```

2. Set up local hosts and SSL certificates:
```bash
# Setup local hosts (requires sudo)
sudo make setup-hosts

# Generate SSL certificates for local development
make setup-ssl
```

3. Run development environment:
```bash
make dev
# or with rebuilding
make dev-build
```

4. Apply database migrations:
```bash
# Apply existing migrations
make migrate

# Create new migration (in development)
make migrate-dev

# Reset database (caution: deletes all data)
make migrate-reset
```

## Development URLs
After setup, the following URLs will be available:
- Web: https://safesurf.local
- Admin: https://admin.safesurf.local
- API: https://api.safesurf.local
- Swagger: https://api.safesurf.local/docs

## Available Commands

### Development Environment
```bash
make dev              # Start development environment
make dev-build        # Rebuild and start development environment
make dev-down         # Stop development environment
make dev-setup        # Setup hosts and start development environment
```

### Production Environment
```bash
make prod             # Start production environment
make prod-build       # Rebuild and start production environment
make prod-down        # Stop production environment
make prod-setup       # Setup hosts and start production environment
```

### Sentry Integration
```bash
make sentry-setup     # Setup Sentry
make sentry-start     # Start Sentry services
make sentry-stop      # Stop Sentry services
make dev-with-sentry  # Start development with Sentry
make prod-with-sentry # Start production with Sentry
```

### Setup Commands
```bash
make setup-hosts      # Setup local hosts
make setup-security   # Setup security configurations
make setup-all        # Setup everything
```

### Utility Commands
```bash
make logs             # View logs
make clean            # Remove all containers and volumes
make help             # Show help message
```

## Service URLs

### Development
- API: https://api.safesurf.local
- Admin Panel: https://admin.safesurf.local
- Public Website: https://safesurf.local
- Swagger: https://api.safesurf.local/docs
- Mailhog: http://localhost:8025
- Kibana: http://localhost:5601
- Grafana: http://localhost:3001
- Sentry: http://localhost:9000

### Production
- API: https://api.safesurf.tech
- Admin Panel: https://admin.safesurf.tech
- Public Website: https://safesurf.tech

## Security Setup

The infrastructure includes comprehensive security measures:

### Firewall Configuration
- Denies all incoming traffic by default
- Allows only necessary ports (SSH, HTTP, HTTPS)
- Configures stateful packet inspection

### SSH Hardening
- Disables root login
- Enforces key-based authentication
- Limits authentication attempts
- Sets secure connection timeouts

### System Security
- Protection against IP spoofing
- SYN attack protection
- ICMP broadcast protection
- Martian packet logging
- Redirect protection
- Shared memory security

### Brute Force Protection
- Fail2ban configuration
- Automatic IP banning
- Customizable ban times and thresholds

## Sentry Setup

We use the official Sentry self-hosted setup:

### Requirements
- 4 CPU Cores
- 16GB RAM
- 20GB Free Disk Space

### Configuration
- Event retention: 30 days (configurable in .env)
- Uses dedicated PostgreSQL and Redis instances
- Automatic error reporting
- Performance monitoring

## SSL Certificates

### Development
1. Generate certificates:
```bash
./scripts/generate-ssl.sh
```

2. Trust certificates:
- **macOS**: Add to Keychain Access
- **Linux**: Add to /usr/local/share/ca-certificates/

### Production
Uses Let's Encrypt certificates managed by Certbot

## Monitoring Stack

### Prometheus
- Metrics collection
- Alert configuration
- Service discovery

### Grafana
- Metrics visualization
- Dashboard templates
- Alert management

### Elasticsearch & Kibana
- Log aggregation
- Log search and analysis
- Visualization

## Backup and Restore

### Database Backups
- Automatic daily backups
- 7-day retention
- Compressed storage

### Restore Procedure
```bash
# Decompress backup
gunzip backup_file.sql.gz

# Restore to database
docker-compose exec -T postgres psql -U postgres < backup_file.sql
```

## Troubleshooting

### View Logs
```bash
make logs
```

### Check Service Status
```bash
docker-compose ps
```

### Reset Environment
```bash
make clean
make dev-build  # or prod-build
```
