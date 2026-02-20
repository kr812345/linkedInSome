# !bin/bash

# run to build and deploy on docker image and push it to hub.

# always update the version before build.


IMAGE="kr812345/easylink:v0.2"

echo -e "\nBuilding The Image..........\n"

docker build -t $IMAGE .

echo -e "\nPushing The Image..........\n"
docker push $IMAGE