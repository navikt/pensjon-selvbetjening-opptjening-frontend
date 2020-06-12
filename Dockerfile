FROM nginx:alpine

COPY default.conf /etc/nginx/conf.d/default.conf
COPY /build /usr/share/nginx/html

EXPOSE 8080

CMD ["/bin/bash", "-c", "nginx -g \"daemon off;\""]
