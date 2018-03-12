#!/usr/bin/env bash

# CockroachDB

# install
wget -qO- https://binaries.cockroachdb.com/cockroach-v1.1.5.linux-amd64.tgz | tar  xvz
sudo cp -i cockroach-v1.1.5.linux-amd64/cockroach /usr/local/bin

# start with config
sudo cockroach start --background --insecure --http-port=8090
