const productService = require('../services/productService') 

exports.createProduct = async function(req, res){
    try{
        await productService.createProduct(req.body)

        res.status(200).send({message: "Data Saved!"})
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
}

