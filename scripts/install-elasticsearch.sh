#!/usr/bin/env bash

# Elastic

# install
## first, Java
sudo apt-get update
sudo apt-get install -y default-jdk

export JAVA_HOME=/usr/lib/jvm/java-8-oracle
export PATHADD=$JAVA_HOME/bin
export PATH=$PATH:$PATHADD

## second, Elastic
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -
sudo apt-get install apt-transport-https
echo "deb https://artifacts.elastic.co/packages/6.x/apt stable main" | sudo tee -a /etc/apt/sources.list.d/elastic-6.x.list
sudo apt-get update && sudo apt-get install -y elasticsearch


## configure
# Start Elasticsearch on boot

sudo update-rc.d elasticsearch defaults 95 10

# Use 'hometown' as the cluster
sudo sed -i "s/#cluster.name: my-application/cluster.name: hometown/" /etc/elasticsearch/elasticsearch.yml
# Bind IP to access from host
sudo sed -i "s/#network.host: 192.168.0.1/network.host: 0.0.0.0/" /etc/elasticsearch/elasticsearch.yml


# start with config
sudo systemctl daemon-reload
sudo systemctl enable elasticsearch.service
sudo systemctl restart elasticsearch.service
