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
        console.log("type imageUrl : ",file.mimetype)
            cb(null, true);
     
    }
  
});
module.exports = (app) => {
    const responsable= require('../controllers/responsable.controllers.js');
    app.get('/responsable',responsable.afficherTout);
    app.get('/responsable/:resId',responsable.afficherUn);
    app.get('/admin/user/:userId',responsable.getAdminByuserId);
    app.put('/responsable/image/:resId',upload.single('image'),responsable.update);
    app.put('/responsable/:resId',responsable.modifier);
    app.delete('/responsable/:resId',responsable.supprimer)
    app.get('/stat/',responsable.totalUsers);
} 