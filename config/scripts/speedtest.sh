#!/bin/bash

source ./common/logging.sh
source ./common/colors.sh
source ./common/validation.sh
source ./common/system.sh

# Check root and OS requirements
check_root
check_os 2004 11

# Check dependencies
check_dependencies "curl"

# Install speedtest if not present
install_speedtest() {
    log "INFO" "Setting up official Ookla Speedtest CLI..."
    
    # Remove old speedtest if exists
    if [ -f "/etc/apt/sources.list.d/speedtest.list" ]; then
        log "INFO" "Removing old speedtest repository..."
        rm /etc/apt/sources.list.d/speedtest.list
    fi
    
    # Remove conflicting packages
    if dpkg -l | grep -q speedtest-cli; then
        log "INFO" "Removing unofficial speedtest-cli package..."
        apt-get remove -y speedtest-cli
    fi
    
    if dpkg -l | grep -q speedtest; then
        log "INFO" "Removing old speedtest package..."
        apt-get remove -y speedtest
    fi
    
    # Install official speedtest
    log "INFO" "Adding Ookla repository..."
    curl -s https://packagecloud.io/install/repositories/ookla/speedtest-cli/script.deb.sh | bash
    
    log "INFO" "Installing Speedtest CLI..."
    apt-get install -y speedtest
    
    if ! command -v speedtest >/dev/null 2>&1; then
        error_exit "Failed to install Speedtest CLI"
    fi
    
    log "SUCCESS" "Successfully installed Speedtest CLI"
}

# Run speedtest
run_speedtest() {
    log "INFO" "Running speedtest..."
    log "INFO" "This may take a minute...\n"
    
    # Accept license and GDPR
    speedtest --accept-license --accept-gdpr
    
    if [ $? -eq 0 ]; then
        log "SUCCESS" "Speedtest completed successfully"
    else
        error_exit "Speedtest failed"
    fi
}

# Execute
install_speedtest
run_speedtest
