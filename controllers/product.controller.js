const Product = require('../models/product.model');

exports.findAll = async (req, res) => {
    try{
        let products = await Product.findAll();
        res.status(200).json({data: products})
    }catch(error){
        throw error;
    }
}

exports.findById = async (req, res) => {
    try{
        let id = req.params.id;
        let product = await Product.findByPk(id);
        if(product){
            res.status(200).json({data: product});
        }else{
            res.status(404).json({message: 'Product not found.'})
        }
    }catch(error){
        throw error;
    }
}

exports.save = async (req, res) => {
    try{
        let product = req.body;
        await Product.create(product);
        res.status(201).json({message: 'Saved product.'});
    }catch(error){
        throw error;
    }
}

exports.update = async (req, res) => {
    try{
        let id = req.params.id;
        let updateProduct = req.body;
        let product = await Product.update(updateProduct, {where: {id: id}});
        if(product.length > 0){
            res.status(200).json({message: 'Updated product.'});
        }else{
            res.status(404).json({message: 'Product not found.'});
        }
    }catch(error){
        throw error;
    }
}

exports.delete = async (req, res) => {
    try{
        let id = req.params.id;
        let product = await Product.destroy({where: {id: id}});
        if(product === 1){
            res.status(200).json({message: 'Deleted product.'});
        }else{
            res.status(404).json({message: 'Product not found.'});
        }
    }catch(error){
        throw error;
    }
}