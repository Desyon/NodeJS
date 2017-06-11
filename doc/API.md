# Rest API Documentation

Documentation for all routes provided by the servers Rest API. Please check the specification to know
which fields are mandatory. The two routes for maintenance are not documented.

## User

### Login
**POST** ``/user/login``

#### Header:
````json
{
  "Content-Type": "application/json"
}
````

#### Body:
````json
{
  "username": "someuser",
  "password": "password"
}
````
*Return Value:*
````json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0OTY3NjY1MTYsInN1YiI6ImF1dGhlbnRpY2F0aW9uIiwiaXNzIjoiY2FsZW5kYXJTZXJ2ZXIiLCJhdWQiOiJzZXJ2ZXJTZXJ2aWNlcyIsInVzZXIiOiJmcmFuayIsImlhdCI6MTQ5Njc2MjkxNn0.HqQrmsFY2zON-DXpC4Ah6IMvCt5_sIW3DXMRWtBtnzA",
  "msg": "Success"
}
````

### Sign up
**POST** ``/user/create``

#### Header:
````json
{
  "Content-Type": "application/json"
}
````

#### Body:
````json
{
  "username": "someuser",
  "name": "John Doe",
  "email": "john@doe.com",
  "dob": "2017-06-10T22:00:00.000Z",
  "password": "password"
}
````
*Return value:*
````json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0OTY3NjY1MTYsInN1YiI6ImF1dGhlbnRpY2F0aW9uIiwiaXNzIjoiY2FsZW5kYXJTZXJ2ZXIiLCJhdWQiOiJzZXJ2ZXJTZXJ2aWNlcyIsInVzZXIiOiJmcmFuayIsImlhdCI6MTQ5Njc2MjkxNn0.HqQrmsFY2zON-DXpC4Ah6IMvCt5_sIW3DXMRWtBtnzA",
  "msg": "Success"
}
````


### Update
**PUT** ``/user``
   
#### Header:
````json
{
    "content-type": "application/json",
    "authorization": "jwt"
}
````

#### Body:
````json
{
  "name": "John Doe",
  "dob": "2017-06-10T22:00:00.000Z",
  "email": "john@doe.com",
  "password": "password"
}
````
*No content in return value*

### Get User
**GET** ``/user``

### Header:
````json
{
  "authorization": "jwt"
}
````
*Return Value:*
````json
{
  "name": "John Doe",
  "dob": "2017-06-10T22:00:00.000Z",
  "email": "john@doe.com",
  "password": "password",
  "_id": 2
}
````

### Delete
**DELETE** ``/user``

#### Header:
````json
{
  "content-type": "application/json",
  "authorization": "jwt"
}
````

## Event

### Create
**POST** ``/event/create``

#### Header:
````json
{
    "content-type": "application/json",
    "authorization": "jwt"
}
````
Note: JWT user has to match the owner specified in the body.

### Body:
````json
{
  "title": "My awesome Event",
  "start": "2017-06-08T13:37:00.000Z",
  "end": "2017-06-08T15:36:14.000Z",
  "category": "Awesome Events",
  "location": "Home",
  "notes": "definitely get some food before"
}
````
Note: The given category has to exist.

### Update
**PUT** ``/event/:id``

#### Header:
````json
{
    "content-type": "application/json",
    "authorization": "jwt"
}
````
Note: JWT user has to match the owner of the event specified in the URL.

### Body:
````json
{
  "title:": "My awesome Event",
  "start": "2017-06-08T13:37:00.000Z",
  "end": "2017-06-08T15:36:14.000Z",
  "category": "Awesome Events",
  "location": "Home",
  "notes": "definitely get some food before"
}
````

### Get (by ID)
**GET** ``/event/:id``

#### Header:
````json
{
    "content-type": "application/json",
    "authorization": "jwt"
}
````
Note: JWT user has to match the owner of the event specified in the URL.

*Return Value:*
````json
{
  "title:": "My awesome Event",
  "start": "2017-06-08T13:37:00.000Z",
  "end": "2017-06-08T15:36:14.000Z",
  "owner": "someuser",
  "category": "Awesome Events",
  "location": "Home",
  "notes": "definitely get some food before",
  "color": "#c0ffee",
  "_id": 3
}
````

### Get (all events)
**GET** ``/event/all``

#### Header:
````json
{
    "content-type": "application/json",
    "authorization": "jwt"
}
````

*Return value:*

All events of the user specified in the JWT in an array.

### Delete
**DELETE** ``/event/:id``

#### Header:
````json
{
    "content-type": "application/json",
    "authorization": "jwt"
}
````
Note: JWT user has to match the owner of the event specified in the URL.

## Category

### Create
**POST** ``/category/create``

#### Header:
````json
{
    "content-type": "application/json",
    "authorization": "jwt"
}
````
Note: JWT user has to match the owner specified in the body.

### Body:
````json
{
  "name": "Awesome events",
  "color": "#c0ffee",
  "description": "Cool Stuff"
}
````

### Update
**PUT** ``/category/:id``

#### Header:
````json
{
    "content-type": "application/json",
    "authorization": "jwt"
}
````
Note: JWT user has to match the owner of the category specified in the URL.

### Body:
````json
{
  "name": "Awesome Events",
  "color": "#c0ffee",
  "description": "Cool Stuff"
}
````

### Get (by ID)
**GET** ``/category/:id``

#### Header:
````json
{
    "content-type": "application/json",
    "authorization": "jwt"
}
````
Note: JWT user has to match the owner of the category specified in the URL.

*Return Value:*
````json
{
  "name": "Awesome Events",
  "owner": "someuser",
  "color": "#c0ffee",
  "description": "Cool Stuff",
  "_id": 2
}
````

### Get (all categories)
**GET** ``/category/all``

#### Header:
````json
{
    "content-type": "application/json",
    "authorization": "jwt"
}
````

*Return value:*

All categories of the user specified in the JWT in an array.

### Delete
**DELETE** ``/category/:id``

#### Header:
````json
{
    "content-type": "application/json",
    "authorization": "jwt"
}
````
Note: JWT user has to match the owner of the category specified in the URL.

## Administration

This routes are for administration only. 

### Delete Database
**DELETE** ``/administration/database``

#### Header
````json
{
  "Authorization": "admin"
}
````
### Initialize Database
**GET** ``/administration/database``

### Initialize Test Data
**PUT** ``/administration/test``
