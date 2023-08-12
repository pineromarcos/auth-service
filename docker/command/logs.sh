#!/bin/bash
cd ${BASH_SOURCE%/*}

source ./shell.cfg

source ./_show_container_options.sh

echo "Showing logs for -> ${SELECTED_CONTAINER}"

docker-compose --env-file ${ENV_FILE} logs -f ${SELECTED_CONTAINER}