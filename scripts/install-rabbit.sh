#!/usr/bin/env bash

# RabbitMQ with Erlang

if [ -f /home/vagrant/.hercules-installed/rabbitmq ]
then
    echo "RabbitMQ is already installed"
    exit 0
fi

touch /home/vagrant/.hercules-installed/rabbitmq


# install Erlang
wget -O - http://binaries.erlang-solutions.com/debian/erlang_solutions.asc | sudo apt-key add -
sudo echo "deb http://binaries.erlang-solutions.com/ubuntu $(lsb_release -sc) contrib" > /etc/apt/sources.list.d/eslerlang.list
sudo apt-get install -y erlang

# install RabbitMQ
wget -O- https://dl.bintray.com/rabbitmq/Keys/rabbitmq-release-signing-key.asc | sudo apt-key add -
wget -O- https://www.rabbitmq.com/rabbitmq-release-signing-key.asc | sudo apt-key add -
sudo echo "deb https://dl.bintray.com/rabbitmq/debian $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/bintray.rabbitmq.list
sudo apt-get update
sudo apt-get install -y rabbitmq-server

# config

# start
sudo systemctl restart rabbitmq-server
