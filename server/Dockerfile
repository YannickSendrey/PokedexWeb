# Dockerfile
FROM --platform=linux/amd64 php:8.2.6-fpm-alpine3.18
ARG IPE_GD_WITHOUTAVIF=1
ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/
RUN chmod +x /usr/local/bin/install-php-extensions && \
    install-php-extensions bcmath gd gettext intl mcrypt opcache pcntl xsl zip
RUN apk --update add \
    postgresql \
    postgresql-client \
    postgresql-dev \
    supervisor \
    nginx &&\
    rm /var/cache/apk/*
RUN docker-php-ext-install pdo pdo_pgsql
COPY --chown=www-data:www-data . /var/www/html
COPY docker/conf/nginx /etc/nginx
COPY docker/conf/php /usr/local/etc
COPY docker/conf/supervisor /etc/supervisor
RUN mkdir -p /var/run/php
RUN --mount=type=secret,id=_env,dst=/etc/secrets/.env cp /etc/secrets/.env /var/www/html/.env
ENV COMPOSER_ALLOW_SUPERUSER=1
COPY --from=composer /usr/bin/composer /usr/bin/composer
RUN composer install
RUN chown -R www-data:www-data /var/www/html
RUN php artisan key:generate
RUN php artisan config:cache
RUN php artisan route:cache
RUN php artisan view:cache
EXPOSE 80
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]

