const multer=require ('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        
        cb(null,'images');
    },
    filename: (req, file, cb) => {
       const fileName = file.originalname.toLowerCase().split(' ').join('-');
       console.log("name  : ",fileName)
       cb(null, fileName)
       
    }
});
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        console.log("type imageUrl : ",file.mimetype)
            cb(null, true);
     
    }
  
});
module.exports = (app) => {
    
    const livraison= require('../controllers/livraison.controllers.js');
    app.put('/livraison/:livraisonId',livraison.modifier);
    app.post('/livraison',livraison.creer); 
    app.put('/livraison/image/:numLivraison',upload.single('imageUrl'),livraison.update);
    app.get('/livraison',livraison.afficherTout);
    app.put('/livraison/verification/:livraisonId',livraison.verifier);
    app.get('/count/livreur/:etat/:id',livraison.getCountlivreur);
    app.get('/count/client/:etat/:id',livraison.getCountclient);
    app.get('/count/resp/:etat',livraison.getCountresp);
    app.get('/count/nombretotalelivraison',livraison.getCountlivraison);
    app.get('/livraison/:livraisonId',livraison.afficherUn);
    app.get('/livraison/num/:numLivraison',livraison.afficheronebynumlivraision);
    app.delete('/livraison/:livraisonId',livraison.supprimer);
    app.get('/livraison/client/:client',livraison.getlivraisonByIdclient);
    app.get('/livraison/livreur/:livreur',livraison.getlivraisonByIdlivreur);
    app.get('/livraison/sum/:livreur',livraison.TotalPayCompleteLivreur);
    app.get('/livraison/admin/sum/:etatLivraison',livraison.TotalPayCompleteAdmin);
    app.get('/livraison/client/sum/:client',livraison.TotalPayCLient);
    


} 