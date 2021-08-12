# Mini Ecommerce API Service

### Table Of Contents  

- [Description](#description)
- [Library](#used-library)
- [Installation](#installation)
- [Api Documentation](#api-documentation)

## Description

This Project are deployed to fill a requirement of TakaLab Job Vacancies for backend developer on middle level


#### Used Library

- Body Parser
- Nodemon
- ByCript
- Redis
- Sequelize

## Installation

1. Unzip the file

2. set database configuration on config/config.json & config/db.js

3. migrate the migration
```html
sequelize db:migrate
```

4. type on terminal to turn on redis server
```html
redis-server
```

5. Run on terminal
```html
npm start
```

## API Documentation

### Register a user

to regist all user that involved.

#### Method: Post
```html
http://localhost:8888/register
```

#### Input
```html
{"username": username, "password":password}
```


### Login

to sign in into the system 

#### Method: Post
```html
http://localhost:8888/login
```

#### Input
```html
{"username": username, "password":password}
```

#### Output
```html
{
    "id": userid,
    "username": username,
    "accessToken": tokenakses
}
```

### Create Master Product

registering new master product

#### Method: Post
```html
http://localhost:8888/product
```

#### Input
```html
{
    "productName": productName,
    "productPrice": productPrice,
    "productStock": productStock
}
```

#### Output
```html
{
    "message":"Data Saved!"
}
```

### Add To Cart

registering new master product

#### Method: Post
```html
http://localhost:8888/api/add-to-cart
```

#### Input
```html
{   
    "productName": productName,
    "qty": qty
}
```

#### Output
```html
{
    "message":"Data Saved!"
}
```

### Checkout

Checkout all the product in cart (flush all the product in cart in redis to db)

#### Method: Post
```html
http://localhost:8888/api/checkout
```

#### Output
```html
{
    "message":"Data Saved!"
}
```

### Payment Confirmation

performed to reduce all the product stock 

#### Method: Post
```html
http://localhost:8888/api/paymentconfirmation
```

#### Output
```html
{
    "message":"Data Saved!"
}
```

### Customer Loyalty Point

method to calculating customer loyalty point based on total amount of monthly transaction

#### Method: Post
```html
http://localhost:8888/api/loyaltyPoint
```

#### Input
```html
{
        "user": username,
        "products": [  
                        {
                        "name":productName,
                        "price": productPrice,
                        "qty": productQty
                        }, {
                        "name":productName,
                        "price": productPrice,
                        "qty": productQty
                        }]
    }
```

#### Output
```html
{
    "totalAmountTransaction": totalAmmountTransaction,
    "totalPoints": totalPoints,
    "totalItems": totalItems
}
```