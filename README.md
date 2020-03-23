# Housing

Housing is a web application with the objective of connecting international students who are comming to study at the Federal University of Pelotas with local families who are willing to host them in their homes.

## Project structure

All the source code will be inside the src directory. Inside src, there is the client directory containing all the frontend code, and the server directory for the backend.

The frontend is built with ReactJS using the Bootstrap library and simple CSS for styling. The axios library is responsible for requesting data from the API to the frontend.

The backend consists of a REST API implemented in NodeJS with the Express library. MongoDB is used to store the data from the application. Mongoose is employed to connect the API to the database and model the objects.

The application is containerized with docker and docker-compose so it can run in an isolated environment and be easily deployed on a cloud platform.

The development of the application is based on TDD, with automated tests implemented in Python and Shell Script. These tests are integrated with git using git-hooks.

## Installation

### Pre-requisites

To build and run this application you'll need git, docker and docker-compose.

### Instructions

Clone the repository to your machine.

```bash
$ git clone https://github.com/arthurcerveira/Housing.git
```

Inside the directory, build and run the docker container with docker-compose.

```bash
$ cd Housing
$ docker-compose up -d
```

By default, the application will run on `http://localhost:8000/` and the API on `http://localhost:8000/api/`.

## Available scripts

To access the container before executing the scripts.

```bash
$ docker-compose exec app bash
```

### Tests

The tests are available in the `scripts` directory.

```bash
$ ./scripts/run-tests.sh
```

And they can also be performed directly from the `tests` directory.

```bash
$ python tests/test_api.py
```

### Debugging

Add 3 accounts to the database.

```bash
$ python tests/debugging/add_users.py
```

Remove all accounts from the database.

```bash
$ python tests/debugging/remove_users.py
```

Print accounts to standard output.

```bash
$ python tests/debugging/display_users.py
```

## Acknowledgements

- This application uses as template [simple-react-full-stack](https://github.com/crsandeep/simple-react-full-stack) by Sandeep Raveesh.
