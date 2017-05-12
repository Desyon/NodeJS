# REST API Documentation

## Users
All actions that are done by interacting with the user entity.

### Login
**POST** ``/user/login``

*Request body:*
````json
{
  "username": "username",
  "password": "password"
}
````

*Return value*
````json
````

### Create
**POST** ``/user/create``

*Request body:*
````json
{
  "username": "username",
  "name": "Frank Meier",
  "password": "pa$$w0rd",
  "dob": "01.01.1970",
  "email": "frank.meier@gmail.com"
}
````

*Return value*
````json
````

### Update
**PUT** ``/user/:id``

*Request body:*
````json
{
  "id": "someUniqueId",
  "username": "username",
  "name": "Frank Meier",
  "password": "pa$$w0rd",
  "dob": "01.01.1970",
  "email": "frank.meier@gmail.com"
}
````

*Return value:*
````json
````

### Delete
**DELETE** ``/user/:id``

*Request body:*
````json
{
  "id": "someUniqueId",
  "password": "pa$$w0rd"
}
````

*No return value*

## Events
All actions that are done by interacting with the event entity.

### Create
**POST** ``/event/all``

*Request body:*
````json
{
  "title": "Important Event",
  "date": "06.05.2017",
  "time": "12:45",
  "allday": false,
  "category": "some Category",
  "owner": "Frank Meier",
  "location": "At Home",
  "notes": "Don't be late"
}
````

### Get All Events
**GET** ``/event/all``

Only authorization with token

*Return value:*

````json
[
  {
    "id": "someUniqueId",
    "title": "Important Event",
    "date": "06.05.2017",
    "time": "12:45",
    "allday": false,
    "category": "some Category",
    "owner": "Frank Meier",
    "location": "At Home",
    "notes": "Don't be late"
  },
  {
    "id": "anotherUniqueId"
  }
]
````

*No return value*

### Update
**PUT** ``/event/:id``

*Request body:*
````json
{
  "id": "someUniqueId",
  "title": "Important Event",
  "date": "06.05.2017",
  "time": "12:45",
  "allday": false,
  "category": "some Category",
  "owner": "Frank Meier",
  "location": "At Home",
  "notes": "Don't be late"
}
````

*No return value*

### Delete
**DELETE** ``/event/:id``

Only authorization with token

*No return value*

### Get One Event
**GET** ``/event/:id``

Only authorization with token

*Return value:*

````json
{
  "id": "someUniqueId",
  "title": "Important Event",
  "date": "06.05.2017",
  "time": "12:45",
  "allday": false,
  "category": "some Category",
  "owner": "Frank Meier",
  "location": "At Home",
  "notes": "Don't be late"
}
````

## Category
All actions that are done by interacting with the event entity.

### Create
**POST** ``/category/all``

*Request body:*

````json
{
  "name": "Private",
  "color": "0x424242",
  "description": "My private calendar",
  "owner": "Frank Meier"
}
````

### Get All Categories
**GET** ``/category/all``

Only authorization with token

*Return value:*

````json
[
  {
    "id": "someUniqueId",
    "name": "Private",
    "color": "0x424242",
    "description": "My private calendar",
    "owner": "Frank Meier"
  },
  {
    "id": "anotherUniqueId"
  }
]
````

*No return value*

### Update
**PUT** ``/category/:id``

*Request body:*

````json
{
  "id": "someUniqueId",
   "name": "Private",
   "color": "0x424242",
   "description": "My private calendar",
   "owner": "Frank Meier"
}
````

### Delete
**DELETE** ``/category/:id``

Only authorization with token

*No return value*

### Get One Category
**GET** ``/category/:id``

Only authorization with token

*No return value:*