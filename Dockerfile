FROM node:carbon

WORKDIR /app

EXPOSE 8080

RUN apt-get update && apt-get -y install nginx

# NGINX
COPY default.conf /etc/nginx/conf.d/default.conf
COPY /build /usr/share/nginx/html
RUN rm /etc/nginx/sites-enabled/default

# NODE
COPY node_modules/ ./node_modules/
COPY startup.sh .

RUN PATH="./node_modules/json-server/bin:$PATH"
RUN export PATH
RUN chmod 744 ./startup.sh

CMD ./startup.sh

