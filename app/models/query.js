var mongoose = require('mongoose');

var Schema = mongoose.Schema;
//File upload yet to be added
var querySchema = new Schema({
    userId: { type: String, required: true, default: "" },
    name: { type: String, required: true, default: "" },
    email: { type: String, required: true, default: "" },
    mobileNumber: { type: Number, required: true },
    querySubject: { type: String, required: true, default: "" },
    queryContent: { type: String, required: true, default: "" },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    ticketStatus: { type: String, default: 'Open' },
    fileName:{type:String,default:''},
    comment: [{
        userName: String,
        queryText: String,
        createdAt: { type: Date, default: Date.now() }
    }]
});

mongoose.model('Query', querySchema);