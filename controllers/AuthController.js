const db = require("../models");
const config = require("../config/auth");
const User = db.user;
const redis = require('redis');

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.regist = async function(req, res){
    User.findOne({
        where: {
          username: req.body.username
        }
      }).then(user => {
        if (user) {
          res.status(400).send({
            message: "Failed! Username is already in use!"
          });
          return;
        } else {
            // Our register logic starts here
            try{
                var user = User.create({
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, 8)
                })

                res.status(200).send(user)
            } catch (err){
                res.status(500).send({ message: err.message });
            }
        }
      })
     
}


exports.signin = (req, res) => {
  const redisPort = 6379
  const client = redis.createClient(redisPort);
          client.del('userStat' + req.body.username, function(err, reply) {
            console.log(reply); // 1
          });
    User.findOne({
      where: {
        username: req.body.username
      }
    })
      .then(user => {
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
  
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
  
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }

        
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      client.hmset('userStat', {
        'username': user.username,
        'userid': user.id,
        'cartNumb': 0
      }); //setting redis key 'userstat'



      res.status(200).send({
        id: user.id,
        username: user.username,
        accessToken: token
    });
        
}).catch(err => {
    res.status(500).send({ message: err.message });
  });
}