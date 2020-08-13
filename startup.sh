#!/bin/bash

if test -d /secret/apigw;
then
  export API_GW_API_KEY=$(cat /secret/apigw/x-nav-apiKey)
fi

# Setting default environment variables
export API_GW_API_KEY="${API_GW_API_KEY:-dummykey}"
export API_GATEWAY="${API_GATEWAY:-http://localhost:8080}"

export REACT_APP_LOGINSERVICE_URL="${REACT_APP_LOGINSERVICE_URL:-https://loginserviceurlfromstartup}"
export REACT_APP_DECORATOR_URL="${REACT_APP_DECORATOR_URL:-https://decoratorurlfromstartup}"

# replace env for nginx conf
envsubst '$API_GW_API_KEY $API_GATEWAY' < /etc/nginx/conf.d/app.conf.template > /etc/nginx/conf.d/default.conf

nginx -g "daemon off;"
