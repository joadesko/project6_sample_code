//Importation du package jsonwebtoken
const User = require ('../models/user');
//Importation de la fonction bcrypt pour création du hash
const bcrypt = require ('bcrypt');
//Importation du package jsonwebtoken pour la création du token
const jwt = require('jsonwebtoken');
//importation du fichier de config
const config =  require('../config.js');

//Création d'un nouveau compte utilisateur
exports.signup = (req, res, next) => {
    //création et sale du mot de passe en 10 tours
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
          //Création d'un nouveau user
        const user = new User({
          //email saisie et récupérer
          email: req.body.email,
          //password saisi et récupérer
          password: hash
        });
        //sauvegarder le user dans mongoDB
        user.save()
            //renvoi promise pour front end
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            //renvoie erreur authentification
          .catch(error => res.status(400).json({ error }));
      })
      //retour erreur serveur
      .catch(error => res.status(500).json({ error }));
};

//Connexion de l'utilisateur
exports.login = (req, res, next) => {
  //Chercher si l'email saisie correspond à un email existant
  User.findOne({ email: req.body.email })
    .then(user => {
    if (!user) {
      //Si email non trouvé retour erreur status
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
    }
    //Si email trouvé bcrypt va comparer les 2 hash password, le hash saisie et le hash enregistrer dans mongoDB
    bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          //Si les 2 hash ne correspondent pas retour erreur status
        if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
        }
        //Si les 2 hash correspondent retour status correct
        res.status(200).json({
            //userId est défini
            userId: user._id,
            //token est défini par jwt
            token: jwt.sign(
            { userId: user._id },
            `${config.JWT_TOKEN_SECRET}`,
            { expiresIn: '24h' }
            )
        });
        })
        //retour erreur serveur
        .catch(error => res.status(500).json({ error }));
    })
    //retour erreur serveur
    .catch(error => res.status(500).json({ error }));
};