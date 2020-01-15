# Oreos

Oreo is my dog's name. It is also the name of this project.

## Installation

### Requirements
+ A local postgres database set up 
+ 

## Usage
This project uses [npm](https://www.npmjs.com/). 
Run `npm install` to install relevant packages.
### Client side
Run `npm start` to build a dev environment. This should open up the application on http://localhost:3000/
Refer to [package.json](https://github.com/nhironaka/oreos/blob/master/package.json) for more scripts.

### Server side
Create a .env file in your root directory with the following information:
  - DB_NAME={/* Database name */}
  - DB_HOST={/* Database host such as localhost, 127.0.0.1 */}
  - DB_USER={/* Database user name */}
  - DB_PASSWORD={/* Database password */}
  - PORT={/* Port to use */}
Run `npm server` to run a local server.