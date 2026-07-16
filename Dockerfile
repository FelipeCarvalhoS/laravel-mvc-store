# ---------- Composer ----------
FROM composer:2 AS composer

WORKDIR /app

COPY composer.json composer.lock ./

RUN composer install \
    --no-dev \
    --prefer-dist \
    --no-interaction \
    --no-scripts

COPY . .

RUN composer dump-autoload --optimize

RUN php artisan package:discover

# Clear cached routes for Wayfinder to work properly
RUN php artisan route:clear

RUN php artisan optimize
RUN php artisan wayfinder:generate


# ---------- Frontend ----------
FROM node:22-alpine AS frontend

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY --from=composer /app .

RUN npm run build


# ---------- Runtime ----------
FROM dunglas/frankenphp:php8.4

WORKDIR /app

RUN install-php-extensions \
    pdo_mysql

# 1. Strip Linux capabilities from the frankenphp binary so rootless environments permit execution
RUN setcap -r /usr/local/bin/frankenphp

COPY --from=composer /app .
COPY --from=frontend /app/public/build ./public/build

# 2. Grant permissions for both Laravel and Caddy/FrankenPHP working directories
RUN chown -R www-data:www-data \
    storage \
    bootstrap/cache \
    /config/caddy \
    /data/caddy

# 3. Configure server to use an unprivileged port (8080)
ENV SERVER_NAME=":8080"
EXPOSE 8080

# 4. Switch to non-root user
USER www-data

CMD ["frankenphp", "php-server", "-r", "public/"]