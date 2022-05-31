const Livraison = require('../models/Livraison.models.js')
const Colis = require('../models/colis.models')
const Client = require('../models/client.models.js')
const Livreur = require('../models/livreur.models.js')
const router = require("express").Router();
const body = require("body-parser");
router.use(body.json());
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = mm + '/' + dd + '/' + yyyy;
exports.creer = async (req, res) => {

    var data = req.body;
  //  const url = req.protocol + '://' + req.get('host') 

    console.log('----------------------------');
    console.log(data);
    const { typeColis, DesColis, poidsColis, numLivraison, AdressseDes, AdresseExp, DateDeLivraison, livreur: Livreur, client: client, etatLivraison ,prix,verification } = req.body;
    const DateDeCreation =today;
    try {
        const colis = await Colis.create({ typeColis, DesColis, poidsColis })
        await Livraison.create({ typeColis, DesColis, poidsColis, numLivraison, AdressseDes, AdresseExp, DateDeLivraison, colisId: colis._id, livreur: Livreur, client: client, etatLivraison ,prix,verification,DateDeCreation})
        return res.status(201).json({ message: "livraison crée" });
    } catch (erreur) {
        return res.status(500).json({ erreur })
    }
};
exports.update = async(req , res)=>{
    const url = req.get('host') 
  const{imageUrl:imageUrl}= req.body;
  try{
    var livraison = await Livraison.findById(req.params.livraisonId)
   
    await Livraison.findOneAndUpdate({ numLivraison: req.params.numLivraison }, { $set: {imageUrl:req.file.filename } });
    return res.status(200).json({ message: "livraison modifier !" })
  } catch (erreur) {
    return res.status(500).json({ erreur })

}
};
exports.getCountlivreur = async (req, res) => {
    try {
        var count = await  Livraison.countDocuments({'etatLivraison': req.params.etat, 
        'livreur': req.params.id
    }, );
        return res.status(200).json({ count });



    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.afficherTout = async (req, res) => {
    try {
        
        var result = await Livraison.find().populate('client').populate('livreur').populate('colisId');
        return res.status(200).json({ result });
    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.afficherUn = async (req, res) => {
    try {
        var livraison = await Livraison.findById(req.params.livraisonId).populate('client').populate('livreur').populate('colisId').exec();
        return res.status(200).json({ livraison });
    } catch (error) {
        res.status(500).send({ error });
    }
};
exports.modifier = async (req, res) => {
    const { typeColis, DesColis, poidsColis, numLivraison, AdressseDes, AdresseExp, DateDeLivraison,etatLivraison,livreur:Livreur,client:Client,prix } = req.body;

    try {
        var livraison = await Livraison.findById(req.params.livraisonId)
        if (!livraison) return res.status(400).json({ message: 'livraison not found!' })
        await Livraison.findByIdAndUpdate({ _id: req.params.livraisonId }, { $set: { typeColis, DesColis, poidsColis, numLivraison, AdressseDes, AdresseExp, DateDeLivraison ,etatLivraison,livreur:Livreur,client:Client,prix} });
        return res.status(200).json({ message: "livraison modifier !" })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }

};
exports.verifier = async(req, res) => {
    const {verification} = req.body;
    try{
        var livraison = await Livraison.findById(req.params.livraisonId)
       
        await Livraison.findByIdAndUpdate({ _id: req.params.livraisonId }, { $set: {verification } });
        return res.status(200).json({ message: "Livraison modifier !" })
      } catch (erreur) {
        return res.status(500).json({ erreur })
    
    }
};

exports.supprimer = async (req, res) => {
    try {
        var result = await Livraison.deleteOne({
             _id: req.params.livraisonId });
        return res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ error });
    }
};
exports.getlivraisonByIdclient = async (req, res) => {
    try {
        var result = await Livraison.find({ client: req.params.client }).populate('client').populate('livreur').populate('colisId').exec();
        return res.status(200).json({ result });

    } catch (error) {
        res.status(500).send({ error });
    }
};
exports.getlivraisonByIdlivreur = async (req, res) => {
    try {
        var result = await Livraison.find({ livreur: req.params.livreur }).populate('client').populate('livreur').populate('colisId').exec();
        return res.status(200).json({ result });

    } catch (error) {
        res.status(500).send({ error });
    }
};
exports.afficheronebynumlivraision = async (req, res) => {
    try {
        var result = await Livraison.find({numLivraison:req.params.numLivraison}).populate('client').populate('livreur').populate('colisId').exec();
        return res.status(200).json({ result });
    } catch (error) {
        res.status(500).send({ error });
    }
};
exports.getCountclient = async (req, res) => {
    try {
        var result = await  Livraison.countDocuments({'etatLivraison': req.params.etat, 
        'client': req.params.id
    }, );
        return res.status(200).json({ result });



    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.getCountresp = async (req, res) => {
    try {
        var result = await  Livraison.countDocuments({'etatLivraison': req.params.etat} );
        return res.status(200).json({ result });



    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.getCountlivraison = async (req, res) => {
    try {
        var result = await  Livraison.countDocuments();
        return res.status(200).json({ result });



    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.TotalPayCompleteLivreur = async(req, res) => {
    
    var sumLivrée=0 ;
    var sumEncours=0 ;
    var livraisonEncours=0;
    var livraisonLivrée=0;
    
    var result = await Livraison.find({ livreur: req.params.livreur }).populate('client').populate('livreur').populate('colisId').exec();
    for await (const liv of result) {
        if (liv.etatLivraison=="livrée"){
            sumLivrée +=parseInt(liv.prix);
            livraisonLivrée+=1;
      
        }
        if (liv.etatLivraison=="en cours"){
            sumEncours +=parseInt(liv.prix);
            livraisonEncours+=1;
      
        }
    }
    sumLivrée = (sumLivrée*0.9).toFixed(2);

    sumEncours= (sumEncours*0.9).toFixed(2);
    var data ={ sumLivrée,sumEncours,livraisonEncours,livraisonLivrée } ;
    return res.status(200).json({data});
   
}
exports.TotalPayCompleteAdmin = async(req, res) => {
    var sum=0 ;
    var result = await Livraison.find({ etatLivraison: req.params.etatLivraison }).populate('client').populate('livreur').populate('colisId').exec();
    for await (const liv of result) {
        sum +=parseInt(liv.prix);
      
        
    }
    return res.status(200).json({ sum });
}
exports.TotalPayCLient = async(req, res) => {
    
    var sumLivrée=0 ;
    var sumEncours=0 ;
    var livraisonEncours=0;
    var livraisonLivrée=0;
    var livraisonNonLivrée=0;
    
    var result = await Livraison.find({ client: req.params.client }).populate('client').populate('livreur').populate('colisId').exec();
    for await (const liv of result) {
        if (liv.etatLivraison=="livrée"){
            sumLivrée +=parseInt(liv.prix);
            livraisonLivrée+=1;
      
        }
        if (liv.etatLivraison=="en cours"){
            sumEncours +=parseInt(liv.prix);
            livraisonEncours+=1;
      
        }
        if (liv.etatLivraison=="non livrée"){
            livraisonNonLivrée+=1;
      
        }
    }
    var data ={ sumLivrée,sumEncours,livraisonEncours,livraisonLivrée ,livraisonNonLivrée} ;
    return res.status(200).json({data});
   
}