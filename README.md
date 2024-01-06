# Nginx with Node.js Challenge

## Overview

This repository contains a Node.js application designed for the "Nginx com Node.js" challenge, part of the Docker module in the **FullCycle 3.0** course. The challenge focuses on implementing an Nginx reverse proxy to interact with a Node.js application that records entries in a MySQL database. The primary goal is to demonstrate the practical use of Nginx in conjunction with a Node.js backend.

## Challenge Requirements

- Implement Nginx as a reverse proxy that directs requests to a Node.js application.
- Develop the Node.js application to insert records into a MySQL database.
- Ensure the Node.js application's response includes:
  - A title `Full Cycle Rocks!`.
  - A list of names retrieved from the database.
- Configure docker-compose so that the environment can be set up with the command `docker-compose up -d`, and the application is accessible on `localhost:8080`.
- Use JavaScript as the programming language for the Node.js application.

## Instructions

### Development Environment

To set up and enter the development environment for the project, simply run the following command:
```sh
make run-dev
```

This command starts the necessary services using `docker-compose` and then accesses the container's terminal.

> [!NOTE]  
> If `make` is not available on your system, you can achieve the same result by running the following commands:
> ```sh
> docker-compose -f docker-compose.dev.yml up -d
> docker exec -it app bash
> ```

If it's your first time running the dev environment, you'll need to install the project dependencies:
```sh
yarn install
```

To start the Node application, run the following:
```sh
yarn dev
```

The app should then be available at `localhost:3000`.

### Production Environment

To set up the production environment, simply run the docker-compose command:
```sh
docker-compose up -d
```

The app should then be available at `localhost:8080`.
