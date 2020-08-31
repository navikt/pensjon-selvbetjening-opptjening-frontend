#!/bin/bash

# replace env for nginx conf
envsubst '$OPPTJENING_BACKEND' < /etc/nginx/conf.d/app.conf.template > /etc/nginx/conf.d/default.conf

nginx -g "daemon off;"
