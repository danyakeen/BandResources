#!/usr/bin/bash

export RABBITMQ_HOST=127.0.0.1
export UDIDB_HOST=127.0.0.1:2459

cd services/

# consider running run_udidb.sh and run_rabbitmq.sh 
# if they are going to be run on the same host (localhost)
# /usr/bin/bash run_udidb.sh &
# /usr/bin/bash run_rabbitmq.sh &

PORT=3187 node httph/http-handler.js &
# # /usr/bin/python3 ./services/easyocr.py < /dev/null > /dev/null 2>&1 &
