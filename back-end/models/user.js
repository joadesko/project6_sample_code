//Importation de mongoose pour pouvoir communiquer avec mongoDB
const mongoose = require('mongoose');
//Utiliser la méthode de mongoose "mongoose-unique-validator" permettant de définir un mail user unique
const uniqueValidator = require('mongoose-unique-validator');
//model de l'autothentification du user avec mail et mot de passe
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
//Utiliser la fonction plugin avec le model et en paramètre la variable uniqueValidator (application de la méthode mail unique user)
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);