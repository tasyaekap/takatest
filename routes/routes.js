const controllerAuth = require("../controllers/AuthController");
const { authJwt } = require("../middleware");
const controllerProduct = require("../controllers/ProductController");
const controllerTrans = require("../controllers/TransactionController");

module.exports = app => {
    var router = require("express").Router();

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  router.post("/register", controllerAuth.regist); //regist a user
  router.post("/login", controllerAuth.signin) // signin or login
  router.post("/product", [ authJwt.verifyToken ], controllerProduct.createProduct) //create product
  router.post("/add-to-cart", [ authJwt.verifyToken ], controllerTrans.addToCart)
  router.post("/checkout", [ authJwt.verifyToken ], controllerTrans.checkOut)  
  router.post("/paymentconfirmation", [ authJwt.verifyToken ], controllerTrans.paymentConfirm)  
  router.post("/loyaltyPoint", controllerTrans.loyaltyPoint); //regist a user


  app.use('/api', router);
};