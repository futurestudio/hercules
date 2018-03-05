#!/usr/bin/env bash

# nginx, from development PPA

# install
apt-add-repository ppa:nginx/development -y
sudo apt-get update
sudo apt-get install -y nginx

# config
# delete default nginx page?

## start
sudo systemctl restart nginx
