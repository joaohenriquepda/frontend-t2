FROM ubuntu:bionic

# Set the locale
ENV LANG C.UTF-8

ARG CI_BUILD_ID
ARG CI_BUILD_REF
ARG CI_REGISTRY_IMAGE
ARG CI_BUILD_TIME
ARG NG_CLI_VERSION=latest

ENV CI_BUILD_ID=$CI_BUILD_ID CI_BUILD_REF=$CI_BUILD_REF CI_REGISTRY_IMAGE=$CI_REGISTRY_IMAGE \
    CI_BUILD_TIME=$CI_BUILD_TIME \
    NG_CLI_VERSION=$NG_CLI_VERSION

RUN apt-get update && apt-get install -y wget curl git build-essential libsndfile1
# Clean up
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt install -y nodejs

RUN node --version
RUN mkdir /app
WORKDIR /app
COPY . /app
RUN npm install
RUN npm install -g @angular/cli@$NG_CLI_VERSION
RUN npm install -g firebase-tools

EXPOSE 3333

# COPY docker-entrypoint.sh /usr/local/bin/
# ENTRYPOINT ["docker-entrypoint.sh"]

CMD [ "node" ]
