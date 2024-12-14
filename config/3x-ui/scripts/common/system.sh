#!/bin/bash

source ./common/logging.sh
source ./common/colors.sh

# Check OS and version
check_os() {
    local min_ubuntu_version=${1:-2004}
    local min_debian_version=${2:-11}
    
    if [[ -f /etc/os-release ]]; then
        source /etc/os-release
        release=$ID
    elif [[ -f /usr/lib/os-release ]]; then
        source /usr/lib/os-release
        release=$ID
    else
        error_exit "Failed to check the system OS"
    fi
    
    # Get OS version
    os_version=$(grep "^VERSION_ID" /etc/os-release | cut -d'=' -f2 | tr -d '"' | tr -d '.')
    
    # Validate OS and version
    if [[ "${release}" == "ubuntu" ]]; then
        if [[ ${os_version} -lt $min_ubuntu_version ]]; then
            error_exit "Please use Ubuntu ${min_ubuntu_version:0:2}.${min_ubuntu_version:2} or higher version!"
        fi
    elif [[ "${release}" == "debian" ]]; then
        if [[ ${os_version} -lt $min_debian_version ]]; then
            error_exit "Please use Debian $min_debian_version or higher"
        fi
    else
        error_exit "This script only supports Ubuntu ${min_ubuntu_version:0:2}.${min_ubuntu_version:2}+ and Debian ${min_debian_version}+"
    fi
}

# Configure UFW
configure_ufw() {
    local port=$1
    local protocol=${2:-tcp}
    
    log "INFO" "Configuring UFW for port $port/$protocol..."
    
    # Install UFW if not present
    if ! command -v ufw >/dev/null 2>&1; then
        log "INFO" "Installing UFW..."
        apt-get update && apt-get install -y ufw
    fi
    
    # Enable UFW if not active
    if ! ufw status | grep -q "Status: active"; then
        log "INFO" "Enabling UFW..."
        echo "y" | ufw enable
    fi
    
    # Add rule
    ufw allow $port/$protocol
    
    log "SUCCESS" "UFW configured for port $port/$protocol"
}

# System update
update_system() {
    log "INFO" "Updating system packages..."
    apt-get update || error_exit "Failed to update package lists"
    apt-get upgrade -y || error_exit "Failed to upgrade packages"
    log "SUCCESS" "System updated successfully"
}

# System cleanup
cleanup_system() {
    log "INFO" "Performing system cleanup..."
    apt-get autoremove -y
    apt-get autoclean
    log "SUCCESS" "System cleanup completed"
} 