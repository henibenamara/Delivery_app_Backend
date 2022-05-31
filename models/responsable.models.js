const mongoose = require('mongoose');
const RespSchema = mongoose.Schema({
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
    image: String,


}
);
module.exports = mongoose.model('responsable', RespSchema);