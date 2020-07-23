const mongoose = require('mongoose');

const Article = new mongoose.Schema({
  products: {
    type: String,
    required: true
  },
  offices: {
    type: String,
    required: true
  },
    people: {
    type: String,
    required: true
  },
},
{
  timestamps: true,
});

mongoose.model('article', Article);
