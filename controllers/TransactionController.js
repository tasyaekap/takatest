const transactionService = require('../services/transactionService')

exports.createTrans = async function(res, req){
    try{
        await transactionService.createTrans(req.body)

        res.status(200).send({message: "Data Saved!"})
    } catch(err){
        res.status(500).send({ message: err.message });
    }
}

exports.addToCart = async function(req, res){
    try{
        await transactionService.addToCart(req.body)

        res.status(200).send({message: "Data Saved!"})
    } catch(err){
        res.status(500).send({ message: err.message });
    } 
}


exports.checkOut = async function(req, res){
    try{
        await transactionService.checkOut(req.body)

        res.status(200).send({message: "Data Saved!"})
    } catch(err){
        res.status(500).send({ message: err.message });
    } 
}

exports.paymentConfirm = async function(req, res){
    try{
        await transactionService.paymentConfirm(req.body)

        res.status(200).send({message: "Data Saved!"})
    } catch(err){
        res.status(500).send({ message: err.message });
    } 
}

exports.loyaltyPoint = async function(req, res){
    try{
        await transactionService.loyaltyPoint(req.body, function(response){
            res.status(200).send(response)
        })

        res.status(200).send({message: "Data Saved!"})
    } catch(err){
        res.status(500).send({ message: err.message });
    } 
}