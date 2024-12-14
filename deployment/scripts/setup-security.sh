#!/bin/bash

# Exit on error
set -e

echo "Starting security setup..."

# Default values if not set in environment
SSH_PORT=${SSH_PORT:-22}
UFW_ALLOWED_PORTS=${UFW_ALLOWED_PORTS:-"80,443"}
FAIL2BAN_FINDTIME=${FAIL2BAN_FINDTIME:-600}
FAIL2BAN_BANTIME=${FAIL2BAN_BANTIME:-3600}
FAIL2BAN_MAXRETRY=${FAIL2BAN_MAXRETRY:-3}
SSH_MAX_AUTH_TRIES=${SSH_MAX_AUTH_TRIES:-3}
SSH_CLIENT_ALIVE_INTERVAL=${SSH_CLIENT_ALIVE_INTERVAL:-300}
SSH_CLIENT_ALIVE_COUNT_MAX=${SSH_CLIENT_ALIVE_COUNT_MAX:-2}

# Function to detect OS
detect_os() {
    if [ -f /etc/os-release ]; then
        . /etc/os-release
        OS=$NAME
    elif type lsb_release >/dev/null 2>&1; then
        OS=$(lsb_release -si)
    elif [ -f /etc/lsb-release ]; then
        . /etc/lsb-release
        OS=$DISTRIB_ID
    else
        OS=$(uname -s)
    fi
}

# Function to setup firewall
setup_firewall() {
    echo "Setting up firewall..."
    
    if [[ "$OS" == *"Ubuntu"* ]] || [[ "$OS" == *"Debian"* ]]; then
        apt-get install -y ufw
        ufw --force reset
        ufw default deny incoming
        ufw default allow outgoing
        
        # Allow SSH on custom port
        ufw allow ${SSH_PORT}/tcp
        
        # Allow other configured ports
        IFS=',' read -ra PORTS <<< "$UFW_ALLOWED_PORTS"
        for port in "${PORTS[@]}"; do
            ufw allow ${port}/tcp
        done
        
        ufw --force enable
        
    elif [[ "$OS" == *"CentOS"* ]] || [[ "$OS" == *"Red Hat"* ]]; then
        yum install -y firewalld
        systemctl start firewalld
        systemctl enable firewalld
        
        # Configure firewall rules
        firewall-cmd --permanent --add-port=${SSH_PORT}/tcp
        
        IFS=',' read -ra PORTS <<< "$UFW_ALLOWED_PORTS"
        for port in "${PORTS[@]}"; do
            firewall-cmd --permanent --add-port=${port}/tcp
        done
        
        firewall-cmd --reload
    fi
}

# Function to harden SSH configuration
harden_ssh() {
    echo "Hardening SSH configuration..."
    
    SSH_CONFIG="/etc/ssh/sshd_config"
    cp $SSH_CONFIG "${SSH_CONFIG}.backup"
    
    # Update SSH port if different from default
    if [ "$SSH_PORT" != "22" ]; then
        sed -i "s/#Port 22/Port ${SSH_PORT}/" $SSH_CONFIG
    fi
    
    # SSH hardening configurations
    sed -i 's/#PermitRootLogin yes/PermitRootLogin no/' $SSH_CONFIG
    sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' $SSH_CONFIG
    sed -i 's/#PubkeyAuthentication yes/PubkeyAuthentication yes/' $SSH_CONFIG
    
    # Additional SSH security settings with environment variables
    cat >> $SSH_CONFIG << EOF
Protocol 2
MaxAuthTries ${SSH_MAX_AUTH_TRIES}
ClientAliveInterval ${SSH_CLIENT_ALIVE_INTERVAL}
ClientAliveCountMax ${SSH_CLIENT_ALIVE_COUNT_MAX}
EOF
    
    # Restart SSH service
    if [[ "$OS" == *"Ubuntu"* ]] || [[ "$OS" == *"Debian"* ]]; then
        systemctl restart ssh
    else
        systemctl restart sshd
    fi
}

# Function to set up system security
setup_system_security() {
    echo "Setting up system security..."
    
    # Update sysctl settings
    cat > /etc/sysctl.d/99-security.conf << EOF
# IP Spoofing protection
net.ipv4.conf.all.rp_filter = 1
net.ipv4.conf.default.rp_filter = 1

# Ignore ICMP broadcast requests
net.ipv4.icmp_echo_ignore_broadcasts = 1

# Disable source packet routing
net.ipv4.conf.all.accept_source_route = 0
net.ipv6.conf.all.accept_source_route = 0
net.ipv4.conf.default.accept_source_route = 0
net.ipv6.conf.default.accept_source_route = 0

# Ignore send redirects
net.ipv4.conf.all.send_redirects = 0
net.ipv4.conf.default.send_redirects = 0

# Block SYN attacks
net.ipv4.tcp_syncookies = 1
net.ipv4.tcp_max_syn_backlog = 2048
net.ipv4.tcp_synack_retries = 2
net.ipv4.tcp_syn_retries = 5

# Log Martians
net.ipv4.conf.all.log_martians = 1
net.ipv4.conf.default.log_martians = 1

# Ignore ICMP redirects
net.ipv4.conf.all.accept_redirects = 0
net.ipv6.conf.all.accept_redirects = 0
net.ipv4.conf.default.accept_redirects = 0
net.ipv6.conf.default.accept_redirects = 0

# Ignore Directed pings
net.ipv4.icmp_echo_ignore_all = 1
EOF

    # Apply sysctl settings
    sysctl -p /etc/sysctl.d/99-security.conf
    
    # Set up fail2ban if not present
    if [[ "$OS" == *"Ubuntu"* ]] || [[ "$OS" == *"Debian"* ]]; then
        apt-get install -y fail2ban
    elif [[ "$OS" == *"CentOS"* ]] || [[ "$OS" == *"Red Hat"* ]]; then
        yum install -y fail2ban
    fi
    
    # Configure fail2ban with environment variables
    configure_fail2ban
    
    # Start fail2ban
    systemctl enable fail2ban
    systemctl start fail2ban
}

# Function to secure shared memory
secure_shared_memory() {
    echo "Securing shared memory..."
    
    # Add shared memory configuration to fstab if not present
    if ! grep -q "/dev/shm" /etc/fstab; then
        echo "tmpfs     /dev/shm     tmpfs     defaults,noexec,nosuid,nodev     0     0" >> /etc/fstab
    fi
}

# Configure fail2ban with environment variables
configure_fail2ban() {
    cat > /etc/fail2ban/jail.local << EOF
[DEFAULT]
bantime = ${FAIL2BAN_BANTIME}
findtime = ${FAIL2BAN_FINDTIME}
maxretry = ${FAIL2BAN_MAXRETRY}

[sshd]
enabled = true
port = ${SSH_PORT}
EOF
}

# Main execution
detect_os
setup_firewall
harden_ssh
setup_system_security
secure_shared_memory

echo "Security setup completed!"
echo "Please review the changes and restart the system to apply all settings." 