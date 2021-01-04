#!/usr/bin/env bash

# Change into the folder where all our typescript lives
# (arc doesn't hydrate this for us as we're using our 'dist' directory,
# and symlinks allow vscode to open files from lambdas and edit the originals)
cd src

make-links (){
  # Eg 'shared/' (trailing slash is a bit icky but that's what inotify gives us)
  WATCHED_DIR=$1
  # Eg 'authentication.ts'
  FILENAME=$2
  echo "${WATCHED_DIR} ${FILENAME}"
  for LAMBDA in http/* ws/*; do 
    ARCHITECT_MODULES_DIR=$LAMBDA/node_modules/@architect
    DESTINATION_DIR=${ARCHITECT_MODULES_DIR}/${WATCHED_DIR}
    [ -d ${DESTINATION_DIR} ] || mkdir -p ${DESTINATION_DIR}; 

    # Clean up old bad links and files
    [ -e ${DESTINATION_DIR}${FILENAME} ] && rm ${DESTINATION_DIR}${FILENAME} 

    # Make link (yes the top level of the project is 6 levels above each lambda's shared dir)
    ln -vs "../../../../../../src/${WATCHED_DIR}${FILENAME}" ${DESTINATION_DIR}${FILENAME} 
  done
}

# Start with an initial create of symlinks for all lambdas
for DIR in 'shared' 'views'; do
  for FILENAME in $(ls -1 ${DIR}); do
    make-links ${DIR}/ ${FILENAME}
  done
done

# Then watch for changes (if asked)
if [ "$1" == "watch" ]; then
  echo "Watching shared and views directories for changes..."
  inotifywait -q -m -e modify,create 'shared' 'views' | while read -r WATCHED_DIR EVENT FILENAME; do  
    echo "${WATCHED_DIR} ${FILENAME}"
    make-links $WATCHED_DIR $FILENAME
  done
fi  