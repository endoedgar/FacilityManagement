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

## Facility

### GET /facilities
Returns an array of facilities on success.

#### Example Response:
##### 200:
```json
{
  "status": "success",
  "data": [
    {
      "location": [
        123,
        456
      ],
      "_id": "5e6ac445c83ef0036b83397e",
      "name": "Rec Center",
      "type": "Sport Club",
      "__v": 0
    },
    {
      "location": [
        123,
        456
      ],
      "_id": "5e6ac4951ebe9f03dc372e39",
      "name": "Maharishi International University",
      "type": "School",
      "__v": 0
    }
  ]
}
```
##### 500:
```json
{
  "message": "MongoError: E11000 duplicate key error collection: ..."
}
```

### GET /facilities/:id
Returns one facility on success.

#### Example Response:
##### 200:
```json
{
  "status": "success",
  "data": {
    "location": [
      114.31417478237083,
      30.608928717386274
    ],
    "_id": "5e71a25d21d3345f6cf11e87",
    "name": "Wuhan",
    "type": "City",
    "__v": 0
  }
}
```
##### 404:
```json
{
  "status": "failed", 
  "message": "Facility not found." 
}
```
##### 500:
```json
{
  "message": "MongoError: E11000 duplicate key error collection: ..."
}
```

### POST /facilities
Inserts a new facility on success.
**Authorization Required**

#### Request Body:
```json
{
     {
      "location": [
        1234,
        5678
      ],
      "name": "Waterworks Park",
      "type": "Park",
    }
}
```
#### Example Response:
##### 201:
```json
{
  "status": "success",
  "message": "Created Successfully!",
  "data": {
    "location": [
      1234,
      5678
    ],
    "_id": "5e7254e6d217d41551d6549d",
    "name": "Waterworks Park",
    "type": "Park",
    "__v": 0
  }
}
```
##### 500:
```json
{
  "message": "MongoError: E11000 duplicate key error collection: ..."
}
```

### PATCH /facilities/:id
Updates an already existing facility.
**Authorization Required**

#### Request Body:
```json
{
     {
      "location": [
        -91.96868369731011,
        41.016623596247186
      ],
      "name": "Hildenbrand Hall",
      "type": "Dorm"
    }
}
```
#### Example Response:
##### 202:
```json
{
  "status": "success",
  "message": "Updated Successfully!",
  "data": {
    "location": [
      -91.96868369731011,
      41.016623596247186
    ],
    "_id": "5e6ba22cd1f2e2101ee32b0a",
    "name": "Hildenbrand Hall",
    "type": "Dorm",
    "__v": 0
  }
}
```
##### 500:
```json
{
  "message": "MongoError: E11000 duplicate key error collection: ..."
}
```

### DELETE /facilities/:id
Deletes one facility.
**Authorization Required**

#### Example Response:
##### 202:
```json
{
  "status": "success",
  "message": "Deleted Successfully!"
}
```
##### 500:
```json
{
  "message": "MongoError: E11000 duplicate key error collection: ..."
}
```


## Inspection

### GET /inspections
Returns an array of inspections on success.

#### Example Response:
##### 200:
```json
{
  "status": "success",
  "data": [
    {
      "_id": "5e721d7b94f4c9471f2991b8",
      "facility": {
        "location": [
          -91.96805106481898,
          41.01738453245722
        ],
        "_id": "5e70d7e97c820a4dcb354058",
        "name": "Middle of the Road",
        "type": "Road",
        "__v": 0
      },
      "type": "Health",
      "report": "Be careful, it is dangerous to stand here.",
      "rating": 5,
      "inspector": {
        "groups": [
          "Administrator",
          "User"
        ],
        "_id": "5e6f4236a6120f51cd5a2e64",
        "name": "Edgar Endo",
        "username": "endoedgar",
        "email": "endoedgarjunior@gmail.com",
        "__v": 0,
        "bio": "This is a bio. I can type whatever I want here."
      },
      "__v": 0
    },
    {
      "_id": "5e7250aff149ea67f782d3a5",
      "type": "Report",
      "rating": 5,
      "report": "This is Wuhan",
      "facility": {
        "location": [
          114.31417478237083,
          30.608928717386274
        ],
        "_id": "5e71a25d21d3345f6cf11e87",
        "name": "Wuhan",
        "type": "City",
        "__v": 0
      },
      "inspector": {
        "groups": [
          "Administrator",
          "User"
        ],
        "_id": "5e6f4236a6120f51cd5a2e64",
        "name": "Edgar Endo",
        "username": "endoedgar",
        "email": "endoedgarjunior@gmail.com",
        "__v": 0,
        "bio": "This is a bio. I can type whatever I want here."
      },
      "__v": 0
    }
  ]
}
```
##### 500:
```json
{
  "message": "MongoError: E11000 duplicate key error collection: ..."
}
```

