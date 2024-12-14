#!/bin/bash

# Define the domains
DOMAINS=(
    "safesurf.local"
    "www.safesurf.local"
    "api.safesurf.local"
    "admin.safesurf.local"
)

# Path to hosts file
HOSTS_FILE="/etc/hosts"

# Check if script is run as root
if [ "$EUID" -ne 0 ]; then 
    echo "Please run as root (use sudo)"
    exit 1
fi

# Remove old entries
echo "Removing old entries..."
for domain in "${DOMAINS[@]}"; do
    sed -i '' "/${domain}/d" $HOSTS_FILE 2>/dev/null || sed -i "/${domain}/d" $HOSTS_FILE
done

# Add new entries
echo "Adding new entries..."
for domain in "${DOMAINS[@]}"; do
    echo "127.0.0.1 ${domain}" >> $HOSTS_FILE
done

# Flush DNS cache based on OS
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    dscacheutil -flushcache
    killall -HUP mDNSResponder
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    if [ -f /etc/debian_version ]; then
        # Debian/Ubuntu
        systemd-resolve --flush-caches
    elif [ -f /etc/redhat-release ]; then
        # RHEL/CentOS
        systemctl restart NetworkManager
    fi
fi

echo "Setup completed! Local domains configured:"
for domain in "${DOMAINS[@]}"; do
    echo "- ${domain}"
done 