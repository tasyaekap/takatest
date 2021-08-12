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

1. clone this repo 
```html
git clone https://github.com/tasyaekap/takatest.git
```

2. Install All the dependencies
```html
npm install
```

3. set database configuration on config/config.json & config/db.js

4. migrate the migration
```html
sequelize db:migrate
```

5. type on terminal to turn on redis server
```html
redis-server
```

6. Run on terminal
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

#### Params
```html
{"username": username, "password":password}
```


### Login

to sign in into the system 

#### Method: Post
```html
http://localhost:8888/login
```

#### Params
```html
{"username": username, "password":password}
```

#### Response
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

#### Params
```html
{
    "productName": productName,
    "productPrice": productPrice,
    "productStock": productStock
}
```

#### Response
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

#### Params
```html
{   
    "productName": productName,
    "qty": qty
}
```

#### Response
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

#### Response
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

#### Response
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

#### Params
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

#### Response
```html
{
    "totalAmountTransaction": totalAmmountTransaction,
    "totalPoints": totalPoints,
    "totalItems": totalItems
}
```