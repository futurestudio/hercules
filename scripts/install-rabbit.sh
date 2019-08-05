#!/usr/bin/env bash

# RabbitMQ with Erlang

if [ -f /home/vagrant/.hercules-installed/rabbitmq ]
then
    echo "RabbitMQ is already installed"
    exit 0
fi

touch /home/vagrant/.hercules-installed/rabbitmq


# install Erlang
sudo echo "deb http://binaries.erlang-solutions.com/debian xenial contrib" > /etc/apt/sources.list.d/eslerlang.list
wget -O - http://binaries.erlang-solutions.com/debian/erlang_solutions.asc | sudo apt-key add -
sudo apt-get install -y esl-erlang

# install RabbitMQ
sudo echo "deb https://dl.bintray.com/rabbitmq/debian xenial main" | sudo tee /etc/apt/sources.list.d/bintray.rabbitmq.list
wget -O- https://www.rabbitmq.com/rabbitmq-release-signing-key.asc | sudo apt-key add -
sudo apt-get update
sudo apt-get install -y rabbitmq-server

# config

# start
sudo systemctl restart rabbitmq-server
