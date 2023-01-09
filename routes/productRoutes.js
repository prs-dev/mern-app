const express = require("express");
const router = express.Router();
// const mid = require('../middlewares/mid')
const {
  getProducts,
  // getProductById,
} = require("../controller/productControllers");

router.get("/", getProducts);
// router.post("/:id", getProductById);

module.exports = router;
