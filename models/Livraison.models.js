const mongoose = require('mongoose');
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = mm + '/' + dd + '/' + yyyy;
const livraisonSchema = mongoose.Schema({
    //Définir les champs
    numLivraison: Number,
    AdressseDes: String,
    AdresseExp: String,
    DateDeLivraison: String,
    etatLivraison: String,
    imageUrl: String,
    prix :String,
    verification:String,
    DateDeCreation:String,
    


    colisId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'colis'
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    livreur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },


},
);
module.exports = mongoose.model('livraison', livraisonSchema);