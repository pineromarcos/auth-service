#!/bin/bash
cd ${BASH_SOURCE%/*}
source ./shell.cfg

echo -e  "\nDOCKER SETUP ENVIRNOMENT\n"
echo -e "Setup will remove all containers"
read -r -p "Do you wish to proceed? [y/n] " response

case "$response" in
    [yY][eE][sS]|[yY]) 
        echo -e "> Stopping and removing containers with data\n"
        docker-compose --env-file ${ENV_FILE} down 

        echo -e "> Removing node_modules dependencies\n"
        rm -Rf ../../node_modules            

        echo -e "> Building containers\n"
        docker-compose --env-file ${ENV_FILE} up -d
esac
exit