### Description

An example of experimental project which demonstrate how to build up containerized application.
The goal was to create single-page application for to-do tasks management. The project uses:
* Docker
* Django
* Django REST framework
* VueJS
* Postgres

Be aware the project is currently under development.


### Local development

Copy .env-to-change to a new file in the project's root directory called .env. This file will be read 
by docker-compose in the next step. Adjust any of the values in this file if needed, or add new variables 
for any secret information you need to pass to docker-compose (or to docker containers).

The, for local development (hot reloading on the Vue and Django applications), run the following command
from the project's root directory:

    docker-compose -f docker-compose.dev.yml up --build


### Running tests

This project uses Pytest, you can use docker-compose exec, or you can shell into the container to run tests.

    docker-compose -f docker-compose.dev.yml exec backend_dev pytest

or to shell into container:

    docker exec -it backend_dev /bin/bash
    root@955cc7e7cc0a:/code# pytest . --cov


### License

This project is licensed under the MIT License.
