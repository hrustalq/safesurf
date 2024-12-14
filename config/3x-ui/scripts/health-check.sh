#!/bin/bash

source ./common/logging.sh

check_system_health() {
    # Add backup directory check
    if [[ ! -d "/var/backups/server-config" ]]; then
        log "WARNING" "Backup directory not found"
    fi
    
    # Check backup age
    local latest_backup=$(find "/var/backups/server-config" -name "*.tar.gz" -type f -printf '%T@ %p\n' | sort -nr | head -n1)
    if [[ -n "$latest_backup" ]]; then
        local backup_age=$(( ($(date +%s) - $(echo "$latest_backup" | cut -d' ' -f1)) / 86400 ))
        if [[ $backup_age -gt 7 ]]; then
            log "WARNING" "Latest backup is $backup_age days old"
        fi
    else
        log "WARNING" "No backups found"
    fi

    # Check disk usage
    local disk_usage=$(df -h / | awk 'NR==2 {print $5}' | sed 's/%//')
    if [[ $disk_usage -gt 90 ]]; then
        log "WARNING" "High disk usage: ${disk_usage}%"
    fi
    
    # Check memory usage
    local mem_free=$(free -m | awk 'NR==2 {print $4}')
    if [[ $mem_free -lt 100 ]]; then
        log "WARNING" "Low memory available: ${mem_free}MB"
    fi
    
    # Check load average
    local load_avg=$(uptime | awk -F'load average:' '{print $2}' | cut -d, -f1)
    if [[ $(echo "$load_avg > 2" | bc) -eq 1 ]]; then
        log "WARNING" "High system load: $load_avg"
    fi
    
    # Check critical services
    local services=("sshd" "x-ui" "ufw")
    for service in "${services[@]}"; do
        if ! systemctl is-active --quiet "$service"; then
            log "ERROR" "Service $service is not running"
        fi
    done
}

# Run health check
check_system_health