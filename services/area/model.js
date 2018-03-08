const mongoose = require('mongoose');

const areaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  amenities: {
    type: Array,
  },
  bookings: {
    type: Array,
  },
  approved: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: Object,
  },
  price: {
    type: Number,
  },
  image: {
    type: String,
  },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Area', areaSchema);