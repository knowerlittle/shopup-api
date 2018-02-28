const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  profileViews: {
    type: Number,
    default: 0,
  },
  published: {
    type: Boolean,
    default: false,
  },
  stripeId: {
    type: String,
  },
  socialLinks: {
    type: Object,
  },
  users: {
    type: Object,
    required: true,
  },
  categories: {
    type: Array,
    required: true,
  },
  demographics: {
    type: Array,
    required: true,
  },
  cities: {
    type: Array,
    required: true,
  },
  products: {
    type: Array,
  },
  bookings: {
    type: Array,
  },
  chatrooms: {
    type: Array,
  },
  cards: {
    type: Array,
  },
  reviews: {
    type: Array,
  },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Brand', brandSchema);