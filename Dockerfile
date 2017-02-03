FROM node:6.9
MAINTAINER Fraser Xu <xvfeng123@gmail.com>

ENV OAUTH2_PROXY_VERSION=2.1.linux-amd64.go1.6 NPM_CONFIG_LOGLEVEL=warn

RUN apt-get -qq update && apt-get -y install curl && apt-get clean

# Install dependencies
RUN curl -sL -o oauth2_proxy.tar.gz \
    "https://github.com/bitly/oauth2_proxy/releases/download/v2.1/oauth2_proxy-$OAUTH2_PROXY_VERSION.tar.gz" \
  && tar xzvf oauth2_proxy.tar.gz \
  && mv oauth2_proxy-$OAUTH2_PROXY_VERSION/oauth2_proxy ./bin/ \
  && chmod +x ./bin/oauth2_proxy \
  && rm -r oauth2_proxy*

# Copy config file
COPY oauth2_proxy.cfg .
WORKDIR .

COPY package.json .
RUN npm install --production
COPY pages pages
COPY lib lib
COPY components components

# Build
RUN npm run build

# Start the Node.js server and proxy through oauth2_proxy
CMD npm start & ./bin/oauth2_proxy -http-address="0.0.0.0:$PORT" -config="./oauth2_proxy.cfg"
