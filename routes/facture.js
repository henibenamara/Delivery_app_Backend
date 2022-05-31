module.exports = (app) => {
    const facture= require('../controllers/facture.controllers.js');
    app.post('/facture',facture.creer); 
    app.get('/facture',facture.afficherTout);
    app.get('/facture/:facId',facture.afficherUn);
    app.put('/facture/:facId',facture.modifier);
    app.delete('/facture/:facId',facture.supprimer)
} 