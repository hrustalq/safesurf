#!/bin/bash

# Exit on error
set -e

# Update system
apt-get update
apt-get upgrade -y

# Install required packages
apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release \
    nginx \
    certbot \
    python3-certbot-nginx

# Setup security configurations
./setup-security.sh

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/download/v2.23.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Create deployment directory
mkdir -p /var/www/safesurf
chown -R $USER:$USER /var/www/safesurf

# Setup Nginx
rm /etc/nginx/sites-enabled/default
cp deployment/configs/nginx.conf /etc/nginx/sites-available/safesurf.conf
ln -s /etc/nginx/sites-available/safesurf.conf /etc/nginx/sites-enabled/

# Generate DH parameters
mkdir -p /etc/nginx/ssl
openssl dhparam -out /etc/nginx/ssl/dhparam.pem 2048

# Copy SSL configurations
cp deployment/configs/ssl-params.conf /etc/nginx/snippets/
cp deployment/configs/proxy-params.conf /etc/nginx/snippets/

# Setup SSL certificates
certbot --nginx -d safesurf.tech -d www.safesurf.tech -d api.safesurf.tech -d admin.safesurf.tech

# Restart Nginx
systemctl restart nginx

echo "Server setup completed!" 