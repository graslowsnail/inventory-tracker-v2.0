const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const Part = require('../models/Part.js');

const usageSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  partsUsed: [{
    partId: {
      type: mongoose.Schema.Types.ObjectId, // refrence to the part model
      ref: 'Part',
      required: true
    },
    count: {
      type: Number,
      required: true,
      default: 1
    }
  }]
});

let Usage;
if (mongoose.models.Usage) {
    Usage = mongoose.model('Usage');
} else {
    Usage = mongoose.model('Usage', usageSchema);
}

export default Usage;
