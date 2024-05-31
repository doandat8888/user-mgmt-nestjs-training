# USER_MGMT APPLICATION

### FEATURES

- Insert User
- Update User
- Delete User
- Search User

### Insert User - Method POST

```
localhost:8000/users/create

body: {
    username: "anle",
    fullname: "Le Dang Hoang An",
    role: "Developer",
    projects: ["D&D", "Tiger"],
    activeYn: "Y",
}

```

### Update User - Method PATCH

```
localhost:8000/users/update/:username

param: username

body: {
    username: "anle",
    fullname: "Le Dang Hoang An",
    role 'Teacher',
    projects: ['D&D', 'Tiger'],
    activeYn: 'Y',
}

```

### Delete User - Method DELETE

```
localhost:8000/users/delete/:username
```

### Search Users - Method GET

```
localhost:8000/users/search

query: {
    username,
    fullname,
    role,
    projects,
    activeYn
}

```