#!/usr/bin/env bash

# MariaDB,

## Install non-interactive
export DEBIAN_FRONTEND=noninteractive


### Add Maria PPA
sudo apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 0xF1656F24C74CD1D8
sudo add-apt-repository 'deb [arch=amd64,i386,ppc64el] http://ftp.osuosl.org/pub/mariadb/repo/10.3/ubuntu xenial main'
sudo apt-get update

#### Set the automated root password
export DEBIAN_FRONTEND=noninteractive

debconf-set-selections <<< "mariadb-server-10.3 mysql-server/data-dir select ''"
debconf-set-selections <<< "mariadb-server-10.3 mysql-server/root_password password secret"
debconf-set-selections <<< "mariadb-server-10.3 mysql-server/root_password_again password secret"

sudo apt-get install -y mariadb-server


## Configure Maria Remote Access
sed -i '/^bind-address/s/bind-address.*=.*/bind-address = 0.0.0.0/' /etc/mysql/my.cnf

mysql --user="root" --password="secret" -e "GRANT ALL ON *.* TO root@'0.0.0.0' IDENTIFIED BY 'secret' WITH GRANT OPTION;"
sudo systemctl restart mysql

mysql --user="root" --password="secret" -e "CREATE USER 'hercules'@'0.0.0.0' IDENTIFIED BY 'secret';"
mysql --user="root" --password="secret" -e "GRANT ALL ON *.* TO 'hercules'@'0.0.0.0' IDENTIFIED BY 'secret' WITH GRANT OPTION;"
mysql --user="root" --password="secret" -e "GRANT ALL ON *.* TO 'hercules'@'%' IDENTIFIED BY 'secret' WITH GRANT OPTION;"
mysql --user="root" --password="secret" -e "FLUSH PRIVILEGES;"


## Start
sudo systemctl restart mysql