### GET /inspection/:id
Returns one inspection on success.

#### Example Response:
##### 200:
```json
{
  "status": "success",
  "data": {
    "_id": "5e721d7b94f4c9471f2991b8",
    "facility": "5e70d7e97c820a4dcb354058",
    "type": "Health",
    "report": "Be careful, it is dangerous to stand here.",
    "rating": 5,
    "inspector": "5e6f4236a6120f51cd5a2e64",
    "__v": 0
  }
}
```
##### 404:
```json
{
  "status": "failed",
  "message": "Inspection not found."
}
```
##### 500:
```json
{
  "message": "MongoError: E11000 duplicate key error collection: ..."
}
```

### GET /facility/:id
Returns an array of inspections of a ceratin facility.

#### Example Response:
##### 200:
```json
{
  "status": "success",
  "data": [
    {
      "_id": "5e721d7b94f4c9471f2991b8",
      "facility": {
        "location": [
          -91.96805106481898,
          41.01738453245722
        ],
        "_id": "5e70d7e97c820a4dcb354058",
        "name": "Middle of the Road",
        "type": "Road",
        "__v": 0
      },
      "type": "Health",
      "report": "Be careful, it is dangerous to stand here.",
      "rating": 5,
      "inspector": {
        "groups": [
          "Administrator",
          "User"
        ],
        "_id": "5e6f4236a6120f51cd5a2e64",
        "name": "Edgar Endo",
        "username": "endoedgar",
        "email": "endoedgarjunior@gmail.com",
        "__v": 0,
        "bio": "This is a bio. I can type whatever I want here."
      },
      "__v": 0
    }
  ]
}
```
##### 404:
```json
{
  "status": "failed",
  "message": "Inspections not found."
}
```
##### 500:
```json
{
  "message": "MongoError: E11000 duplicate key error collection: ..."
}
```

### POST /inspections
Inserts a new inspection on success.
**Authorization Required**

#### Request Body:
```json
{
    "facility_id": "5e6ac55b61295e04f44774c3",
    "inspector_id": "5e6f9ed7577f735bcf0e5b88",
    "type": "Health",
    "report": "Peter has Corona", 
    "rating": "0.5"
}
```
#### Example Response:
##### 201:
```json
{
  "status": "success",
  "message": "Created Successfully!",
  "data": {
    "_id": "5e721d7b94f4c9471f2991b8",
    "facility": "5e70d7e97c820a4dcb354058",
    "type": "Health",
    "report": "Be careful, it is dangerous to stand here.",
    "rating": 5,
    "inspector": "5e6f4236a6120f51cd5a2e64",
    "__v": 0
}
```
##### 400:
```json
{
  "status": "failed",
  "message": "Data is Not Valid. Bad Request, My Dear!"
}
```
##### 500:
```json
{
  "message": "MongoError: E11000 duplicate key error collection: ..."
}
```

### PATCH /inspections/:id
Updates an already existing inspection.
**Authorization Required**

#### Request Body:
```json
{
    "facility_id": "5e6ac55b61295e04f44774c3",
    "inspector_id": "5e6f9ed7577f735bcf0e5b88",
    "type": "Infrastructure",
    "report": "Restroom smells bad", 
    "rating": "3.5"
}
```
#### Example Response:
##### 202:
```json
{
  "status": "success",
  "message": "Updated Successfully!",
  "data": {
    "_id": "5e721d7b94f4c9471f2991b8",
    "facility": "5e70d7e97c820a4dcb354058",
    "type": "Health",
    "report": "Be careful, it is dangerous to stand here.",
    "rating": 5,
    "inspector": "5e6f4236a6120f51cd5a2e64",
    "__v": 0
}
```
##### 500:
```json
{
  "message": "MongoError: E11000 duplicate key error collection: ..."
}
```

### DELETE /inspections/:id
Deletes one inspection.
**Authorization Required**

#### Example Response:
##### 202:
```json
{
  "status": "success",
  "message": "Deleted Successfully!"
}
```
##### 500:
```json
{
  "message": "MongoError: E11000 duplicate key error collection: ..."
}
```
