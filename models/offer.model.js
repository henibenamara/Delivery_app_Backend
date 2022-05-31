const mongoose = require('mongoose');
const offerSchema = mongoose.Schema({
    //Définir les champs
    
   
    livreur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'livreur'
    },
    livraison: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'livraison'
    },
    prix: String,

},
);
module.exports = mongoose.model('offer', offerSchema);