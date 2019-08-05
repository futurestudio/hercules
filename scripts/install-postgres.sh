#!/usr/bin/env bash

# PostgreSQL

if [ -f /home/vagrant/.hercules-installed/postgresql ]
then
    echo "PostgreSQL is already installed"
    exit 0
fi

touch /home/vagrant/.hercules-installed/postgresql


# prepare
sudo echo 'deb http://apt.postgresql.org/pub/repos/apt/ xenial-pgdg main' >> /etc/apt/sources.list.d/pgdg.list
sudo wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo apt-get update

# install
sudo apt-get install -y postgresql-10

# Configure Postgres remote access
sudo sed -i "s/#listen_addresses = 'localhost'/listen_addresses = '*'/g" /etc/postgresql/10/main/postgresql.conf
sudo echo "host    all             all             10.0.2.2/32                 md5" | tee -a /etc/postgresql/10/main/pg_hba.conf
sudo echo "host    all             all             192.168.33.1/32             md5" | tee -a /etc/postgresql/10/main/pg_hba.conf
sudo -u postgres psql -c "CREATE ROLE hercules LOGIN PASSWORD 'secret' SUPERUSER INHERIT NOCREATEDB NOCREATEROLE NOREPLICATION;"
sudo -u postgres /usr/bin/createdb --echo --owner=hercules hercules

sudo systemctl restart postgresql
