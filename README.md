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
├── infra/           # Infrastructure configuration
└── deployment/      # Deployment scripts and configurations
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

## Quick Start

### Prerequisites
- Docker and Docker Compose
- Make
- Node.js 20.x
- sudo access (for local domain setup)

### Initial Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-name>
```

2. Configure local environment:
```bash
cd infra
make setup-all     # Sets up security, hosts, and SSL certificates
```

3. Start development environment:
```bash
make dev          # Start without Sentry
```

### Available Make Commands

```bash
# Development
make dev              # Start development environment
make dev-build        # Rebuild and start development environment
make dev-down         # Stop development environment
make dev-setup        # Setup hosts and start development environment

# Production
make prod             # Start production environment
make prod-build       # Rebuild and start production environment
make prod-down        # Stop production environment
make prod-setup       # Setup hosts and start production environment

# Setup
make setup-hosts      # Setup local hosts
make setup-security   # Setup security configurations
make setup-all        # Setup everything

# Utilities
make logs             # View logs
make clean            # Remove all containers and volumes
make help             # Show this help message
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

Production URLs:
- Website: https://safesurf.tech
- Admin Panel: https://admin.safesurf.tech
- API: https://api.safesurf.tech

## Features

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

### Development Tools
- Mailhog (Email testing)
- Swagger UI (API documentation)

## Contributing

1. Create a feature branch
2. Commit your changes
3. Push to the branch
4. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
