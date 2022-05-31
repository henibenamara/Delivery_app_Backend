const mongoose = require('mongoose');
const clientSchema = mongoose.Schema({
    //Définir les champs
    nom: {
        type: String,
        required: "nom is required"
    },
    prenom: {
        type: String,
        required: "prenom is required"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    clientTel: Number,
    clientAdresse: String,
    image: String,

},
);
module.exports = mongoose.model('client', clientSchema);