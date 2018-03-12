#!/usr/bin/env bash

export DEBIAN_FRONTEND=noninteractive

# Update package List
apt-get update

# Update system packages
apt-get -y upgrade

# Force Locale to en_US
echo "LC_ALL=en_US.UTF-8" >> /etc/default/locale
locale-gen en_US.UTF-8

# Install common packages
apt-get install -y software-properties-common curl wget
apt-get install -y build-essential dos2unix gcc libmcrypt4 libpcre3-dev ntp unzip make python2.7-dev python-pip unattended-upgrades whois libnotify-bin pv cifs-utils mcrypt bash-completion zsh
