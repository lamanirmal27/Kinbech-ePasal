const Product = require("../model/Product");

const getProduct = async (req, res) => {
  const prod = await Product.find();
  if (!prod) res.status(204).json({ message: "No Product found!!" });
  res.json(prod);
};

module.exports = {getProduct};
