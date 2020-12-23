const express = require("express");
const sale = require("../controllers/sale.controller");
const Sale = require("../models/sale.model");
const Detail = require("../models/detail.model");
const Product = require("../models/product.model");

const router = express();

router.get("/", sale.findAll);

router.get("/:id", sale.findById);

router.post("/", sale.save);

router.put("/:id/detail", sale.updateDetail);

router.delete("/:id", sale.deleteSale);

router.delete("/:saleId/detail/:detailId", sale.deleteDetail);

module.exports = router;
