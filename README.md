# Book Shop

1. For retrieving data every request is supplied with "x-auth-token: bad18eba1ff45jk7858b8ae88a77fa30" header.
2. 'Main' - page: output list of available books and links to 'Add New Book' and 'Search' pages.
3. 'Add New Book' - page: form validation and errors under invalid fields; all fields are required; save form data to server.
4. 'Search' - page: format options are loaded from server; form fields are filters and are optional, although they are validated where needed; list of filtered books have the same look as the list on the 'Main' page; form fields state changes are immediately reflected in url GET parameters dynamically.

#### Technologies:

Angular4, Bootstrap.

#### Project setup

npm install

node server.js

npm start

