const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb+srv://Cluster:1234@cluster.rsbyhvp.mongodb.net/QUIZLAB");

//Vérifier que la base de donnée est bien connectée
connect.then(() => {
    console.log("Base de donnée oppérationnelle");
})
.catch(() => {
    console.log("Erreur au niveau de la base de donnée");
});