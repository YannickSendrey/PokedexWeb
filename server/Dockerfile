# Dockerfile
FROM --platform=linux/amd64 php:8.2.6-fpm-alpine3.18
ARG IPE_GD_WITHOUTAVIF=1
ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/
RUN chmod +x /usr/local/bin/install-php-extensions && \
    install-php-extensions bcmath gd gettext intl mcrypt mysqli opcache pcntl pdo_pgsql xsl zip
RUN apk --update add \
    supervisor \
    nginx &&\
    rm /var/cache/apk/*
COPY --chown=www-data:www-data . /var/www/html
COPY docker/conf/nginx /etc/nginx
COPY docker/conf/php /usr/local/etc
COPY docker/conf/supervisor /etc/supervisor
# COPY .env.example .env
RUN mkdir -p /var/run/php
RUN composer install
RUN php artisan config:cache
EXPOSE 80
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
