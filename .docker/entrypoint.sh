#!/bin/bash

npm config set cache /home/node/app/.npm-cache --global

cd /home/node/app
if [ ! -f ".env" ]; then cp .env.example .env; fi
npm install
# while sleep 1000; do :; done
nodemon -L #legacy (importante quando está usando docker)
