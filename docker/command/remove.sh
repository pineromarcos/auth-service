#!/bin/bash
cd ${BASH_SOURCE%/*}

source ./shell.cfg

bash ./stop.sh

docker-compose --env-file ${ENV_FILE} rm