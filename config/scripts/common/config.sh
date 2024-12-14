#!/bin/bash

# Default configuration file
CONFIG_FILE="/etc/server-setup/config.conf"

# Load configuration
load_config() {
    if [[ -f "$CONFIG_FILE" ]]; then
        source "$CONFIG_FILE"
    else
        error_exit "Configuration file not found: $CONFIG_FILE"
    fi
}

# Save configuration
save_config() {
    mkdir -p "$(dirname "$CONFIG_FILE")"
    cat > "$CONFIG_FILE" << EOF
# Server Setup Configuration
SSH_PORT=$SSH_PORT
PANEL_PORT=$PANEL_PORT
WEBPATH=$WEBPATH
LAST_UPDATE=$(date '+%Y-%m-%d %H:%M:%S')
EOF
} 