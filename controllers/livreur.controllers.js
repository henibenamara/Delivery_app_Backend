const Livreur =require('../models/livreur.models')
const User = require('../models/user.models')
const router=require("express").Router() ;
const body=require("body-parser") ;
router.use(body.json());


exports.afficherTout = async(req, res) => {
    try{
        var result = await Livreur.find().populate('userId');
        return res.status(200).json({result});

    }
    catch(error) {
        res.status(500).send(error);
    }
};
exports.afficherUn= async (req, res) => {
    try {
        var livreur=await Livreur.findById(req.params.livreurId).populate('userId');
        return res.status(200).json({livreur});
        
    } catch (error) {
    res.status(500).send({error});
    }
};
exports.update = async(req , res)=>{
    const url = req.protocol + '://' + req.get('host') 
  const{image:image}= req.body;
  try{
    var livreur = await Livreur.findById(req.params.livreurId)
   
    await Livreur.findByIdAndUpdate({ _id: req.params.livreurId }, { $set: {image:req.file.filename } });
    return res.status(200).json({ message: "livreur modifier !" })
  } catch (erreur) {
    return res.status(500).json({ erreur })

}
};
exports.permis = async(req , res)=>{
    const url = req.protocol + '://' + req.get('host') 
  const{image:image}= req.body;
  try{
    var livreur = await Livreur.findById(req.params.livreurId)
   
    await Livreur.findOneAndUpdate({ livcin: req.params.livcin }, { $set: {livpermie:req.file.filename } });
    return res.status(200).json({ message: "photo permis ajouter !" })
  } catch (erreur) {
    return res.status(500).json({ erreur })

}
};
exports.cartegrise = async(req , res)=>{
    const url = req.protocol + '://' + req.get('host') 
  const{image:image}= req.body;
  try{
    var livreur = await Livreur.findById(req.params.livreurId)
   
    await Livreur.findOneAndUpdate({ livcin: req.params.livcin }, { $set: {livcarteGrise:req.file.filename } });
    return res.status(200).json({ message: "photo carte grise ajouter!" })
  } catch (erreur) {
    return res.status(500).json({ erreur })

}
};

exports.modifier = async(req, res) => {
    const { nom, prenom,livMarqVecu,livMatVecu,livTelephone,livcin,email,livAdresse } = req.body
    try {
        var livreur = await Livreur.findById(req.params.livreurId)
        if (!livreur) return res.status(400).json({ message: 'livreur not found!' })
        if (email) {
            const users = await User.find({ _id: { $ne: livreur.userId }, email: email })
            if (users.length) {
                return res.status(400).json({ message: 'email deja exixte' })
            }
            try {
                await User.findByIdAndUpdate({ _id: livreur.userId }, { $set: { email } })
            } catch (error) {
            }
        }
        await Livreur.findByIdAndUpdate({ _id: req.params.livreurId }, { $set: { nom, prenom,livMarqVecu,livMatVecu,livTelephone,livcin,livAdresse  } });
        return res.status(200).json({ message: "Livreur updated!" })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
};
/** verification compte **/ 
exports.verifier = async(req, res) => {
    const { etatCompte } = req.body;
    try{
       
        await User.findByIdAndUpdate({ _id: req.params.livreurId }, { $set: {etatCompte } });
        return res.status(200).json({ message: "livreur modifier !" })
      } catch (erreur) {
        return res.status(500).json({ erreur })
    
    }
};

exports.supprimer= async (req, res) => {
    try {
        var result=await Livreur.deleteOne({
            _id: req.params.livreurId});
        return res.status(200).json({result});
    } catch (error) {
        res.status(500).json({error});
    }
};
exports.getlivreurByuserId = async (req, res) => {  
    try {
        var  result = await Livreur.find({ userId: req.params.userId}).populate('userId').exec();
        return res.status(200).json({ result });

    } catch (error) {
        res.status(500).send({ error });
    }
};
exports.getCount = async (req, res) => {
    try {
        var count = await  Livreur.countDocuments();
        return res.status(200).json({ count });



    }
    catch (error) {
        res.status(500).send(error);
    }
};