#!/bin/bash

LOG_FILE="/var/log/server-setup.log"
ERROR_LOG="/var/log/server-setup.error.log"

log() {
    local level=$1
    local message=$2
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "[$timestamp] [$level] $message" | tee -a "$LOG_FILE"
}

error_exit() {
    log "ERROR" "$1"
    echo "$1" >> "$ERROR_LOG"
    exit 1
} 