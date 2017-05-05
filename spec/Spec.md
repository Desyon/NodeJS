# Specs
Specifications for the project

## Features
1. User management. Includes creating + deleting. Access restriction
2. Event management. Includes creating + deleting.
3. Category management. Includes creating + deleting.

## Entities

### User
A user. Has events(>= 0) and categories(>=1)

Attribute | Data Type | Description | Mandatory
--------- | --------- | ----------- | :-------:
uname | String | unique username; format [A-Za-Z0-9]* | x
fname | String | first name | x
lname | String | last name | x
password | String | hashed | x
dob | Date | Date of Birth | 
phone | String | u know |

### Event
Depicts one event with all properties has an creator/owner + category

Attribute | Data Type | Description | Mandatory
--------- | --------- | ----------- | :-------:
title | String | u know ... | x
date | date | u know ... | x
tile | String | u know ... | x
allday | bool | u know... | x
category | Category | u know... | x
owner | User | u know...; automatically filled | x
location | String | u know ... (Google Maps?) | 
notes | String | u know ... (max length) |
id | ? | unique ID; automatically generated | x 

### Category
Depicts a calender for a certain purpose, e.g. private use, school, work

Attribute | Data Type | Description | Mandatory
--------- | --------- | ----------- | :-------:
name | String | u know... | x
color | Hex | u know... (color picker?) | x
descr | String | u know ... | 
id | ? | unique ID; automatically generated | x
owner | user | username`` | x

## REST-Routes

Authorization for all requests after login will be done with session token.

Route | Function | GET | POST | PUT | DELETE
----- | -------- | --- | ---- | --- | ------
``/`` | root; only redirects <br/> > to login, if not logged in <br/>> to `/user/:id/events`
``/login`` | login page, offers"register" button || with login data to create new user
``/user/:id/account`` | account management | | | with old and new password to change password | with password to delete user
``/user/:id/events`` | main event display page | for all user events | with event data, to create a new event | with ID and data, to update | with ID to delete event
``/user/:id/categories`` | category display/management | for all user categories | with category data, to create new category | with ID and data to update | with ID to delete 
