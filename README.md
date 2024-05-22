# Task Management API

This project is an API for task management, built with Node.js, Express, and MongoDB. User authentication is handled via AWS Cognito, using the AWS SDK and Passport for request authorization. This project uses Yarn as the package manager.

## Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14.x or higher)
- [Yarn](https://yarnpkg.com/) (version 1.x or higher)
- [MongoDB](https://www.mongodb.com/)

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/MoisesArvelo/tasks-api.git
   cd tasks-api
   ```

2. Install project dependencies using Yarn:

   ```bash
   yarn install
   ```

3. Configure environment variables. Create a `.env` file in the project root and add the following variables:

   ```env
   APP_NAME="TASKS API"
   PORT=3000
   STAGE=development
   PINO_LOG_LEVEL=debug
   DB_URL=mongodb+srv://cluster:<password>@<name>.5xlrfki.mongodb.net/<db_name>
   AWS_COGNITO_CLIENT_ID=''
   AWS_COGNITO_ISSUER='https://cognito-idp.us-east-1.amazonaws.com/######'
   ```

## Usage

### Start the Server

To start the server in development mode, run:

```bash
yarn dev
```
