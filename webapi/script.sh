echo '\n requesting all people'
curl localhost:3000/people

echo '\n\n requesting one peole'
curl localhost:3000/people/1

echo '\n\n requesting with wrong body'
curl --silent -X POST \
    --data-binary '{"invalid": "data"}' \
    localhost:3000/people

echo '\n\n creating luna'
curl --silent -X POST \
    --data-binary '{"name": "luna", "age": 100, "city": "itajuba"}' \
    localhost:3000/people

echo '\n\n requesting ID 1'
curl --silent localhost:3000/people/1