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
    const client= require('../controllers/client.controllers.js');
    app.get('/client',client.afficherTout);
    app.put('/client/image/:clientId',upload.single('image'),client.update);

    app.get('/client/:clientId',client.afficherUn);
    app.put('/client/:clientId',client.modifier);
    app.delete('/client/:clientId',client.supprimer);
    app.get('/client/user/:userId',client.getclientByuserId);
    app.get('/client/nobreclient/count',client.getCount);

} 