#!/bin/bash

source ./common/logging.sh

# Validate port number
validate_port() {
    local port=$1
    if ! [[ "$port" =~ ^[0-9]+$ ]] || [ "$port" -lt 1024 ] || [ "$port" -gt 65535 ]; then
        error_exit "Port must be between 1024 and 65535"
        return 1
    fi
    return 0
}

# Validate password strength
validate_password() {
    local password=$1
    local min_length=${2:-8}
    
    if [ ${#password} -lt $min_length ]; then
        error_exit "Password must be at least $min_length characters long"
        return 1
    fi
    
    # Check for complexity if min_length >= 12
    if [ $min_length -ge 12 ]; then
        if ! [[ "$password" =~ [A-Z] ]] || ! [[ "$password" =~ [a-z] ]] || ! [[ "$password" =~ [0-9] ]]; then
            error_exit "Password must contain uppercase, lowercase, and numbers"
            return 1
        fi
    fi
    
    return 0
}

# Check if script is run as root
check_root() {
    if [ "$EUID" -ne 0 ]; then 
        error_exit "Please run as root or with sudo"
        return 1
    fi
    return 0
}

# Check command dependencies
check_dependencies() {
    local deps=("$@")
    for dep in "${deps[@]}"; do
        if ! command -v "$dep" >/dev/null 2>&1; then
            error_exit "Required dependency not found: $dep"
            return 1
        fi
    done
    return 0
}

# Generate random string
gen_random_string() {
    local length="$1"
    local random_string=$(LC_ALL=C tr -dc 'a-zA-Z0-9' </dev/urandom | fold -w "$length" | head -n 1)
    echo "$random_string"
} 