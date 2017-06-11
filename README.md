# Calendar App

[![Build Status](https://travis-ci.org/Desyon/NodeJS.svg?branch=master)](https://travis-ci.org/Desyon/NodeJS)

This is a simple app including a server on NodeJS and a Angular based WebApp communication over a
REST API. This project is for studying purposes.

## Installation
These steps must be followed to install and run the app and be able to use all tools such as gulp
or eslint:

1. Run ``npm install`` to install all dependencies of the project.

2. Run ``npm install --global gulp-cli``. If you have it already installed this is not necessary.

3. Run ``gulp build`` to create all needed files from the current sources.

4. Now the server can be started any time using the command ``npm start``. It can be accessed via
the ``index.html`` in the ``build/client`` folder.

To have some working data you can all the route ``/administration/test`` to create userdate
according to the API Doucmentation. The default login is "someuser" with the password "password".
