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

COPY --from=composer /app .
COPY --from=frontend /app/public/build ./public/build

RUN chown -R www-data:www-data \
    storage \
    bootstrap/cache
    
EXPOSE 80

CMD ["frankenphp", "php-server", "-r", "public/"]