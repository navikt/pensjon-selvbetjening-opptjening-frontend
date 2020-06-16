FROM node:carbon

WORKDIR /app

RUN apt-get update && apt-get -y install nginx

# NGINX
COPY default.conf /etc/nginx/conf.d/app.conf.template
# COPY default.conf /etc/nginx/conf.d/default.conf
COPY /build /usr/share/nginx/html
RUN rm /etc/nginx/sites-enabled/default

# NODE
COPY node_modules/ ./node_modules/
COPY startup.sh .

RUN PATH="./node_modules/json-server/bin:$PATH"
RUN export PATH
RUN chmod 744 ./startup.sh

EXPOSE 8080

CMD ./startup.sh

