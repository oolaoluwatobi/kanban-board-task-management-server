# Kanban Board Task Management Backend

[Project Link](https://kanban-client-sigma.vercel.app/)

This repository contains the backend implementation for a task management application built with Node.js, Express, and MongoDB. The backend follows the Model-View-Controller (MVC) pattern and provides RESTful API endpoints to create, update, and delete tasks.

It is the backend part of a fullstack app, MERN stack, [link to frontend, React repo](https://github.com/oolaoluwatobi/kanban-client)


## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [MVC Pattern](#mvc-pattern)
- [RESTful API Endpoints](#restful-api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This backend implementation serves as the backend for a task management application. It utilizes Node.js and Express to create a robust server, and MongoDB as the database for storing task data.

## Features

- Model-View-Controller (MVC) pattern for organized code structure
- RESTful API endpoints for task management
- Create, update, and delete tasks

## Installation

Follow these steps to set up and run the backend locally:

1. Clone the repository:

```bash
git clone https://github.com/oolaoluwatobi/kanban-board-task-management-server
```

2. Change into the project directory:

```bash
cd kanban-board-task-management-server
```

3. Install the required dependencies:
```bash
npm install
```

4. Set up environment variables:

Create a `.env` file in the root of the project and add the necessary environment variables, such as:
```bash
MONGODB_URI=your-mongodb-connection-uri

```


## Usage

To start the backend server, use the following command:

```bash
npm start
```

The server will start running on `http://localhost:5000`


## MVC Pattern

The backend follows the MVC pattern to structure the code into separate modules:

- Models:   Defines the MongoDB schema for tasks. The task model is defined in Task.js. It includes fields for title, description, and status, representing the task's title, description, and completion status.
- Views: Handle presentation and rendering of data (not applicable for the backend).
- Controllers:  Manage the application's logic and serve as an intermediary between models and views.
- Routes: Defines API routes for tasks.
- Config: Contains the MongoDB connection configuration.

```bash
kanban-board-backend/
  ├── controllers/
  │   ├── taskController.js
  ├── model/
  │   ├── Task.js
  ├── routes/api/
  │   ├── tasks.js
  ├── config/
  │   ├── dbConn.js
  ├── server.js
  ├── package.json
  └── .gitignore

```

##  RESTful API Endpoints

The app interacts with a RESTful API to manage tasks. Some of the API endpoints include:

- Fetch all tasks: `GET /` or `GET /task`
- Fetch a single task: `GET /tasks/:id`
- Create a new task: `POST /tasks`
- Update an existing task: `PUT /tasks/:id`
- Delete a task: `DELETE /tasks/:id`

Refer to the `tasks.js` file for detailed route definitions.

## Contributing

Contributions are welcomed from the community! If you encounter any issues or have suggestions for improvements, please feel free to open an issue or create a pull request.

Thank you for using our backend with Node.js, Express, and MongoDB for contact management! We hope this implementation of the MVC pattern and RESTful API endpoints serves as a helpful reference for your projects. Happy contact management!
## Screenshot

![App Screenshot](https://github.com/oolaoluwatobi/kanban-board-task-management-server/blob/main/server.png)

