const express = require("express");
const auth = require("../middleWare/auth");

const shopController = require("../controllers/shop");

const router = express.Router();

router.post("/post-product", auth, shopController.postAddProduct);

router.get("/get-selling-products", auth, shopController.getSellingProducts);

router.post("/delete-selling-item", auth, shopController.postSellingDelete);

router.get("/get-all-products", shopController.getAllProducts);

router.get("/buy", shopController.butNow);

router.post("/search", shopController.getSearchReuslts);

router.get("/get-single-product", shopController.getSingleProduct);

router.post("/add-to-cart", auth, shopController.postCart);

router.post("/update-cart", auth, shopController.postUpdateCart);

router.post("/clear-cart", auth, shopController.postDeleteCart);

router.post("/remove-from-cart", auth, shopController.postCartRemoveProduct);

router.get("/get-cart", auth, shopController.getCart);

router.post("/update-item", auth, shopController.updateSellingItem);

module.exports = router;
