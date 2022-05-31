const mongoose = require('mongoose');
const livreurSchema = mongoose.Schema({
//Définir les champs

nom: {
    type: String,
    required: "nom is required"
},
prenom: {
    type: String,
    required: "prenom is required"
},
userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
},
    livcin:Number,
    livTelephone:Number,
    livpermie:String,
    livcarteGrise:String,
    livAdresse:String,
    livMatVecu:String,
    livMarqVecu:String,
    image: String,

    
},  
);
module.exports = mongoose.model('livreur', livreurSchema);
