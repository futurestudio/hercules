#!/usr/bin/env bash

# Faktory

if [ -f /home/vagrant/.hercules-installed/faktory ]
then
    echo "Faktory is already installed"
    exit 0
fi

touch /home/vagrant/.hercules-installed/faktory


## Install
wget https://github.com/contribsys/faktory/releases/download/v1.0.1-1/faktory_1.0.1-1_amd64.deb
sudo dpkg -i faktory_1.0.1-1_amd64.deb
