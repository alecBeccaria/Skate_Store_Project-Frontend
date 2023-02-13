#! /bin/bash
# Docker fun stuff
docker compose up -d

# Check Login
aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 249804032116.dkr.ecr.us-west-2.amazonaws.com/sen310


#Tag and push to ECR
docker tag performance_get:1.0 249804032116.dkr.ecr.us-west-2.amazonaws.com/sen310:Performance_GET
docker tag performance_post:1.0 249804032116.dkr.ecr.us-west-2.amazonaws.com/sen310:Performance_POST
docker tag performance_delete:1.0 249804032116.dkr.ecr.us-west-2.amazonaws.com/sen310:Performance_DELETE
docker tag performance_put:1.0 249804032116.dkr.ecr.us-west-2.amazonaws.com/sen310:Performance_PUT
docker tag list_update:1.0 249804032116.dkr.ecr.us-west-2.amazonaws.com/sen310:Performance_LIST

docker push 249804032116.dkr.ecr.us-west-2.amazonaws.com/sen310:Performance_GET
docker push 249804032116.dkr.ecr.us-west-2.amazonaws.com/sen310:Performance_POST
docker push 249804032116.dkr.ecr.us-west-2.amazonaws.com/sen310:Performance_DELETE
docker push 249804032116.dkr.ecr.us-west-2.amazonaws.com/sen310:Performance_PUT
docker push 249804032116.dkr.ecr.us-west-2.amazonaws.com/sen310:Performance_LIST