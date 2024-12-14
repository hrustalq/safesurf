# Server Configuration Scripts

A comprehensive collection of shell scripts for server setup, security hardening, and maintenance with enhanced logging, backup, and monitoring capabilities.

## Directory Structure

onfig/scripts/
├── common/
│ ├── logging.sh # Centralized logging functionality
│ └── config.sh # Configuration management
├── 3x-ui.sh # 3x-ui panel installation
├── backup.sh # Backup and restore functionality
├── health-check.sh # System health monitoring
├── init.sh # System initialization
├── security.sh # Security hardening
├── speedtest.sh # Network performance testing
├── ssl-update.sh # SSL certificate management
└── update-all.sh # System-wide updates

## Core Features

- Centralized logging and error handling
- Configuration management
- Automated backup and restore functionality
- System health monitoring
- Rollback capabilities
- Dry-run options for testing
- Verbose output options

## Scripts Overview

### 1. init.sh - System Initialization
Basic system initialization script that:
- Updates package lists
- Upgrades installed packages
- Performs system cleanup
- Must be run first before other scripts

### 2. security.sh - Security Hardening
Enhanced security configuration with:

```bash
./security.sh -p <port_number> -u <username> -w <new_password> [-d] [-v]
```
Options:
- `-p`: SSH port number (required)
- `-u`: Username (required)
- `-w`: New password (required)
- `-d`: Dry-run mode
- `-v`: Verbose output

Features:
- SSH port configuration
- UFW firewall setup
- ICMP rules configuration
- Password management
- Automatic backup before changes
- Rollback capability

### 3. 3x-ui.sh - Panel Installation

3x-ui panel installation with:

```bash
./3x-ui.sh [-u username] [-p password] [-P port] [-w webpath]
```
Features:
- Automated installation
- Custom configuration options
- Firewall integration
- Automatic startup configuration

### 4. backup.sh - Backup Management
System configuration backup utility:
- Automated backup creation
- Configuration restore capability
- Retention policy management (7 days)
- Backup rotation

### 5. health-check.sh - System Monitoring
System health monitoring with checks for:
- Disk usage (warns at 90%)
- Memory utilization (warns below 100MB free)
- System load (warns above 2.0)
- Critical service status
- Automated alerts

### 6. speedtest.sh - Network Testing
Network performance testing utility:
- Official Ookla speedtest integration
- Network performance metrics
- Results logging

### 7. ssl-update.sh - SSL Management
SSL certificate automation:
- Automatic renewal scheduling
- Firewall rule management
- Service integration

### 8. update-all.sh - System Updates
Comprehensive update management:
- System package updates
- Panel updates
- Pre-update backups
- Health checks after updates

## Recommended Execution Order

1. **System Initialization**:   ```bash
   sudo ./init.sh   ```

2. **Security Hardening**:   ```bash
   sudo ./security.sh -p <new_ssh_port> -u <username> -w <new_password>   ```
   ⚠️ Keep the terminal session open until you verify SSH access with new settings

3. **Speed Test** (Optional):   ```bash
   sudo ./speedtest.sh   ```

4. **3x-ui Panel Installation**:   ```bash
   sudo ./3x-ui.sh   ```

5. **SSL Update Setup**:   ```bash
   sudo ./ssl-update.sh   ```

## Important Notes

- All scripts must be run with root privileges (using `sudo` or as root user)
- Make sure to backup any important data before running these scripts
- The security script will change SSH port and firewall rules - ensure you have access to the server console in case of connectivity issues
- Credentials for 3x-ui panel are saved in `/root/.3x-ui_credentials`
- After running security.sh, make note of the new SSH port and password

## Requirements

- Ubuntu 20.04+ or Debian 11+
- Root/sudo access
- Active internet connection

## Backup

Before running any scripts, it's recommended to backup your current configuration:
- SSH configuration
- Firewall rules
- User settings
- Any existing panel configurations

## Support

If you encounter any issues:
1. Check the script logs
2. Verify all prerequisites are met
3. Ensure you have proper permissions
4. Make sure your system meets the minimum requirements
