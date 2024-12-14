# VPN Management Platform

![Deploy](https://github.com/hrustalq/safesurf/actions/workflows/deploy.yml/badge.svg)

A comprehensive platform for managing VPN services, built with modern technologies and best practices.

## Project Structure
```
.
├── backend/
│   └── api/          # NestJS API service
├── frontend/
│   ├── admin/        # Admin Panel (React + Vite)
│   └── web/          # Public Website (Next.js)
└── infra/           # Infrastructure configuration
```

## Domain Structure

### Production
- Website: https://safesurf.tech
- Admin Panel: https://admin.safesurf.tech
- API: https://api.safesurf.tech

### Development
- Website: https://safesurf.local
- Admin Panel: https://admin.safesurf.local
- API: https://api.safesurf.local

## Applications

### Backend API (NestJS)
- RESTful API with OpenAPI/Swagger documentation
- Role-based access control (RBAC)
- API versioning via headers
- Request validation and transformation
- Standardized response format
- Circuit breaker pattern
- Rate limiting
- Comprehensive error handling
- Email templating with Handlebars
- Multi-language support
- Logging with Pino
- Health checks
- Database migrations with Prisma
- Bull for job queues
- Error tracking with Sentry

### Admin Panel (React + Vite)
- Material UI components
- React Query for data fetching
- TanStack Router for routing
- Type-safe API client
- Real-time monitoring
- Configuration management
- User management
- VPN service management

### Public Website (Next.js)
- Server-side rendering
- Internationalization
- Tailwind CSS for styling
- Authentication with NextAuth
- Responsive design
- SEO optimization

## Infrastructure Services

### Core Services
- PostgreSQL (Database)
- Redis (Cache & Queue)
- MinIO (S3-compatible storage)
- Nginx (Reverse proxy with SSL)

### Monitoring & Logging
- Elasticsearch (Logging)
- Kibana (Log visualization)
- Prometheus (Metrics)
- Grafana (Monitoring)
- Sentry (Error tracking)

### Development Tools
- Mailhog (Email testing)
- Swagger UI (API documentation)

## Getting Started

### Prerequisites
- Docker and Docker Compose
- Node.js 20.x
- npm or yarn
- sudo access (for local domain setup)

### Initial Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-name>
```

2. Configure local domains and SSL:
```bash
cd infra
npm run setup:hosts     # Sets up local domain names
./scripts/generate-ssl.sh  # Generates SSL certificates
```

3. Trust SSL Certificate:
   - **macOS**: 
     - Open Keychain Access
     - Import `infra/nginx/ssl/safesurf.crt`
     - Trust the certificate for SSL
   - **Linux**: 
     ```bash
     sudo cp infra/nginx/ssl/safesurf.crt /usr/local/share/ca-certificates/
     sudo update-ca-certificates
     ```

4. Start development environment:
```bash
npm run dev:setup
```

### Development Environment

Start individual services:

```bash
# API
cd backend/api
npm install
npm run start:dev

# Admin Panel
cd frontend/admin
npm install
npm run dev

# Public Website
cd frontend/web
npm install
npm run dev
```

### Production Deployment

1. Configure environment variables:
```bash
cd infra
cp .env.example .env
# Edit .env with production configurations
```

2. Start all services:
```bash
npm run prod:setup
```

### Access Services

Development URLs:
- Website: https://safesurf.local
- Admin Panel: https://admin.safesurf.local
- API: https://api.safesurf.local
- API Documentation: https://api.safesurf.local/docs
- Mailhog: http://localhost:8025
- Kibana: http://localhost:5601
- Grafana: http://localhost:3001
- Sentry: http://localhost:9000

Production URLs:
- Website: https://safesurf.tech
- Admin Panel: https://admin.safesurf.tech
- API: https://api.safesurf.tech

## Development

### Available Scripts

Infrastructure:
```bash
# Development
npm run dev:setup     # Setup hosts and start development environment
npm run dev:build     # Rebuild and start development environment
npm run dev:down      # Stop development environment

# Production
npm run prod:setup    # Setup hosts and start production environment
npm run prod:build    # Rebuild and start production environment
npm run prod:down     # Stop production environment

# Utilities
npm run logs          # View logs
npm run clean         # Remove all containers and volumes
```

### Documentation

- [Backend API Documentation](backend/api/README.md)
- [Admin Panel Documentation](frontend/admin/README.md)
- [Public Website Documentation](frontend/web/README.md)
- [Infrastructure Documentation](infra/README.md)

## Contributing

1. Create a feature branch
2. Commit your changes
3. Push to the branch
4. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Deployment

### Prerequisites
1. A server running Ubuntu 20.04 or later
2. Domain names configured with DNS
3. GitHub repository access

### Initial Server Setup
1. SSH into your server
2. Clone the repository
3. Run the setup script:
```bash
./deployment/scripts/setup-server.sh
```

### GitHub Actions Setup
1. Go to repository Settings > Secrets
2. Add the following secrets:
   - `SSH_PRIVATE_KEY`: Your deployment SSH private key
   - `SSH_KNOWN_HOSTS`: Server SSH known hosts
   - `DEPLOY_HOST`: Your server hostname
   - `DEPLOY_USER`: Your server username

### Manual Deployment
```bash
./deployment/scripts/deploy.sh
```

### Backup and Restore
- Automatic daily backups are configured
- Backups are stored in `/var/backups/safesurf/postgres`
- To restore a backup:
```bash
gunzip backup_file.sql.gz
docker-compose exec -T postgres psql -U postgres < backup_file.sql
```
