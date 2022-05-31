const Facture = require('../models/facture.models.js')
const router = require("express").Router();
const body = require("body-parser");
router.use(body.json());
const Livraison = require('../models/Livraison.models.js')

exports.creer = async (req, res) => {
    try {
        var facture = Facture(req.body);
        var result = await facture.save();
        res.send(result);
        console.log(result);
    } catch (error) {
        res.status(500).send(error);
    }
};
exports.afficherTout = async (req, res) => {
    try {
        var result = await Facture.find().populate('livraison');
        res.send(result);
    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.afficherUn = async (req, res) => {
    try {
        var n = await Facture.findById(req.params.facId).populate('livraison').exec();
        var result = await n.save();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
};
exports.modifier = async (req, res) => {
    try {
        var n = await Facture.findById({ _id: req.params.facId }).exec();
        n.desFacture = req.body.desFacture || "desFacture ";
        n.dateFact = req.body.dateFact || "dateFact";
        n.dateArivage = req.body.dateArivage || "dateArivage";
        n.prixFac = req.body.prixFac || "prixFac";
        n.NomberDeColis = req.body.NomberDeColis || "NomberDeColis";
        n.livraison = req.body.livraison || "Updated livraision";
        var result = await n.save();
        res.send(result);
    }
    catch (error) {
        res.status(400).send("unable to update the database");
    }
};
exports.supprimer = async (req, res) => {
    try {
        var result = await Facture.deleteOne({ _id: req.params.facId }).exec();
        res.send(result);
        console.log(result);
    } catch (error) {
        res.status(500).send(error);
    }
};