FROM php:8.0.14-fpm-alpine3.15
RUN docker-php-ext-install mysqli pdo pdo_mysql
WORKDIR code
COPY build ./
RUN chown -R www-data:www-data .