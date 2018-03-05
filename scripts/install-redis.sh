#!/usr/bin/env bash

# Redis, all in one

# install
sudo add-apt-repository -y ppa:chris-lea/redis-server
sudo apt-get update
sudo apt-get install -y redis-server

# config
sudo cp /etc/redis/redis.conf /etc/redis/redis.conf.old
sudo cat /etc/redis/redis.conf.old | grep -v bind > /etc/redis/redis.conf
sudo echo "bind 0.0.0.0" >> /etc/redis/redis.conf

## start
sudo update-rc.d redis-server defaults
sudo systemctl restart redis-server
