const Detail = require('../models/detail.model');
const Sale = require('../models/sale.model');
const Product = require('../models/product.model');

exports.findAll = async (req, res) => {
    try{
        let sales = await Sale.findAll({include: Detail});
        res.status(200).json({data: sales});

    }catch(error){
        throw error;
    } 
}

exports.findById = async (req, res) => {
    try{
        let id = req.params.id;
        let sale = await Sale.findByPk(id, {include: Detail});
        if(sale){
            res.status(200).json({data: sale});
        }else{
            res.status(404).json({message: "Sale not found."});
        }
    }catch(error){
        throw error;
    }
}

exports.save = async (req, res) => {
    try {
      let sale = {
        dateSale: req.body.dateSale,
        total: req.body.Details.reduce((acc, val) => acc + val.amount, 0).toFixed(2),
      };
  
      let newSale = await Sale.create(sale);
  
      let details = req.body.Details;
  
      details.forEach(async (detail) => {
          detail.saleId = newSale.id;
          await Detail.create(detail);
      });
      
      res.status(200).json({message: 'Sale saved.'});
    } catch (error) {
      throw error;
    }
}

exports.updateDetail = async (req, res) => {
    try {
      let id = req.params.id;
      let detailRequest = req.body;
      let sale = await Sale.findOne({ where: { id: id } });
  
      if (sale) {
        let detail = await Detail.findOne({
          where: { id: detailRequest.id, saleId: sale.id },
        });
  
        if (detail) {
          let productId = detailRequest.productId;
          let product = await Product.findByPk(productId);
  
          if (product) {
            detailRequest.unitPrice = product.salePrice;
            detailRequest.amount = product.salePrice * detailRequest.quantity;
            let detailUpdated = await Detail.update(detailRequest, {
              where: { id: detailRequest.id, saleId: sale.id },
            });
            res.status(200).json({ message: "Detail updated." });
          } else {
            res.status(404).json({ message: "Product not found." });
          }
        } else {
          res.status(404).json({ message: "Detail not found." });
        }
      } else {
        res.status(404).json({ message: "Sale not found." });
      }
    } catch (error) {
      throw error;
    }
}

exports.deleteSale = async (req, res) => {
  try{
      let id = req.params.id;
      let sale = await Sale.findByPk(id, {include: Detail});
      if(sale){
          if(sale.Details.length === 0){
              await Sale.destroy({where: {id: id}});
              res.status(200).json({message: "Sale deleted."});
          }else{
              res.status(404).json({message: "Can't delete sales that have details."});
          }
      }else{
          res.status(404).json({message: "Sale not found."});
      }
  }catch(error){
      throw error;
  }
}

exports.deleteDetail = async (req, res) => {
  try{
      let saleId = req.params.saleId;
      let detailId = req.params.detailId;
      
      let sale = await Sale.findByPk(saleId, {include: Detail});

      if(sale){
         let detail = await Detail.findByPk(detailId);
         if(detail){
              await Detail.destroy({where: {id: detailId}});
              res.status(200).json({message: "Deleted detail."});
         }else{
             res.status(404).json({message: "Detail not found."});
         }
      }else{
          res.status(404).json({message: "Sale not found."});
      }
  }catch(error){
      throw error;
  }
}