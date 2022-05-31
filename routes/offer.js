module.exports = (app) => {
    const offer= require('../controllers/offer.controller.js');
    app.post('/offer',offer.creer); 
    app.get('/offer',offer.afficherTout);
    app.get('/offer/livreur/:livreur',offer.getOfferByIdLivreur);
    app.get('/offer/livraison/:livraison',offer.getOfferByIdLivraison);
    
    
} 