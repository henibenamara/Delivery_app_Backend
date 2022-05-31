const mongoose = require("mongoose");
var userSchema = mongoose.Schema({
    
    email: {
        type: String,
        required: "Email is required",
        unique: true
    },
    password: {
        type: String,
        required: "password is required"
    },
    role:{ 
        type:String,
        required: "role is required"

    },
    etatCompte: String
}
);
module.exports = mongoose.model('user', userSchema)