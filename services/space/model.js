const mongoose = require('mongoose');

const spaceSchema = new mongoose.Schema({
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
    type: mongoose.Schema.ObjectId,
    ref: 'User',
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
  video: {
    type: String,
  },
  images: {
    type: Object,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Space', spaceSchema);