FROM php:7.4-cli

# mcrypt is required by several scripts in this repo (e.g. edining.php,
# datman_payload.php) but was pulled out of PHP core in 7.2+, so it has to
# be installed via PECL against libmcrypt.
# The pecl.php.net channel metadata is broken as of this writing, so the
# extension is fetched and built by hand instead of via `pecl install`.
RUN apt-get update \
    && apt-get install -y --no-install-recommends libmcrypt-dev curl build-essential autoconf \
    && curl -sSL https://pecl.php.net/get/mcrypt-1.0.5.tgz -o /tmp/mcrypt.tgz \
    && mkdir -p /tmp/mcrypt \
    && tar -xzf /tmp/mcrypt.tgz -C /tmp/mcrypt --strip-components=1 \
    && ( cd /tmp/mcrypt && phpize && ./configure && make -j"$(nproc)" && make install ) \
    && docker-php-ext-enable mcrypt \
    && rm -rf /tmp/mcrypt /tmp/mcrypt.tgz \
    && apt-mark manual libmcrypt4 \
    && apt-get purge -y --auto-remove libmcrypt-dev curl build-essential autoconf \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

CMD ["php", "-a"]
