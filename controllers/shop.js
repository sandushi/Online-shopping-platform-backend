const Products = require("../models/products");

exports.postAddProduct = (req, res, next) => {
  const product = new Products({
    title: req.body.title,
    category: req.body.category,
    subCategory: req.body.subCategory,
    condition: req.body.condition,
    description: req.body.description,
    sellingArea: req.body.sellingArea,
    price: req.body.price,
    shippingFee: req.body.shippingFee,
    imageUrls: req.body.files,
    userId: req.user._id,
  });
  product
    .save()
    .then((result) => {
      console.log("created success");
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

exports.getSellingProducts = (req, res, next) => {
  Products.find({ userId: req.user._id })
    .populate("userId", "email")
    .then((products) => {
      res.status(200).send(products);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

exports.postSellingDelete = (req, res, next) => {
  const prodId = req.body.prodId;

  Products.deleteOne({
    _id: prodId,
    userId: req.user._id,
  })
    .then((response) => {
      res.status(200).send("success");
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

exports.getAllProducts = (req, res, next) => {
  var category = req.query.category;
  category = category.charAt(0).toUpperCase() + category.slice(1);
  console.log(category);

  Products.find({ category: category })
    .populate("userId")
    .then((products) => {
      res.status(200).send(products);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
