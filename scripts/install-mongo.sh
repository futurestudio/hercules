#!/usr/bin/env bash

# MongoDB

if [ -f /home/vagrant/.hercules-installed/mongodb ]
then
    echo "MongoDB is already installed"
    exit 0
fi

touch /home/vagrant/.hercules-installed/mongodb


## Install
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

## content for systemd mongodb.service
mongoService="
    [Unit]
    Description=High-performance, schema-free document-oriented database
    After=network.target

    [Service]
    User=mongodb
    ExecStart=/usr/bin/mongod --quiet --config /etc/mongod.conf

    [Install]
    WantedBy=multi-user.target
"

## put mongodb.service into place to be managable by systemctl
sudo echo "$mongoService" > /etc/systemd/system/mongodb.service

## bind MongoDB to the world \o/ raise the gates!
sudo sed -i 's/bindIp: 127.0.0.1/bindIp: 0.0.0.0/g' /etc/mongod.conf

## restart MongoDB, in case it wasn't running before
sudo systemctl restart mongodb
sudo systemctl enable mongodb
