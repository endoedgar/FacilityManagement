# FacilityMngmt - Express Documentation

The server uses the following routes to access the resources.
Make sure to prepend ```/api/v1``` to each request.

[TOC]

## USER

### GET /users
Returns an array of users on success.
**Requires Authorization**

#### Example Response:
##### 200:
```json
[
  {
    "_id": "5e6ab042231bc826313850b3",
    "name": "admin",
    "username": "admin",
    "password": "admin",
    "admin": true,
    "__v": 0
  },
  {
    "_id": "5e6ab6ace51c3a2f1f1a1b1b",
    "name": "helloWorld",
    "password": "helloworld",
    "__v": 0
  }
]
```

### POST /users
Insert a new user and returns its JWT token if successful.
**No Authorization Required**

#### Request Body:
```json
{
    "name": "nameOfUser",
	"username": "usernameOfUser",
    "password": "passwordOfUser"
}
```
#### Example Response:
##### 201:
```json
{
  "message": "User created successfully.",
  "accessToken": "eyJhbGciOiJIU...."
}
```
##### 500:
```json
{
  "message": "MongoError: E11000 duplicate key error collection: ..."
}
```

### POST /login
Logins a user and returns a JWT token if successful.
**No Authorization Required**

#### Request Body:
```json
{
	"username": "usernameOfUser",
    "password": "passwordOfUser"
}
```
#### Example Response:
##### 200:
```json
{
  "accessToken": "eyJhbGciOiJIU..."
}
```
##### 401:
```json
{
  "message": "Invalid credentials."
}
```
