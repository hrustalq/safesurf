#!/bin/bash

source ./common/logging.sh
source ./common/config.sh
source ./common/backup.sh

update_system() {
    # Create backup before updating
    create_backup "full-system-update" \
        "/etc/apt" \
        "/etc/environment" \
        "/usr/local/x-ui" \
        "/etc/ssl" \
        "/root/.acme.sh"
    
    # Update system packages
    log "INFO" "Updating system packages..."
    apt-get update || error_exit "Failed to update package lists"
    apt-get upgrade -y || error_exit "Failed to upgrade packages"
    
    # Update 3x-ui if installed
    if [[ -f /usr/local/x-ui/x-ui ]]; then
        log "INFO" "Updating 3x-ui panel..."
        x-ui update || log "WARNING" "Failed to update 3x-ui"
    fi
    
    # Run health check after updates
    ./health-check.sh
    
    log "INFO" "System update completed successfully"
}

# Execute update
update_system