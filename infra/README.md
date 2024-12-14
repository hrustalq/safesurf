# Infrastructure Setup

This directory contains all infrastructure configurations for our applications.

## Services
- PostgreSQL (Database)
- Redis (Cache & Queue)
- MinIO (S3-compatible storage)
- Mailhog (Email testing)
- Nginx (Reverse proxy)
- Elasticsearch (Logging)
- Kibana (Log visualization)
- Prometheus (Metrics)
- Grafana (Monitoring)
- Sentry (Error Tracking)

## Development Setup
1. Copy `.env.example` to `.env`
2. Run development environment:
   ```bash
   npm run dev
   ```
   Or with rebuilding:
   ```bash
   npm run dev:build
   ```

3. Access services:
   - API: http://localhost:3000
   - Admin Panel: http://admin.localhost
   - Public Website: http://localhost
   - Swagger: http://localhost:3000/api/docs
   - Mailhog: http://localhost:8025
   - Kibana: http://localhost:5601
   - Grafana: http://localhost:3001

## Development Setup with Sentry
1. Copy `.env.example` to `.env` and configure Sentry variables
2. Run:
   ```bash
   npm run dev:with-sentry
   npm run sentry:init
   ```
3. Access Sentry at http://localhost:9000

## Production Setup
1. Configure production environment variables
2. Run:
   ```bash
   npm run prod
   ```
   Or with rebuilding:
   ```bash
   npm run prod:build
   ```

## Production Setup with Sentry
1. Configure Sentry environment variables
2. Run:
   ```bash
   npm run prod:with-sentry
   npm run sentry:init
   ```

## Commands
- `npm run dev` - Start development environment
- `npm run dev:build` - Rebuild and start development environment
- `npm run dev:down` - Stop development environment
- `npm run prod` - Start production environment
- `npm run prod:build` - Rebuild and start production environment
- `npm run prod:down` - Stop production environment
- `npm run logs` - View logs
- `npm run clean` - Remove all containers and volumes

## Development vs Production
### Development
- Hot reloading enabled
- Source maps
- Volume mounts for local development
- Debug logging
- All services exposed for debugging
- Mailhog for email testing

### Production
- Optimized builds
- Minimal container sizes
- Security hardening
- Proper process management
- Limited port exposure
- Real email service

# Additional Setup

## Local Development Setup

1. Configure local domains:
```bash
npm run setup:hosts
```

2. Generate SSL certificates:
```bash
./scripts/generate-ssl.sh
```

3. Trust the SSL certificate:
   - macOS: Add nginx/ssl/safesurf.crt to Keychain Access
   - Linux: Add to /usr/local/share/ca-certificates/ and run update-ca-certificates

4. Start development environment:
```bash
npm run dev:setup
```

## Accessing Services

Development URLs:
- Website: https://safesurf.local
- Admin Panel: https://admin.safesurf.local
- API: https://api.safesurf.local

Production URLs:
- Website: https://safesurf.tech
- Admin Panel: https://admin.safesurf.tech
- API: https://api.safesurf.tech

## Security Setup

The infrastructure includes a security setup script that configures various security measures on the host machine:

1. Run security setup:
```bash
npm run setup:security
```

This script configures:
- Firewall rules (UFW/firewalld)
- SSH hardening
- System security settings
- Fail2ban for brute force protection
- Secure shared memory
- Network security parameters

### Security Features

- **Firewall Configuration**:
  - Denies all incoming traffic by default
  - Allows only necessary ports (SSH, HTTP, HTTPS)
  - Configures stateful packet inspection

- **SSH Hardening**:
  - Disables root login
  - Enforces key-based authentication
  - Limits authentication attempts
  - Sets secure connection timeouts

- **System Security**:
  - Protection against IP spoofing
  - SYN attack protection
  - ICMP broadcast protection
  - Martian packet logging
  - Redirect protection
  - Shared memory security

- **Brute Force Protection**:
  - Fail2ban configuration
  - Automatic IP banning
  - Customizable ban times and thresholds

### Post-Setup Steps

1. Review the changes in:
   - `/etc/ssh/sshd_config`
   - `/etc/sysctl.d/99-security.conf`
   - `/etc/fail2ban/jail.local`

2. Ensure your SSH key is properly configured before logging out

3. Restart the system to apply all changes:
```bash
sudo reboot
```
