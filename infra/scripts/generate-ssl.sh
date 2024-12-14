#!/bin/bash

# Directory for SSL certificates
SSL_DIR="nginx/ssl"
mkdir -p $SSL_DIR

# Generate self-signed certificate for development
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout $SSL_DIR/safesurf.key \
    -out $SSL_DIR/safesurf.crt \
    -subj "/C=US/ST=State/L=City/O=Organization/CN=*.safesurf.local"

echo "SSL certificates generated in $SSL_DIR" 