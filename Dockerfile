FROM nginx:alpine

COPY default.conf /etc/nginx/conf.d/default.conf
COPY /build /usr/share/nginx/html

EXPOSE 8080

COPY startup.sh .
RUN chmod 744 ./startup.sh
CMD ./startup.sh
