#!/usr/bin/env bash
echo "Watching shared and views directories for changes..."
cd src
inotifywait -q -m -e modify 'shared' 'views' | while read -r WATCHED_DIR EVENT FILENAME; do
  for LAMBDA in http/*; do 
    ARCHITECT_MODULES_DIR=$LAMBDA/node_modules/@architect
    DESTINATION_DIR=${ARCHITECT_MODULES_DIR}/${WATCHED_DIR}
    [ -d ${DESTINATION_DIR} ] || mkdir -p ${DESTINATION_DIR}; 
    cp -v ${WATCHED_DIR}${FILENAME} ${DESTINATION_DIR}${FILENAME}
  done
done