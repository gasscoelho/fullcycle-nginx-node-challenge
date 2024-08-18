# Nginx with Node.js Challenge

## Overview

This repository contains a Node.js application designed for the "Nginx com Node.js" challenge, part of the Docker module in the **FullCycle 3.0** course. The challenge focuses on implementing an Nginx reverse proxy to interact with a Node.js application that records entries in a MySQL database. The primary goal is to demonstrate the practical use of Nginx in conjunction with a Node.js backend.

## Project Demo

![demo-nginx-with-node-challenge](https://github.com/gasscoelho/fullcycle-nginx-node-challenge/assets/33602013/6f3c63c9-00dd-4a0b-bd78-282a3717d599)

## Challenge Requirements

- Implement Nginx as a reverse proxy that directs requests to a Node.js application.
- Develop the Node.js application to insert records into a MySQL database.
- Ensure the Node.js application's response includes:
  - A title `Full Cycle Rocks!`.
  - A list of names retrieved from the database.
- Configure docker-compose so that the environment can be set up with the command `docker-compose up -d`, and the application is accessible on `localhost:8080`.
- Use JavaScript as the programming language for the Node.js application.

## Instructions

### Env Files

This project uses several environment (.env) files to manage configurations for different parts of the application. Below is a guide on how to set up each:

1. **Root Project `.env`**:
   - **Purpose**: Used by Docker Compose to configure the services.
   - **Setup**: Copy the `env.example` values to `.env`.

2. **Node Project `.env`**:
   - **Purpose**: Contains configuration specific to the Node.js application.
   - **Setup**: Copy the `env.example` values to `.env`.

3. **Node Test Environment `.env.test`**:
   - **Purpose**: Manages settings used during testing.
   - **Setup**: Copy the `env.test.example` values to `.env.test`.

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

> [!IMPORTANT]
> Before running `yarn test` for the first time, it's necessary to adjust file permissions for the database volume on your host machine, especially if you're using WSL. This step ensures that the test environment can access and modify the database files without permission errors. In your host terminal (not within the Docker environment), execute the following command:
> ```sh
> sudo chown -R $USER:$USER node/db
> ```
> This command changes the ownership of the node/db directory to your current user, resolving potential permission issues when running tests.

### Production Environment

To set up the production environment, simply run the docker-compose command:
```sh
docker-compose up -d
```

The app should then be available at `localhost:8080`.

## Development Journey

### Refactoring to Higher-Order Functions (HoF)

When researching architecture and design patterns, I often found examples using Object-Oriented Programming, such as classes and interfaces (especially in TypeScript).

JavaScript is a multi-paradigm language supporting procedural, object-oriented (prototype-based), and functional programming styles. Because of this, the use of Procedural Programming is still common, particularly in the Transaction Script pattern.

Initially, I started this project using the Transaction Script pattern, where all my business logic was around functions without the use of Classes.

However, to apply some concepts of Clean Architecture, I needed to refactor my code to enable Dependency Injection (DI) and Inversion of Control (IoC). My primary question was, "How can I achieve this without classes, since most examples use classes for dependency injection through constructors?" This led me to discover Higher-Order Functions, which are functions that can take another function as an argument or return a function as a result. With Higher-Order Functions, I was able to implement dependency injection and inversion of control in the project. The parent function would receive the dependencies as arguments and pass them to the child functions.

### Testing the Project

Creating tests isn't something I've done much of before, so setting up tests was a new and important goal for this project.

Given the simplicity of the project, it didn't seem necessary to dive into complex testing. Instead, I decided to focus on integration testing to check that the endpoints were working properly.

In exploring testing strategies, I realized the importance of using a dedicated database for testing. This was critical because some of my business logic relies on database constraints, and simply mocking database interactions wouldn't effectively test that logic. This led me to ask, "How do we properly test the repository layer?"

Initially, I used my application's main database to test the API endpoints. After confirming that these tests worked and passed, I faced a new challenge: "How can I set up a dedicated database just for testing?"

That's when I discovered Testcontainers, an open source framework that makes it easy to create disposable, lightweight instances of services like databases or message brokers in Docker containers.

My plan seemed simple: use Testcontainers to spin up a MySQL database instance for testing purposes only, ensuring that my application's main database would remain untouched.

However, not everything went as planned. The hurdle was that testcontainers require a container runtime, but my development setup was already inside a Docker container.

#### DinD vs DooD (Sibling Container)

Jumping into Docker was a bit out of my comfort zone, and tackling the nuances of running Docker within Docker proved to be quite a challenge. While there are two main strategies for this—DinD (Docker in Docker) and DooD (Docker out of Docker)—I won't get into details about their differences here. My primary goal is to share the challenges I encountered while implementing this setup. For this project, I chose the DooD approach, utilizing what's known as a sibling container strategy.

This choice led me to configure my Docker Compose with a volume for the Docker socket, enabling communication between the container and the host's Docker daemon.

However, adjusting my Docker image to install Docker wasn't a straightforward fix. It introduced a couple of significant issues:
- Struggling with permission errors when attempting to utilize the shared Docker socket.
- Dealing with tests that would just hang and then time out, never completing as expected.

**Tackling Permission Issues:** The first major roadblock was the permission issues with the Docker socket. The fix required a bit of alignment between the build image and the Docker host. Specifically, I made sure the Group ID (GID) of the Docker host matched the build image. Additionally, I tweaked the Docker Compose configuration to include the container user in the Docker group.

**Addressing Test Delays:** The second issue was the endless waiting and timing out of my tests. The breakthrough came when I decided to override the Testcontainers host to `host.docker.internal``. This tweak was essential due to my setup running on WSL2 with Docker Desktop. It's a bit of a unique workaround but was the key to moving forward.

In Summary:
- Customizing the Docker image to include Docker, ensuring it was equipped for the tasks at hand.
- Adding a volume for the Docker socket to the Docker Compose setup, establishing the necessary link for container-host communication.
- Updating user permissions to avoid access issues, specifically adding the container user to the Docker group to smooth out permission wrinkles.
- Overriding the Testcontainers host setting to `host.docker.internal``, a necessary adjustment for compatibility with my WSL2 and Docker Desktop environment.

Implementing these adjustments was crucial for my development environment to work seamlessly with Docker. However, when considering a Continuous Integration (CI) environment, both DinD and DooD approaches come with their share of security concerns. Interestingly, there's a promising solution called Sysbox. This tool offers a way to employ DinD strategies while maintaining isolation, effectively sidestepping those security pitfalls. Unfortunately, due to my setup with WSL2, I couldn't get Sysbox up and running locally to give it a try.

As for applying these fixes in a CI setup, it's possible that they might not be required, given the differences in how CI environments are structured compared to local development setups. But, without having tested this myself, I can't say for sure. It's an area I'm looking forward to exploring further.
