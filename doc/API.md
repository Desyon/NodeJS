# Rest API Documentation

Documentation for all routes provided by the servers Rest API. Please check the specification to know
which fields are mandatory. The two routes for maintenance are not documented.

## User

### Login
**POST** ``/user/login``
````json
{
  "username": "someuser",
  "password": "password"
}
````
*Return Value:*
````json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0OTY3NjY1MTYsInN1YiI6ImF1dGhlbnRpY2F0aW9uIiwiaXNzIjoiY2FsZW5kYXJTZXJ2ZXIiLCJhdWQiOiJzZXJ2ZXJTZXJ2aWNlcyIsInVzZXIiOiJmcmFuayIsImlhdCI6MTQ5Njc2MjkxNn0.HqQrmsFY2zON-DXpC4Ah6IMvCt5_sIW3DXMRWtBtnzA"
}
````

### Sign up
**POST** ``/user/create``
````json
{
  "username": "someuser",
  "name": "John Doe",
  "email": "john@doe.com",
  "dob": "20.05.1985",
  "password": "password"
}
````
*Return value:*
````json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0OTY3NjY1MTYsInN1YiI6ImF1dGhlbnRpY2F0aW9uIiwiaXNzIjoiY2FsZW5kYXJTZXJ2ZXIiLCJhdWQiOiJzZXJ2ZXJTZXJ2aWNlcyIsInVzZXIiOiJmcmFuayIsImlhdCI6MTQ5Njc2MjkxNn0.HqQrmsFY2zON-DXpC4Ah6IMvCt5_sIW3DXMRWtBtnzA"
}
````


### Update
**PUT** ``/user/:username``
   
#### Header:
````json
{
    "content-type": "application/json",
    "authorization": "jwt"
}
````
Note: JWT user has to match the username specified in the URL.

#### Body:
````json
{
  "name": "John Doe",
  "dob": "20.05.1985",
  "email": "john@doe.com",
  "password": "password"
}
````
*No content in return value*

### Delete
**DELETE** ``/user/username``

#### Header:
````json
{
    "content-type": "application/json",
    "authorization": "jwt"
}
````
Note: JWT user has to match the username specified in the URL.

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
  "date": "05.06.2017",
  "time": "20:00",
  "allday": false,
  "category": 4,
  "owner": "someuser",
  "location": "Home",
  "notes": "definitely get some food before"
}
````

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
  "date": "05.06.2017",
  "time": "20:00",
  "allday": false,
  "category": 4,
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
  "date": "05.06.2017",
  "time": "20:00",
  "allday": false,
  "owner": "someuser",
  "category": 4,
  "location": "Home",
  "notes": "definitely get some food before",
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
  "name": "Work",
  "color": "C0FFEE",
  "description": "My work appointments"
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
  "name": "Work",
  "color": "C0FFEE",
  "description": "My work appointments"
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
  "name": "Work",
  "owner": "someuser",
  "color": "C0FFEE",
  "description": "My work appointments",
  "_id": 4
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
