#!/usr/bin/env bash

# CockroachDB

# install
sudo apt-get update
sudo apt-get install -y glibc libncurses

wget -qO- https://binaries.cockroachdb.com/cockroach-v2.0.3.linux-amd64.tgz | tar  xvz
sudo cp -i cockroach-v2.0.3.linux-amd64/cockroach /usr/local/bin

# start with config
sudo cockroach start --background --insecure --http-port=8090
