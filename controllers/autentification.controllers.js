var User = require('../models/user.models');
var Responsable = require('../models/responsable.models');
var Livreur = require('../models/livreur.models');
var Client = require('../models/client.models');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

var { ROLE, PASSWRD_REGEX, EMAIL_REGEX } = require("../Config/handler.config")
exports.login = async (req, res) => {
    const { email, password } = req.body;
    //simple validation
    if (!email || !password) {
        return res.status(401).json({ msg: 'Email or password non saisies' })
    }
    if (!EMAIL_REGEX.test(email)) {
        return res.status(401).json({ 'erreur': 'Email non valide' });
    }
    try {
        //vérifier l'existance de l'utilisateur
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ 'erreur': 'utilisateur non existant' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) res.status(401).json({ msg: 'mot de passe incorrect' })
        const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: 3600 });
        if (!token) throw Error('Couldnt sign the token');
        res.status(200).json({
            token,
            user,
        });
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
}
/**
* @route POST api/auth/register
* @desc Register new user
* @access Public
*/
exports.register = async (req, res) => {

    const { nom, prenom, email, password, clientTel, clientAdresse, livcin, livTelephone, livMatVecu, livMarqVecu, livAdresse,image,etatCompte } = req.body;
    //simple validation
    const { role } = req.params
    if (!ROLE.includes(role)) {
        return res.status(400).json({ msg: 'role non valide!' })
    }
    if (!email || !password) {
        return res.status(400).json({ msg: 'Email or password non saisies' })
    }
    if (!EMAIL_REGEX.test(email)) {
        return res.status(400).json({ erreur: 'Email non valide' });
    }
    if (!PASSWRD_REGEX.test(password)) {
        return res.status(400).json({ erreur: 'password non valide' });
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const user = await User.create({ email, password: hash, role,etatCompte })
        switch (role) {
            case "responsable":
                await Responsable.create({ nom, prenom, userId: user._id })

                break;
            case "livreur":
                await Livreur.create({ nom, prenom, userId: user._id, livTelephone, livMarqVecu, livMatVecu, livcin, livAdresse ,image})
                break;
            case "client":
                await Client.create({ nom, prenom, userId: user._id, clientAdresse, clientTel, image })
                break;
            default:
                break;
        }
        return res.status(201).json({ message: "user crée" });
    } catch (erreur) {
        return res.status(500).json({ erreur })
    }
}
