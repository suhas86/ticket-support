var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    email: { type: String, default: '', required: true, unique: true },
    mobileNumber: { type: Number, default: '' },
    password: { type: String, default: '' },
    userType: { type: Number, default: 2 }
})

mongoose.model('User',userSchema);