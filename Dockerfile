FROM nginx:stable-alpine
ARG app
RUN rm -rf /usr/share/nginx/html
COPY /dist/apps/zfc/ /usr/share/nginx/html/
COPY /nginx.conf /etc/nginx/conf.d/default.conf
