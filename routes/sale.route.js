const express = require("express");
const sale = require("../controllers/sale.controller");

const router = express();

router.get("/", sale.findAll);

router.get("/:id", sale.findById);

router.post("/", sale.save);

router.put("/:id/detail", sale.updateDetail);

router.delete("/:id", sale.deleteSale);

router.delete("/:saleId/detail/:detailId", sale.deleteDetail);

module.exports = router;
