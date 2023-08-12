#!/bin/bash
cd ${BASH_SOURCE%/*}

source ./shell.cfg

source ./_show_container_options.sh

echo "Ssh into -> ${SELECTED_CONTAINER}"

docker-compose --env-file ${ENV_FILE} exec ${SELECTED_CONTAINER} sh