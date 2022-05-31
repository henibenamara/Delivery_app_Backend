const multer=require ('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        
        cb(null,'images');
    },
    filename: (req, file, cb) => {
       const fileName = file.originalname.toLowerCase().split(' ').join('-');
       cb(null, fileName)
       
    }
});
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        console.log("type image : ",file.mimetype)
            cb(null, true);
     
    }
  
});


module.exports = (app) => {
    const livreur= require('../controllers/livreur.controllers.js');
    app.get('/livreur',livreur.afficherTout);
    app.get('/livreur/:livreurId',livreur.afficherUn);
    app.put('/livreur/:livreurId',livreur.modifier);
    app.put('/livreur/image/:livreurId',upload.single('image'),livreur.update);
    app.put('/livreur/permis/:livcin',upload.single('livpermie'),livreur.permis);
    app.put('/livreur/cartegrise/:livcin',upload.single('livcarteGrise'),livreur.cartegrise);
    app.put('/livreur/verification/:livreurId',livreur.verifier);
    app.delete('/livreur/:livreurId',livreur.supprimer);
    app.get('/livreur/user/:userId',livreur.getlivreurByuserId);
    app.get('/livreur/nobreliv/count',livreur.getCount);

} 