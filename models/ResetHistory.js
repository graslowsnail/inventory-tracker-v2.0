const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const Part = require('../models/Part.js');

const resetHistorySchema = new mongoose.Schema({
  resetDate: {
    type: Date,
    default:Date.now,
    required: true
  },
  usedParts: [{
        partId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Part',
            required: true
        },
        name: String,
        barCodeId: String,
        initialStock: Number,
        currentStockBeforeReset: Number,
        boxQuantity: Number,
    }]
});
module.exports = mongoose.models.ResetHistory || mongoose.model('ResetHistory', resetHistorySchema);

