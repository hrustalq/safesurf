#!/bin/sh
set -e

# Process templates
envsubst '${ADMIN_PORT} ${WEB_PORT} ${API_PORT}' < /etc/nginx/templates/web.conf.template > /etc/nginx/conf.d/web.conf
envsubst '${ADMIN_PORT} ${WEB_PORT} ${API_PORT}' < /etc/nginx/templates/admin.conf.template > /etc/nginx/conf.d/admin.conf
envsubst '${ADMIN_PORT} ${WEB_PORT} ${API_PORT}' < /etc/nginx/templates/api.conf.template > /etc/nginx/conf.d/api.conf
envsubst '${ADMIN_PORT} ${WEB_PORT} ${API_PORT}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf

# Execute the main container entrypoint
exec /docker-entrypoint.sh "$@" 