const mongoose = require('mongoose');
const factureSchema = mongoose.Schema({
//Définir les champs
    desFacture:String,
    dateFact:Date,
    dateArivage:Date,
    prixFac:Number,
    NomberDeColis:Number,
    livraison:{type:mongoose.Schema.Types.ObjectId,
        ref:'livraison'
    },
    
   

});
module.exports = mongoose.model('facture', factureSchema);