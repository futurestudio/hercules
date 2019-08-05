#!/usr/bin/env bash

# RethinkDB

if [ -f /home/vagrant/.hercules-installed/rethinkdb ]
then
    echo "RethinkDB is already installed"
    exit 0
fi

touch /home/vagrant/.hercules-installed/rethinkdb


# install
wget https://github.com/srh/rethinkdb/releases/download/v2.3.6.srh.1/rethinkdb_2.3.6.srh.1.0bionic_amd64.deb
sudo dpkg -i rethinkdb_2.3.6.srh.1.0bionic_amd64.deb

# config
sudo cp /etc/rethinkdb/default.conf.sample /etc/rethinkdb/instances.d/default.conf
sudo sed -i 's/# bind=127.0.0.1/bind=all/g' /etc/rethinkdb/instances.d/default.conf
sudo rethinkdb create -d /var/lib/rethinkdb/instances.d/default 2>&1

# start
sudo systemctl restart rethinkdb
