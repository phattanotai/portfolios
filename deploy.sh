#!/bin/bash
 
#run docker with docker
docker-compose build --build-arg VERSION_INFO=$1

# deploy docker
docker-compose up -d

# deploy docker swarm

# docker stack deploy --compose-file docker-compose.yml react-cicd
# docker service update portfilios --image portfilios --force

