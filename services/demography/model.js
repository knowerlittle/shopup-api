const mongoose = require('mongoose');

const demographySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Demographic', demographySchema);