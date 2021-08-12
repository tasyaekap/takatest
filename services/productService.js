const md = require("../models");
const product = md.product;
const express = require('express');

exports.createProduct = async function(req){
    try{
        console.log(req)
        await product.create(req)
        
    } catch(err) {
        throw err
    }
}


