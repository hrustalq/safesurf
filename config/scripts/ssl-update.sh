#!/bin/bash

source ./common/logging.sh
source ./common/colors.sh
source ./common/validation.sh
source ./common/system.sh
source ./common/backup.sh

# Check root and OS requirements
check_root
check_os 2004 11

# Check dependencies
check_dependencies "ufw" "cron"

# Create backup before updating SSL
create_backup "ssl-config" "/root/.acme.sh" "/etc/ssl"

# Function to setup the cron job
setup_cron() {
    local cron_cmd="0 23 * * * ufw allow 80/tcp && \"/root/.acme.sh\"/acme.sh --cron --home \"/root/.acme.sh\" > /dev/null && ufw deny 80/tcp"
    
    # Check if there's an existing acme.sh cron job
    if crontab -l 2>/dev/null | grep -q "acme.sh --cron"; then
        log "INFO" "Found existing SSL renewal cron job. Updating..."
        # Remove any existing acme.sh related cron jobs and add the new one
        (crontab -l 2>/dev/null | grep -v "acme.sh" ; echo "$cron_cmd") | crontab -
        log "SUCCESS" "SSL update cron job has been updated with firewall rules"
    else
        # Add new cron job if none exists
        (crontab -l 2>/dev/null ; echo "$cron_cmd") | crontab -
        log "SUCCESS" "New SSL update cron job has been set up"
    fi
}

# Main execution
setup_cron

