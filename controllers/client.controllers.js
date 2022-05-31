const Client = require('../models/client.models')
const User = require('../models/user.models')
const router = require("express").Router();
const body = require("body-parser");
const mongoose = require('mongoose');
router.use(body.json());

exports.afficherTout = async (req, res) => {
    try {
        var result = await Client.find().populate('userId');
        return res.status(200).json({ result });

    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.afficherUn = async (req, res) => {
    try {
        var user = await Client.findById(req.params.clientId).populate('userId');
        return res.status(200).json({ user });
    } catch (error) {
        res.status(500).send({ error });
    }
};
exports.update = async(req , res)=>{
    const url = req.protocol + '://' + req.get('host') 
  const{image:image}= req.body;
  try{
    var client = await Client.findById(req.params.clientId)
   
    await Client.findByIdAndUpdate({ _id: req.params.clientId }, { $set: {image: req.file.filename } });
    return res.status(200).json({ message: "client modifier !" })
  } catch (erreur) {
    return res.status(500).json({ erreur })

}
};
exports.modifier = async (req, res) => {
    const { nom, prenom, clientAdresse, clientTel, email } = req.body

    try {
        var client = await Client.findById(req.params.clientId)
        if (!client) return res.status(400).json({ message: 'client not found!' })
        if (email) {
            const users = await User.find({ _id: { $ne: client.userId }, email: email })
            if (users.length) {
                return res.status(400).json({ message: 'email deja exixte' })
            }
            try {
                await User.findByIdAndUpdate({ _id: client.userId }, { $set: { email } })
            } catch (error) {
            }
        }
        await Client.findByIdAndUpdate({ _id: req.params.clientId }, { $set: { nom, prenom, clientAdresse, clientTel } });
        return res.status(200).json({ message: "client updated!" })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
};
exports.supprimer = async (req, res) => {
    try {
        var result = await Client.deleteOne({ _id: req.params.clientId });
        return res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ error });
    }
};
exports.getclientByuserId = async (req, res) => {
    try {
        var result = await Client.find({ userId: req.params.userId }).populate('userId').exec();
        return res.status(200).json({ result });

    } catch (error) {
        res.status(500).send({ error });
    }
};
exports.getCount = async (req, res) => {
    try {
        var count = await  Client.countDocuments();
        return res.status(200).json({ count });



    }
    catch (error) {
        res.status(500).send(error);
    }
};