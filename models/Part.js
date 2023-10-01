const mongoose = require('mongoose');

const partSchema = new mongoose.Schema({
  name: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    boxQuantity: {
        type: Number,
        required: true
    },
    currentStock: {
        type: Number,
        required: false
    },
    initialStock: {
        type: Number,
        required: false
    },
    barCodeId: {
        type: String,
        required: true
    }
});

let Part;
if (mongoose.models.Part) {
    Part = mongoose.model('Part');
} else {
    Part = mongoose.model('Part', partSchema);
}

export default Part;
