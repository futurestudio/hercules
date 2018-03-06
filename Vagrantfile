# -*- mode: ruby -*-
# vi: set ft=ruby :

scriptsDir = File.dirname(__FILE__)

Vagrant.configure("2") do |config|

  # Pick a base box
  config.vm.box = "ubuntu/xenial64"
  config.ssh.forward_agent = true

  # Box naming
  # config.vm.define = "hometown-1"
  config.vm.hostname = "hometown"

  # Create a dedicated private network
  # allows host-only access to the machine using the IP address
  config.vm.network :private_network, ip: "192.168.33.10"

  # Provisioning
  config.vm.provision "shell", path: scriptsDir + "/scripts/update-system.sh"

  config.vm.provision "shell", path: scriptsDir + "/scripts/install-node.sh"
  config.vm.provision "shell", path: scriptsDir + "/scripts/install-git.sh"
  config.vm.provision "shell", path: scriptsDir + "/scripts/install-nginx.sh"

  config.vm.provision "shell", path: scriptsDir + "/scripts/install-mongo.sh"
  config.vm.provision "shell", path: scriptsDir + "/scripts/install-redis.sh"
  config.vm.provision "shell", path: scriptsDir + "/scripts/install-maria.sh"
  config.vm.provision "shell", path: scriptsDir + "/scripts/install-postgres.sh"

  config.vm.provision "shell", path: scriptsDir + "/scripts/install-rabbit.sh"

  # Forward ports
  config.vm.network :forwarded_port, guest: 27017, host: 27017   # MongoDB
  config.vm.network :forwarded_port, guest: 6379, host: 6379     # Redis
  config.vm.network :forwarded_port, guest: 3306, host: 3306     # MariaDB
  config.vm.network :forwarded_port, guest: 5432, host: 5432     # Postgres
  config.vm.network :forwarded_port, guest: 5672, host: 5672     # RabbitMQ
  config.vm.network :forwarded_port, guest: 15672, host: 15672   # RabbitMQ for HTTP and management
  config.vm.network :forwarded_port, guest: 15671, host: 15671   # RabbitMQ for HTTPS and management

end