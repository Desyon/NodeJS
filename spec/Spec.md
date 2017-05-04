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
Username | String | unique username; format [A-Za-Z0-9]* | x
First Name | String | u know ... | x
Last Name | String | u know ... | x
Password | String | hashed | x
BoD | Date | Date of Birth | x
E-mail | String | u know... | x
Phone | String | u know |
Title | String | select from Mr/Mrs | x
Gender | String | free selection | 
ID | ? | unique ID; automatically generated | x

### Event
Depicts one event with all properties has an creator/owner + category

Attribute | Data Type | Description | Mandatory
--------- | --------- | ----------- | :-------:
Title | String | u know ... | x
Date | date | u know ... | x
Time | String | u know ... | x
Allday | bool | u know... | x
Category | Category | u know... | x
Creator | User | u know...; automatically filled | x
Location | String | u know ... (Google Maps?) | 
Participants | String | u know ... |
Notes | String | u know ... (max length) |
ID | ? | unique ID; automatically generated | x 

### Category
Depicts a calender for a certain purpose, e.g. private use, school, work

Attribute | Data Type | Description | Mandatory
--------- | --------- | ----------- | :-------:
Name | String | u know... | x
Color | Hex | u know... (color picker?) | x
Description | String | u know ... | 
ID | ? | unique ID; automatically generated | x

## REST-Routes

Authorization for all requests after login will be done with session token.

Route | Function | GET | POST | PUT | DELETE
----- | -------- | --- | ---- | --- | ------
``/`` | root; only redirects <br/> > to login, if not logged in <br/>> to `/user/:id/events`
``/login`` | login page, offers"register" button || with login data to create new user
``/user/:id/account`` | account management | | | with old and new password to change password | with password to delete user
``/user/:id/events`` | main event display page | for all user events | with event data, to create a new event | with ID and data, to update | with ID to delete event
``/user/:id/categories`` | category display/management | for all user categories | with category data, to create new category | with ID and data to update | with ID to delete 
