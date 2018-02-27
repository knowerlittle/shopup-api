const mongoose = require('mongoose');

const demographicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Demographic', demographicSchema);