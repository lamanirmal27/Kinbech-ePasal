const mongoose = require('mongoose');

const breadcrumbSchema = new mongoose.Schema({
  id: Number,
  name: String,
  href: String
});

const imageSchema = new mongoose.Schema({
  src: String,
  alt: String
});

const colorSchema = new mongoose.Schema({
  name: String,
  class: String,
  selectedClass: String
});

const sizeSchema = new mongoose.Schema({
  name: String,
  inStock: Boolean
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  quantity: { type: Number, required: true },
  id: { type: Number, unique: true, required: true },
  rating: { type: Number, required: true },
  href: String,
  category: String,
  breadcrumbs: [breadcrumbSchema],
  images: [imageSchema],
  colors: [colorSchema],
  sizes: [sizeSchema],
  description: String,
  highlights: [String],
  details: String
});

// Create a model from the schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
