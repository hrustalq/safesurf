#!/bin/bash

source ./common/logging.sh
source ./common/colors.sh
source ./common/system.sh
source ./common/backup.sh

# Check root and OS requirements
check_root
check_os 2004 11

# Create system backup before updates
create_backup "system-update" "/etc/apt" "/etc/environment"

# Update and cleanup system
update_system
cleanup_system
