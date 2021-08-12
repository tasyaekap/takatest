const md = require("../models");
const trans = md.transaction
const transdetail = md.transactiondetail
const redis = require('redis');
const Sequelize = require('sequelize');
const User = md.user;
const redisPort = 6379
const client = redis.createClient(redisPort);
const product = md.product;


exports.addToCart = async function(req, res){
    try{
    
        client.on('connect', function() {
                    console.log('Connected!');
        });

        product.findOne({
            where: {
                productName: req.productName
            }
          }).then(product => {
            var total = product.productPrice * req.qty
            if (! product) {
              res.status(400).send({
                message: "Product aren't registered yet!"
              });
              return;
            } else {
                client.hgetall('userStat', function(err, reply) {
                    let ord = parseInt(reply.cartNumb) + 1
                    console.log(reply); 
                    client.hmset('userStat', {
                        'username': reply.username,
                        'userid': reply.userid,
                        'cartNumb': ord
                    }); //add a number of cart to redis key "userStat"
                        
                    client.hmset('product' + String(ord), {
                        'productId':product.id,
                        'productName':req.productName,
                        'productPrice':product.productPrice,
                        'productAmmount':req.qty,
                        'totalAmmount':total
                    }); // add one product to a redis cart. 
                });
            }
          })

    } catch(err){
        throw err
    }
}


exports.checkOut = async function(res, req, callback){
    try{

        getCartNumb = function(callback){
            client.hgetall('userStat', function(err, object) {
                callback(object)
            })
        } //get the ammount of the product in the cart in redis key "userStat", 
        

        getDetCart = function(cartNumb, callback){  
            client.hgetall('product' + String(cartNumb), function(err, obj) {
                console.log(obj)
                callback(obj)
            })
            
        } //get all the detail product that have been stored on temporary key

        async function Save(obj){
            var transData = await trans.create({"userId":parseInt(obj.userid)})
            for(var i = 1; i <= obj.cartNumb; i++){
                getDetCart(i, async function(obj){
                    await transdetail.create({"transactionId":transData.id,
                                          "productId":obj.productId,
                                        "productPrice":obj.productPrice,
                                        "productAmmount":obj.productAmmount,
                                        "totalAmmount":obj.totalAmmount})
                })
            } //save all the product involved to the transaction tabel 
                trans.findAll({
                    limit: 1,
                    order: [ [ 'createdAt', 'DESC' ]]
                  }).then(async function(transData){
                    transdetail.findAll({
                        where: { transactionId: transData[0].id }
                      }).then(function(transdet){
                          let total = 0;
                          for(var i = 0; i < transdet.length; i++){
                              total += transdet[i].totalAmmount
                          }
                          trans.update({"transAmm":total}, {
                            where: { id: transData[0].id }
                          }).then(function(trans){
                            client.hmset('userStat', 
                                {"transId": transData[0].id,}
                            ); 
                          })
                        
                          
                      })
            })//get total amount of whole transaction

          } //save header transaction to tabel transaction

         

        getCartNumb(function(object){
          Save(object)
        })

    } catch(err){
        throw err
    }

}


exports.paymentConfirm = async function(){
    client.hgetall('userStat', async function(err, object) {
        var transId = object.transId
        await transdetail.findAll({
            where: { transactionId: transId }
          }).then(function(transd){
            for(var i = 0; i < transd.length; i++){
                product.update({ 
                    "productStock": Sequelize.literal(` productStock - ${transd[i].productAmmount}`) // <---- HERE
                }, 
                { where: { id: transd[i].productId }}
            );
            }
          }) 
        
        var productincart = parseInt(object.cartNumb)

        for(var i = 0; i < productincart; i++){
            client.del('product' + String[i], function(err, reply) {
                console.log(reply); // 1
              });
        } //clean up the redis cart

        client.hmset('userStat', {
            'username': user.username,
            'userid': user.id,
            'cartNumb': 0
          }); //setting redis key 'userstat' back to beginning of the cycle
        
    })
}

exports.loyaltyPoint = async function(req, callback){

    var mo = (new Date()).getMonth() + 1

    var data = req

    var user = await User.findAll({
        where:{
            username: data.user
        }
    })

    let totalTrans = 0;
    let totalItems = 0;
    var products = data.products

    for(var i = 0; i < products.length; i++){
        totalTrans += (products[i].price * products[i].qty)
        totalItems += products[i].qty
    } // sum qty and whole transaction ammount



    let tr = await trans.findAll({
        attributes: ['userId', [Sequelize.fn('sum', Sequelize.col('transAmm')), 'total_amount'],],
        where: {
          createdAt: Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('createdAt')), mo),
          userId: user[0].id
          }
      }); //getting total amount

    

    let totalTransM = parseInt(tr[0].dataValues.total_amount); //total transaksi per month
    let totalPoints;
    switch(true) {
        case (totalTransM <= 1000000):
            totalPoints = (totalTrans / 10000) * 1
          break;
        case (totalTransM < 10000000):
            totalPoints = (totalTrans / 10000) * 1.05
          break;
          case (totalTransM < 20000000):
            totalPoints = (totalTrans / 10000) * 1.1
          break;
          case (totalTransM < 30000000):
            totalPoints = (totalTrans / 10000) * 1.2
          break;
          case (totalTransM < 40000000):
            totalPoints = (totalTrans / 10000) * 1.3
          break;
      } //calculating earned totalPoints bt cases

    var respons = {
        "totalAmountTransaction":totalTrans,
        "totalPoints":totalPoints,
        "totalItems":totalItems,
    }

    callback(respons)

}