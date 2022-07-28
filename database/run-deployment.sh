#!/bin/bash

function check_env() {
  eval val=\$$1
  echo "Checking $1"
  if [[ -z $val ]]; then
    echo "$1 wasn't passed"
    exit 1
  fi
}

check_env POSTGRESQL_USER;
check_env POSTGRESQL_PASSWORD;
check_env POSTGRESQL_HOST;
check_env POSTGRESQL_PORT;
check_env POSTGRESQL_DATABASE;

PGUSER="$POSTGRESQL_USER" PGPASSWORD="$POSTGRESQL_PASSWORD" sqitch deploy --verify db:pg://$POSTGRESQL_HOST:$POSTGRESQL_PORT/$POSTGRESQL_DATABASE

