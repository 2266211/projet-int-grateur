const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb+srv://Cluster:1234@cluster.rsbyhvp.mongodb.net/test");

//Vérifier que la base de donnée est bien connectée
connect.then(() => {
    console.log("Base de donnée oppérationnelle");
})
.catch(() => {
    console.log("Erreur au niveau de la base de donnée");
});

//Création d'un schéma
const schemaConnexion = new mongoose.Schema({
    nom : {
        type : String,
        required : true
    },
    motdepasse : {
        type:String,
        required:true
    }
});

const collection = new mongoose.model("user", schemaConnexion);

module.exports = collection;