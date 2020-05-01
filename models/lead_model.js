// Importing the library.
const mongoose = require('mongoose');

// getting Schema class.
const Schema = mongoose.Schema;

// Defining our Schema.
const leadSchema = new Schema({
    lead_id         : { type: Number, required: true, unique: true },
    first_name      : { type: String, required: true },
    last_name       : { type: String },
    mobile          : { type: Number, required: true, unique: true, minlength:10, maxlength:10 },
    email           : { type: String, required: true, unique: true },
    location_type   : { type: String, enum: ['Country', 'City', 'Zip'] },
    location_string : { type: String },
    status          : { type: String, enum: ['Created', 'Contacted'] },
    communication   : { type: String }
    }, 
    { timestamps: true }
);

// Setting up our model.
const leadModel  = mongoose.model('leads', leadSchema);

// Exporting module.
module.exports = leadModel;
