
# Hello! 👋


  
# Food Hero

An android application for waste food management. 


## API Reference

#### Restaurants

```http
  GET /restaurants/
```
```
{
    "success": true,
    "massae": "Data found",
    "data": [
        {
            "imgurl": "dfsdgsghdfgr_profile_pic_anders-jilden-GjwsHRIcQjU-unsplash.jpg",
            "_id": "6144a1e47100e91790771e94",
            "name": "hotem surya ",
            "mobile": "728416626",
            "email": "surya@gmail.com",
            "password": "$2b$10$vpCP7CIhUxNyWYe.PPJhcuFOZXoqWEcyV6NyBhW0Zf8EvpNrR4h5u",
            "openingtime": "2:30",
            "state": "gujarat",
            "district": "baroda",
            "address": "station road baroda",
            "devicetoken": "gdfgfgsefesfe",
            "authid": "dfsdgsghdfgr",
            "joindate": "2021-09-17T14:10:44.328Z",
            "__v": 0
        },
        {
            "imgurl": "dfsdgsghdfgrw_profile_pic_anders-jilden-GjwsHRIcQjU-unsplash.jpg",
            "_id": "6144a29e7100e91790771e99",
            "name": "LVP",
            "mobile": "72841664565",
            "email": "lvp@gmail.com",
            "password": "$2b$10$E/C5kWGc3Vmdz02Bk00RTeP58W1asPxCHKhhaujl8143y89Y9AZBi",
            "openingtime": "2:30",
            "state": "gujarat",
            "district": "baroda",
            "address": "lvp road baroda",
            "devicetoken": "gdfgfgsefesfee",
            "authid": "dfsdgsghdfgrw",
            "joindate": "2021-09-17T14:13:50.172Z",
            "__v": 0
        }
    ]
}
```

```http
  GET /restaurants/id
```

| Parameter | Type     |
| :-------- | :------- | 
| `id` | `string` | 

```
{
    "success": true,
    "massae": "Data found",
    "data": {
        "imgurl": "dfsdgsghdfgr_profile_pic_anders-jilden-GjwsHRIcQjU-unsplash.jpg",
        "_id": "6144a1e47100e91790771e94",
        "name": "hotem surya ",
        "mobile": "728416626",
        "email": "surya@gmail.com",
        "password": "$2b$10$vpCP7CIhUxNyWYe.PPJhcuFOZXoqWEcyV6NyBhW0Zf8EvpNrR4h5u",
        "openingtime": "2:30",
        "state": "gujarat",
        "district": "baroda",
        "address": "station road baroda",
        "devicetoken": "gdfgfgsefesfe",
        "authid": "dfsdgsghdfgr",
        "joindate": "2021-09-17T14:10:44.328Z",
        "__v": 0
    }
}
```

#### Post item

```http
  POST /restaurants/add
```

| Parameter | Type     | 
| :-------- | :------- | 
| `name`      | `string` | 
| `mobile`      | `string` | 
| `email`      | `string` | 
| `password`      | `string` | 
| `opening_time`      | `string` | 
| `close_time`      | `string` | 
| `state`      | `string` | 
| `district`      | `string` | 
| `address`      | `string` | 
| `device-token`      | `string` | 
| `auth_id`      | `string` | 
| `join_date`      | `Date` | 


```
{
    "success": true,
    "massage": "Successfully Added",
    "data": {
        "imgurl": "dfsdgsghdfgr_profile_pic_anders-jilden-GjwsHRIcQjU-unsplash.jpg",
        "_id": "6144a1e47100e91790771e94",
        "name": "hotem surya ",
        "mobile": "728416626",
        "email": "surya@gmail.com",
        "password": "$2b$10$vpCP7CIhUxNyWYe.PPJhcuFOZXoqWEcyV6NyBhW0Zf8EvpNrR4h5u",
        "openingtime": "2:30",
        "state": "gujarat",
        "district": "baroda",
        "address": "station road baroda",
        "devicetoken": "gdfgfgsefesfe",
        "authid": "dfsdgsghdfgr",
        "joindate": "2021-09-17T14:10:44.328Z",
        "__v": 0
    }
}
```


## Authors

- [@hitenkhuman](https://www.github.com/Hitenkhuman)

  


  
