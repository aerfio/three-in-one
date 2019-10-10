https://www.howtographql.com/graphql-python/1-getting-started/

Make virtualenv so that you do not pollute your system, like in link above. `python3 -m venv venv`

Remember that outside of this directory `python` is python2.7, and inside it's `python3.7`, you can check it by using `which python`

use docker commands:

```bash
docker build -t three-in-one .
docker container run --publish 8000:8000 --detach three-in-one
```

`docker ps` to find an image to kill it by its id later
