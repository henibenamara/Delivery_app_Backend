const mongoose = require('mongoose');
const colisSchema = mongoose.Schema({
//Définir les champs
    typeColis:String,
    DesColis:String,
    poidsColis:Number,
   

    
    
}, 
);
module.exports = mongoose.model('colis', colisSchema);