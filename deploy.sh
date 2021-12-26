#!/bin/bash
 
#run docker with docker
docker-compose build --build-arg VERSION_INFO=$1
docker-compose up -d
# docker stack deploy --compose-file docker-compose.yml react-cicd
# docker service update react-cicd_react-context-cicd --image react-context-cicd --force

