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
username | String | username; unique; format [A-Za-Z0-9]* | x
name | String | name of the user | x
password | String | hashed | x
dob | Date | Date of Birth | 
email | String | u know |

### Event
Depicts one event with all properties has an creator/owner + category

Attribute | Data Type | Description | Mandatory
--------- | --------- | ----------- | :-------:
title | String | u know ... | x
date | date | u know ... | x
time | String | u know ... | x
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
description | String | u know ... | 
id | ? | unique ID; automatically generated | x
owner | user | username | x

## REST-Routes

For REST-routes look up the ``API.md`` in the doc folder.