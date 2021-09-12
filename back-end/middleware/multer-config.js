//Importation de la fonction multer
const multer = require('multer');

//Configuration des extensions des fichiers
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

//Création d'un fichier externe et dans quel dossier l'enregistrer
//Constante storage avec comme argument multer et la fonction diskStorage
const storage = multer.diskStorage({
    //destination indique à multer d'enregistrer le fichier dans le dossier images
    destination: (req, file, callback) => {
    //appeler le callback : null pour indiquer qu'il n'y a pas d'erreur, dans le dossier images
    callback(null, 'images');
  },
  //la fonction filename indique à multer de modifier le nom du fichier d'origine
  filename: (req, file, callback) => {
    //constante pour le nom du fichier orginal. 
    //.split pour récupérer les espaces entre les mots et les remplacer par des _
    const name = file.originalname.split(' ').join('_');
    //constante pour l'extension du fichier 
    //rappel de la constante MIME_TYPES et l'utiliser avec file
    const extension = MIME_TYPES[file.mimetype];
    //appeler le callback final du fichier: 
    //null pour indiquer qu'il n'y a pas d'erreur. 
    //name : nom du fichier. 
    //Date.now() => timestamp (date et heure de l'insertion du fichier)
    //extension du fichier
    callback(null, name + Date.now() + '.' + extension);
  }
});

//Exportation de multer à laquelle on passe l'objet storage et la methode .single pour indiquer que le fichier est unique (image)
module.exports = multer({storage: storage}).single('image');