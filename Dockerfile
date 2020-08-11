FROM node:carbon

WORKDIR /app

RUN apt-get update && apt-get -y install nginx && apt-get -y install gettext-base

# NGINX
COPY default.conf /etc/nginx/conf.d/app.conf.template
COPY /build /usr/share/nginx/html

# NODE
COPY node_modules/ ./node_modules/
COPY startup.sh .

RUN chmod 744 ./startup.sh

EXPOSE 8080

CMD ./startup.sh

