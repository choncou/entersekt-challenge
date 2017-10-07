# Todo list exercise

### Install

- Install https://nodejs.org/en/
- Download archive from link provided
- Unzip file and cd into it
- run `npm install`

### Run
`node app.js`

Visit http://localhost:8080 in your browser

### High level application requirements
1. Multiple users should be able to view the shared public todo list
2. Should be able to add items
3. Should be able to delete items
4. Should be able to edit items (Missing feature)
5. Must be able to deploy in docker (Missing feature)

### Tasks
1. Add missing requirement #4 to the application
2. Add sufficient test coverage to the application and update readme on howto run the tests
3. Add missing requirement #5 to the application (Dockerfile and update readme with instructions)

### Bonus
4. Display test coverage after tests are executed
5. Find and fix the XSS vulnerability in the application. Also make sure that it wont happen again by including a test.

> ### Notes
> - Update the code as needed and document what you have done in the readme below
> - Will be nice if you can git tag the tasks by number

### Solution
#### Task 1
- Added `/todo/edit/:id` route.
- Sent as post request to pass the form params as part of the request body

#### Task 2
- Used [Cypress](https://docs.cypress.io/) as testing framework. Chosen for simplicity due to minimal dependencies for a small project compared to other UI testing frameworks
- For each of the main action (add, delete, edit) there is a validation test to
  confirm whether the happy path works, as well as a test to ensure the
  defensive programming against the missing ID parameter would not yield
  unexpected results.
- Test can be found in `./cypress`

Running Tests:
1. Run `npm install` to get required dependencies
2. Run `npm start` to run the server for the integration tests, leave running while
testing.
3. Run `npm test` to run all tests

#### Task 3
Docker:
1. Install Docker (https://docs.docker.com/engine/installation/) if not already
  installed
2. In this project directory run the following commands:
  1. `docker build -t unathi/my-todolist .`
  2. `docker run -p 8080:8080 -d unathi/my-todolist`

- The app is now running on `localhost:8080` on your local machine

#### Task 4
N/A
Cypress currently does not support a way of determining coverage on end-to-end
tests.

#### Task 5
- The vulnerability was in displaying unescaped value for each `todo` item
- Cypress currently doesn't support working with alerts, so this test was not
  completed but the concept is shown. The site no longer has the vulnerability.
