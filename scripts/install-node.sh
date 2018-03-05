#!/usr/bin/env bash

# Install Node.js 8.x

# install
curl --silent --location https://deb.nodesource.com/setup_8.x | bash -
apt-get install -y nodejs

# Install/Upgrade Node.js-related packages
/usr/bin/npm install -g npm
/usr/bin/npm install -g gulp-cli
/usr/bin/npm install -g yarn
/usr/bin/npm install -g grunt-cli
