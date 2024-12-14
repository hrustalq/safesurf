#!/bin/bash

source ./common/logging.sh

# Default backup settings
BACKUP_DIR="/var/backups/server-config"
BACKUP_RETENTION_DAYS=7
DEFAULT_PATHS=(
    "/etc/ssh/sshd_config"
    "/etc/ufw/before.rules"
    "/usr/local/x-ui/config.json"
)

# Create backup with custom paths and name
create_backup() {
    local name="${1:-server-config}"
    local paths=("${@:2}")
    
    # If no paths provided, use defaults
    if [ ${#paths[@]} -eq 0 ]; then
        paths=("${DEFAULT_PATHS[@]}")
    fi
    
    local timestamp=$(date '+%Y%m%d_%H%M%S')
    local backup_path="$BACKUP_DIR/${name}_${timestamp}"
    
    log "INFO" "Creating backup: $backup_path"
    
    # Create backup directory
    mkdir -p "$backup_path"
    
    # Backup each path
    for path in "${paths[@]}"; do
        if [[ -e "$path" ]]; then
            # Preserve directory structure
            local target_dir="$backup_path$(dirname "$path")"
            mkdir -p "$target_dir"
            
            if [[ -d "$path" ]]; then
                cp -r "$path" "$target_dir/"
                log "INFO" "Backed up directory: $path"
            else
                cp "$path" "$target_dir/"
                log "INFO" "Backed up file: $path"
            fi
        else
            log "WARNING" "Path not found: $path"
        fi
    done
    
    # Create archive
    tar -czf "$backup_path.tar.gz" -C "$BACKUP_DIR" "${name}_${timestamp}"
    rm -rf "$backup_path"
    
    # Create latest symlink
    ln -sf "$backup_path.tar.gz" "$BACKUP_DIR/${name}_latest.tar.gz"
    
    # Cleanup old backups
    cleanup_old_backups "$name"
    
    log "SUCCESS" "Backup completed: $backup_path.tar.gz"
    echo "$backup_path.tar.gz"
}

# Restore backup
restore_backup() {
    local backup_file="$1"
    local specific_paths=("${@:2}")
    
    if [[ ! -f "$backup_file" ]]; then
        error_exit "Backup file not found: $backup_file"
    }
    
    log "INFO" "Restoring from backup: $backup_file"
    
    # Create temporary directory for extraction
    local temp_dir=$(mktemp -d)
    tar -xzf "$backup_file" -C "$temp_dir"
    
    # Restore files
    local backup_name=$(basename "$temp_dir"/*)
    local backup_content="$temp_dir/$backup_name"
    
    if [ ${#specific_paths[@]} -eq 0 ]; then
        # Restore everything
        cp -r "$backup_content"/* /
        log "INFO" "Restored all files from backup"
    else
        # Restore specific paths
        for path in "${specific_paths[@]}"; do
            local backup_path="$backup_content$path"
            if [[ -e "$backup_path" ]]; then
                cp -r "$backup_path" "$path"
                log "INFO" "Restored: $path"
            else
                log "WARNING" "Path not found in backup: $path"
            fi
        done
    fi
    
    # Cleanup
    rm -rf "$temp_dir"
    
    log "SUCCESS" "Restore completed from: $backup_file"
}

# Cleanup old backups
cleanup_old_backups() {
    local name="$1"
    
    log "INFO" "Cleaning up old backups for: $name"
    
    find "$BACKUP_DIR" -name "${name}_*.tar.gz" -mtime +$BACKUP_RETENTION_DAYS -delete
    
    log "INFO" "Cleanup completed"
}

# List available backups
list_backups() {
    local name="${1:-*}"
    
    log "INFO" "Available backups:"
    find "$BACKUP_DIR" -name "${name}_*.tar.gz" -printf "%T@ %p\n" | \
        sort -nr | \
        cut -d' ' -f2- | \
        while read backup; do
            echo "$(stat -c '%y' "$backup") - $(basename "$backup")"
        done
}

# Example usage:
# create_backup "ssh-config" "/etc/ssh/sshd_config"
# create_backup "full-server"
# restore_backup "/var/backups/server-config/full-server_latest.tar.gz"
# restore_backup "/var/backups/server-config/ssh-config_latest.tar.gz" "/etc/ssh/sshd_config"
# list_backups "ssh-config" 