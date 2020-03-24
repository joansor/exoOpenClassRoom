const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
// crétation d'un schéma de donnée avec ces différents champs en utilisant la méthode schéma 
 
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
 
});

module.exports = mongoose.model('Product', productSchema); // export du model