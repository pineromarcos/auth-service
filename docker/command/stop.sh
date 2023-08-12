#!/bin/bash
cd ${BASH_SOURCE%/*}

source ./shell.cfg

docker-compose --env-file ${ENV_FILE} stop