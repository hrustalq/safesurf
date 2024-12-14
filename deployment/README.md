# Deployment Configuration

## Required GitHub Secrets

### Basic Configuration
- `SSH_PRIVATE_KEY`: SSH private key for deployment
- `SSH_KNOWN_HOSTS`: Server SSH known hosts
- `DEPLOY_HOST`: Server hostname
- `DEPLOY_USER`: Server username

### Security Configuration
- `SSH_PORT`: Custom SSH port (default: 22)
- `UFW_ALLOWED_PORTS`: Comma-separated list of allowed ports (default: "80,443")
- `FAIL2BAN_FINDTIME`: Time window for fail2ban (default: 600)
- `FAIL2BAN_BANTIME`: Ban duration in seconds (default: 3600)
- `FAIL2BAN_MAXRETRY`: Maximum retry attempts (default: 3)
- `SSH_MAX_AUTH_TRIES`: Maximum SSH authentication attempts (default: 3)
- `SSH_CLIENT_ALIVE_INTERVAL`: SSH keepalive interval (default: 300)
- `SSH_CLIENT_ALIVE_COUNT_MAX`: Maximum SSH keepalive count (default: 2)

## Setting Up Secrets

1. Go to your GitHub repository
2. Navigate to Settings > Secrets and variables > Actions
3. Click "New repository secret"
4. Add each required secret

Example values:
```bash
SSH_PORT=2222
UFW_ALLOWED_PORTS=80,443,8080,3000
FAIL2BAN_FINDTIME=600
FAIL2BAN_BANTIME=7200
FAIL2BAN_MAXRETRY=3
SSH_MAX_AUTH_TRIES=3
SSH_CLIENT_ALIVE_INTERVAL=300
SSH_CLIENT_ALIVE_COUNT_MAX=2
``` 