#!/bin/bash

source ./common/logging.sh
source ./common/colors.sh
source ./common/validation.sh
source ./common/system.sh
source ./common/backup.sh

# Check root and OS requirements
check_root
check_os 2004 11

# Function to display usage
usage() {
    echo -e "Usage: $0 [-u username] [-p password] [-P port] [-w webpath]"
    echo -e "Example: $0 -u admin -p strongpass123 -P 2053 -w dashboard"
    echo -e "\nOptions:"
    echo -e "  -u    Panel username (default: random)"
    echo -e "  -p    Panel password (default: random)"
    echo -e "  -P    Panel port (default: random 1024-65535)"
    echo -e "  -w    Web path (default: random)"
    echo -e "  -h    Show this help message"
    exit 1
}

# Parse command line arguments
while getopts "u:p:P:w:h" opt; do
    case $opt in
        u) PANEL_USERNAME="$OPTARG";;
        p) 
            PANEL_PASSWORD="$OPTARG"
            validate_password "$PANEL_PASSWORD"
            ;;
        P) 
            PANEL_PORT="$OPTARG"
            validate_port "$PANEL_PORT"
            ;;
        w) PANEL_WEBPATH="$OPTARG";;
        h) usage;;
        ?) usage;;
    esac
done

# Function to install base dependencies
install_base() {
    apt-get update
    apt-get install -y -q wget curl tar socat
}

# Function to install x-ui
install_x_ui() {
    # Create backup before installation
    create_backup "x-ui-config" "/usr/local/x-ui"
    
    cd /usr/local/

    # Get latest version
    local tag_version=$(curl -Ls "https://api.github.com/repos/MHSanaei/3x-ui/releases/latest" | grep '"tag_name":' | sed -E 's/.*"([^"]+)".*/\1/')
    if [[ ! -n "$tag_version" ]]; then
        error_exit "Failed to fetch x-ui version, it may be due to GitHub API restrictions"
    fi

    log "INFO" "Got x-ui latest version: ${tag_version}, beginning the installation..."
    
    # Download x-ui
    wget -N --no-check-certificate -O /usr/local/x-ui-linux-$(arch).tar.gz \
        https://github.com/MHSanaei/3x-ui/releases/download/${tag_version}/x-ui-linux-$(arch).tar.gz
    
    if [[ $? -ne 0 ]]; then
        error_exit "Failed to download x-ui, please check your network connection"
    fi

    # Remove old panel if exists
    if [[ -e /usr/local/x-ui/ ]]; then
        systemctl stop x-ui
        rm /usr/local/x-ui/ -rf
    fi

    # Install new panel
    tar zxvf x-ui-linux-$(arch).tar.gz
    rm x-ui-linux-$(arch).tar.gz -f
    cd x-ui
    chmod +x x-ui bin/xray-linux-$(arch)
    cp -f x-ui.service /etc/systemd/system/
    
    # Install management script
    wget --no-check-certificate -O /usr/bin/x-ui https://raw.githubusercontent.com/MHSanaei/3x-ui/main/x-ui.sh
    chmod +x /usr/bin/x-ui
    chmod +x /usr/local/x-ui/x-ui.sh
}

# Function to configure panel settings
configure_panel() {
    # Use provided values or generate random ones
    local config_username=${PANEL_USERNAME:-$(gen_random_string 10)}
    local config_password=${PANEL_PASSWORD:-$(gen_random_string 16)}
    local config_port=${PANEL_PORT:-$(shuf -i 1024-65535 -n 1)}
    local config_webBasePath=${PANEL_WEBPATH:-$(gen_random_string 15)}
    
    # Apply settings
    /usr/local/x-ui/x-ui setting -username "${config_username}" -password "${config_password}" \
        -port "${config_port}" -webBasePath "${config_webBasePath}"
    
    # Get server IP
    local server_ip=$(curl -s https://api.ipify.org)
    
    log "SUCCESS" "Panel configured with following settings:"
    echo -e "###############################################"
    echo -e "${GREEN}Username: ${config_username}${NC}"
    echo -e "${GREEN}Password: ${config_password}${NC}"
    echo -e "${GREEN}Port: ${config_port}${NC}"
    echo -e "${GREEN}WebBasePath: ${config_webBasePath}${NC}"
    echo -e "${GREEN}Access URL: http://${server_ip}:${config_port}/${config_webBasePath}${NC}"
    echo -e "###############################################"
    
    # Save credentials to a secure file
    local creds_file="/root/.3x-ui_credentials"
    echo "Username: ${config_username}" > "$creds_file"
    echo "Password: ${config_password}" >> "$creds_file"
    echo "Port: ${config_port}" >> "$creds_file"
    echo "WebBasePath: ${config_webBasePath}" >> "$creds_file"
    echo "URL: http://${server_ip}:${config_port}/${config_webBasePath}" >> "$creds_file"
    chmod 600 "$creds_file"
    
    log "INFO" "Credentials have been saved to: ${creds_file}"
}

# Function to perform post-installation cleanup
cleanup() {
    log "INFO" "Performing post-installation cleanup..."
    
    # Remove downloaded archives and temporary files
    rm -rf /usr/local/x-ui-linux-*.tar.gz
    
    # Secure permissions
    chmod 600 /usr/local/x-ui/bin/config.json
    chmod 600 /usr/local/x-ui/db/x-ui.db
    chmod 700 /usr/local/x-ui/bin/
    
    # Clear package cache
    apt-get clean
    
    # Clear bash history
    history -c
    
    log "SUCCESS" "Cleanup completed"
}

# Main installation process
log "INFO" "Starting installation..."
install_base
install_x_ui
configure_panel

# Configure firewall for the panel port
configure_ufw "${config_port}" "tcp"

# Start the panel
systemctl daemon-reload
systemctl enable x-ui
systemctl start x-ui

# Perform cleanup
cleanup

log "SUCCESS" "3x-ui panel installation completed!"
echo -e "${YELLOW}You can manage the panel using these commands:${NC}"
echo -e "----------------------------------------------"
echo -e "x-ui              - Management menu"
echo -e "x-ui start        - Start panel"
echo -e "x-ui stop         - Stop panel"
echo -e "x-ui restart      - Restart panel"
echo -e "x-ui status       - Check panel status"
echo -e "x-ui enable       - Enable panel auto-start"
echo -e "x-ui disable      - Disable panel auto-start"
echo -e "x-ui log          - Check panel logs"
echo -e "x-ui update       - Update panel"
echo -e "x-ui install      - Install panel"
echo -e "x-ui uninstall    - Uninstall panel"
echo -e "----------------------------------------------"
