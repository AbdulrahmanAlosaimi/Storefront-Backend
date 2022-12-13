# Storefront Backend Project

## Getting Started

This repo contains the files for the backend of a store, it has all the required functionalities of a storefront. Following are the setup instructions.

## Setup Instructions

- Make sure to run `npm i` to install all the required dependencies
- Create a Postgres database called `storefront_backend`, and a user called `admin` and grant all privileges to the user by running the following commands:
  `CREATE DATABASE storefront_backend;`
  `CREATE USER admin;`
  The following commands should be run in case of an error like `Permission denied for schema public`:
  `ALTER DATABASE storefront_backend OWNER TO admin;`
  `GRANT ALL ON DATABASE storefront_backend TO admin;`
- Run `db-migrate up` to ensure the database is on the correct state
- Run `npm run build` to build the typescript files into javascript files in the `build` folder which can be found in the project root
- Run `npm run watch` to run the server and listen to any requests

That's it! You should be set to use the backend with Postman or any tools of your liking, the routes can be found in the `REQUIREMENTS.md` file

Note: The database migrations connection information can be found in the `database.json` file, any other environment variables can be found in the `REQUIREMENTS.md` file.

## Testing

Run `npm run test` to run the tests for the project. The tests include tests for the routes and database models.

---

This project was developed by Abdulrahman Alosaimi as a project for the Full Stack JavaScript Developer Nanodegree
