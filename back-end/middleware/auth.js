//Importation de jsonwebtoken pour faire vérifier le token envoyé
const jwt = require('jsonwebtoken');
//importation du fichier de config
const config =  require('../config.js');

//le middleware pour vérifier et faire authentifier le token envoyé
module.exports = (req, res, next) => {
  try {
    //On récupère le token du header de la requete du POST et on le split pour récupérer tout l'espace après header
    // [1] <= la position du token dans le header (positionner en 2 mais commence par 0 donc 1)
    const token = req.headers.authorization.split(' ')[1];
    //On créer une constante afin de décodé le token et son contenu
    const decodedToken = jwt.verify(token,  `${config.JWT_TOKEN_SECRET}`);
    //On définie un id du token
    const userId = decodedToken.userId;
    //Si userid de la requete et si en comparant le userid de la requete au userid du token sont différents
    if (req.body.userId && req.body.userId !== userId) {
        //retour throw erreur avec message
      throw 'Invalid user ID';
    } else {
        //si le même, continuer vers le prochain middleware
      next();
    }
  } catch {
      //gérer les exceptions
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};