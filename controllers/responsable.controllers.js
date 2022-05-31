const Responsable =require('../models/responsable.models')
const router=require("express").Router() ;
const body=require("body-parser") ;
const User = require('../models/user.models')
const Livraison = require('../models/Livraison.models')

router.use(body.json());


exports.afficherTout = async(req, res) => {
    try{
        var result = await Responsable.find().populate('userId');
        return res.status(200).json({result});

    }
    catch(error) {
        res.status(500).send(error);
    }
};
exports.afficherUn= async (req, res) => {
    try {
        var responsable=await Responsable.findById(req.params.resId).populate('userId');
        return res.status(200).json({responsable});
    } catch (error) {
        res.status(500).send({error});
    }
};
exports.update = async(req , res)=>{
    const url = req.protocol + '://' + req.get('host') 
  const{image:image}= req.body;
  try{
    var responsable = await Responsable.findById(req.params.resId)
   
    await Responsable.findByIdAndUpdate({ _id: req.params.resId }, { $set: {image:url +'/' +req.file.filename } });
    return res.status(200).json({ message: "res modifier !" })
  } catch (erreur) {
    return res.status(500).json({ erreur })

}
};

exports.modifier = async(req, res) => {
    const { nom, prenom ,email,image} = req.body
    try {
        var responsable = await Responsable.findById(req.params.resId)
        if (!responsable) return res.status(400).json({ message: 'responsable not found!' })
        if (email) {
            const users = await User.find({ _id: { $ne: responsable.userId }, email: email })
            if (users.length) {
                return res.status(400).json({ message: 'email deja exixte' })
            }
            try {
                await User.findByIdAndUpdate({ _id: responsable.userId }, { $set: { email } })
            } catch (error) {
            }
        }
        await Responsable.findByIdAndUpdate({ _id: req.params.resId }, { $set: { nom, prenom ,email ,image} });
        return res.status(200).json({ message: "admin updated!" })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
};
exports.supprimer= async (req, res) => {
    try {
        var result=await Responsable.deleteOne({_id: req.params.resId});
        return res.status(200).json({result});
    } catch (error) {
        res.status(500).json({error});
    }
};

exports.getAdminByuserId = async (req, res) => {  
    try {
        var  result = await Responsable.find({ userId: req.params.userId}).populate('userId').exec();
        return res.status(200).json({ result });

    } catch (error) {
        res.status(500).send({ error });
    }
};
exports.totalUsers = async(req, res) => {
    var client=0 ;
    var livreur=0 ;
    var responsable=0 ;
    var money=0;
    var totalLivraison=0;
    var livraisonNonLivree=0;
    var livraisonLivree=0;
    var livraisonEnCours=0;
    var users = await User.find();
    var livraisons = await Livraison.find();
    for await (const adm of users) {
        if(adm.role =="livreur" && adm.etatCompte=="true"){
            livreur+=1;
        }
        if(adm.role =="responsable"){
            responsable+=1;
        }
        if(adm.role =="client"){
            client+=1;
        }  
        
    }
    for await (const liv of livraisons){
        if (liv.prix){
            money+=parseInt(liv.prix) ;
            }
        totalLivraison+=1;
        if (liv.etatLivraison=="non livrée"){
            livraisonNonLivree+=1;
            }
        if (liv.etatLivraison=="en cours"){
            livraisonEnCours+=1; ;
            }
        if (liv.etatLivraison=="livrée"){
            livraisonLivree+=1; ;
            }    
        
    }
    money= money*0.1 ;


    var data ={ client,livreur,responsable ,money,totalLivraison,livraisonNonLivree,livraisonLivree,livraisonEnCours} ;
    return res.status(200).json({data});
   
}