const Offer = require('../models/offer.model')
const Livreur = require('../models/livreur.models')
const Livraison = require('../models/Livraison.models')
const router = require("express").Router();
const body = require("body-parser");
const mongoose = require('mongoose');
router.use(body.json());


exports.afficherTout = async (req, res) => {
    try {
        var result = await Offer.find().populate('livreur').populate('livraison');
        return res.status(200).json({ result });

    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.creer = async (req, res) => {

    var data = req.body;

   
    console.log(data);
    const {   livraison: livraison, livreur :livreur  ,prix } = req.body;
    try {
       
        await Offer.create({ livraison: livraison, livreur :livreur ,prix})
        return res.status(201).json({ message: "offer crée" });
    } catch (erreur) {
        return res.status(500).json({ erreur })
    }
};

exports.getOfferByIdLivreur = async (req, res) => {
    try {
        var result = await Offer.find({ livreur: req.params.livreur }).populate('livraison').populate('livreur').exec();
        return res.status(200).json({ result });

    } catch (error) {
        res.status(500).send({ error });
    }
};

exports.getOfferByIdLivraison = async (req, res) => {
    try {
        var result = await Offer.find({ livraison: req.params.livraison }).populate('livraison').populate('livreur').exec();
        return res.status(200).json({ result });

    } catch (error) {
        res.status(500).send({ error });
    }
};