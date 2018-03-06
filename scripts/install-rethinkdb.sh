#!/usr/bin/env bash

# RethinkDB

# install
source /etc/lsb-release && echo "deb http://download.rethinkdb.com/apt $DISTRIB_CODENAME main" | sudo tee /etc/apt/sources.list.d/rethinkdb.list
wget -qO- https://download.rethinkdb.com/apt/pubkey.gpg | sudo apt-key add -
sudo apt-get update

sudo apt-get install -y rethinkdb

# config
sudo sed -e 's/# bind=127.0.0.1/bind=all/g' /etc/rethinkdb/default.conf.sample > /etc/rethinkdb/instances.d/default.conf
sudo rethinkdb create -d /var/lib/rethinkdb/instances.d/default 2>&1

# start
sudo systemctl restart rethinkdb
