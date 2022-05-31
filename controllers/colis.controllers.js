const Colis =require('../models/colis.models.js')
const router=require("express").Router() ;
const body=require("body-parser") ;

exports.createColis = async (req, res) => {
                const newColis = new Colis(req.body)
              try {
                 await newColis.save();
         
                 res.status(201).json(newColis );
             } catch (error) {
                 res.status(409).json({ message: error.message });
             }
};
exports.modifier = async (req, res) => {
    const {typeColis, DesColis, poidsColis} = req.body;
    console.log('================');
    console.log(req.params.colisId);
    console.log('---------------');
    console.log(req.body);
        try {
            var colis = await Colis.findById(req.params.colisId)
            if (!colis) return res.status(400).json({ message: 'Colis not found!' })
            await Colis.findByIdAndUpdate({ _id: req.params.colisId }, { $set: { typeColis, DesColis, poidsColis} });
            return res.status(200).json({ message: "colis  modifier !" })
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    
    };


