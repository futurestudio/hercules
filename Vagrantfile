# -*- mode: ruby -*-
# vi: set ft=ruby :

require 'yaml'

currentDir = File.expand_path(File.dirname(__FILE__))
herculesYamlPath = currentDir + "/hercules.yaml"
scriptsDir = currentDir + "/scripts/"

Vagrant.configure("2") do |config|

  if File.exist? herculesYamlPath then
    settings = YAML::load(File.read(herculesYamlPath))
  else
    abort "Hercules settings file not found in #{currentDir}. Create a »hercules.yaml« file in the ~/hercules directory."
  end

  # Set the VM Provider
  ENV['VAGRANT_DEFAULT_PROVIDER'] = settings["provider"] ||= "virtualbox"

  # Pick a base box
  config.vm.box = "ubuntu/xenial64"
  config.ssh.forward_agent = true

  # Box naming
  config.vm.hostname = settings["hostname"] ||= "hercules"

  # Configure box settings
  config.vm.provider "virtualbox" do |vb|
    vb.name = "hercules"
    vb.customize ["modifyvm", :id, "--memory", settings["memory"] ||= "2048"]
    vb.customize ["modifyvm", :id, "--cpus", settings["cpus"] ||= "1"]
    vb.customize ["modifyvm", :id, "--ostype", "Ubuntu_64"]
  end

  # Create a dedicated private network
  # allows host-only access to the machine using the IP address
  config.vm.network :private_network, ip: settings["ip"] ||= "192.168.33.10"

  # Forward ports
  config.vm.network :forwarded_port, guest: 6379, host: 6379     # Redis
  config.vm.network :forwarded_port, guest: 3306, host: 3306     # MariaDB
  config.vm.network :forwarded_port, guest: 5432, host: 5432     # Postgres

  # Provisioning
  config.vm.provision "shell", path: scriptsDir + "update-system.sh"

  config.vm.provision "shell", path: scriptsDir + "install-node.sh"
  config.vm.provision "shell", path: scriptsDir + "install-git.sh"
  config.vm.provision "shell", path: scriptsDir + "install-nginx.sh"

  # Install Services
  config.vm.provision "shell", path: scriptsDir + "install-maria.sh"
  config.vm.provision "shell", path: scriptsDir + "install-postgres.sh"
  config.vm.provision "shell", path: scriptsDir + "install-redis.sh"
  config.vm.provision "shell", path: scriptsDir + "install-sqlite.sh"

  if settings.has_key?("cockroachdb") && settings["cockroachdb"]
    config.vm.provision "shell", path: scriptsDir + "install-cockroach.sh"
    config.vm.network :forwarded_port, guest: 26257, host: 26257   # CockroachDB clients
    config.vm.network :forwarded_port, guest: 8090, host: 8090     # CockroachDB admin console
  end

  if settings.has_key?("elasticsearch") && settings["elasticsearch"]
    config.vm.provision "shell", path: scriptsDir + "install-elasticsearch.sh"
    config.vm.network :forwarded_port, guest: 9200, host: 9200     # Elasticsarch REST
    config.vm.network :forwarded_port, guest: 9300, host: 9300     # Elasticsarch cluster communication
  end

  if settings.has_key?("mongodb") && settings["mongodb"]
    config.vm.provision "shell", path: scriptsDir + "install-mongo.sh"
    config.vm.network :forwarded_port, guest: 27017, host: 27017   # MongoDB
  end

  if settings.has_key?("rabbitmq") && settings["rabbitmq"]
    config.vm.provision "shell", path: scriptsDir + "install-rabbit.sh"
    config.vm.network :forwarded_port, guest: 5672, host: 5672     # RabbitMQ
    config.vm.network :forwarded_port, guest: 15672, host: 15672   # RabbitMQ for HTTP and management
    config.vm.network :forwarded_port, guest: 15671, host: 15671   # RabbitMQ for HTTPS and management
  end

  if settings.has_key?("rethinkdb") && settings["rethinkdb"]
    config.vm.provision "shell", path: scriptsDir + "install-rethinkdb.sh"
    config.vm.network :forwarded_port, guest: 29015, host: 29015   # RethinkDB infrastructure connections
    config.vm.network :forwarded_port, guest: 28015, host: 28015   # RethinkDB driver connections
    config.vm.network :forwarded_port, guest: 8080, host: 8080     # RethinkDB admin console
  end

end
