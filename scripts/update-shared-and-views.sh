#!/usr/bin/env bash
SHARED_DIR='src/shared'
VIEWS_DIR='src/views'

for FILE in src/http/*; do 
  ARCHITECT_MODULES_DIR=$FILE/node_modules/@architect
  [ -d ${ARCHITECT_MODULES_DIR} ] || mkdir -p ${ARCHITECT_MODULES_DIR}; 
  cp -rv ${SHARED_DIR} ${ARCHITECT_MODULES_DIR}
  cp -rv ${VIEWS_DIR} ${ARCHITECT_MODULES_DIR}
done