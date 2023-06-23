const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const crypto = require('crypto');

const app = express();
const log = console.log

// Configurer le middleware cookie-parser
app.use(cookieParser());

// Configurer le middleware express-session
app.use(session({
  secret: 'votre_clé_secrète',
  resave: false,
  saveUninitialized: true
}));

app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200'); // Remplacez par l'URL de votre application front-end
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  
    next();

});

/* Ajout des middleware */
const bodyParser = require('body-parser');


/* Ajout de mongoose */
const {mongoose} = require('./db/mongoose');

const jwt = require('jsonwebtoken');


//ajout d'un middleware pour gérer les headers


/* demarrage body-parser */
app.use(bodyParser.json());

/* Ajout des models */
const utilisateur = require('./db/models/Utilisateurs.model');
const competence = require('./db/models/Competences.model');
const projet = require('./db/models/Projet.model');
const resultat = require('./db/models/Resultat.model');
const typeUtilisateur = require('./db/models/TypeUtilisateur.model');
const gestion = require('./db/models/Gestion.model');
const lie = require('./db/models/lie.model');
const possede = require('./db/models/Possede.model');
const inscription = require('./db/models/Inscription.model');

/* MIDDLEWARE */

const authenticateUser = (req, res, next) => {
    

    // Vérifiez si le JWT est présent dans la session
    if (req.session.jwt) {
      // Validez et vérifiez le JWT ici (par exemple, en utilisant une bibliothèque comme jsonwebtoken)
      // Si le JWT est valide, vous pouvez stocker les informations de l'utilisateur dans req.session
      // Exemple : req.session.user = decodedUser;
  
      // Appel suivant dans la chaîne des middlewares

      jwt.verify(req.session.jwt, 'clesupersecurise123456789', (err, decoded) => {
        if (err) {
          console.error('Erreur lors du décodage du JWT:', err);
          res.status(401).json({ message: 'JWT invalide' });
        } else {
            if (decoded.connexion) {
                req.session.user = decoded.utilisateur;
                req.session.typeCompte = decoded.type
            }
            else{
                console.log(decoded)
                delete req.session.jwt;
                res.status(401).json({ message: 'JWT invalide'});
            }
            
        }
      });

      return next();
    }
    else{
        // Si le JWT est absent ou invalide, vous pouvez renvoyer une erreur ou rediriger l'utilisateur vers une page d'authentification
        res.status(401).json({ message: 'Authentification requise' });
    }
  };

/* ROUTES */

/**
 * POST /admin/addUser
 * ajout d'utilisateur par un compte admin
 */
app.post('/admin/addUser',authenticateUser, async(req,res) => {

    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const email = req.body.email;
    const motDePasse = req.body.motDePasse;
    const id_typeUtilisateur = req.body.idTypeUtilisateur;
    
    
    let roleUtilisateur = ""
    let FindUtilisateur = ""

    // On vérifie que l'utilisateur est bien un administateur
    try {
        FindUtilisateur = await utilisateur.findById(req.session.user);
        roleUtilisateur = FindUtilisateur.nom;
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur, administrateur non trouvé !" });
    }

    //On récupère le role de l'utilisateur
    try {
        const FindTypeUtilisateur = await typeUtilisateur.findById(FindUtilisateur.id_typeUtilisateur);
        roleUtilisateur = FindTypeUtilisateur.nom;
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur, typeUtilisateur non trouvé !" });
    }

    
    if (roleUtilisateur === "administrateur") {
      
        // création d'un sel unique
        const salt = crypto.randomBytes(16).toString('hex'); 
  
        // hashage du mot de passe de l'utilisateur avec 1000 itérations, 
        const hash = crypto.pbkdf2Sync(motDePasse, salt, 1000, 64, `sha512`).toString(`hex`);

        //Création du nouvelle utilisateur.
        let newUtilisateur = new utilisateur({
            nom,
            prenom,
            email,
            salt,
            hash,
            id_typeUtilisateur  
        });

        //Sauvegarde du nouvelle utilisateur
        newUtilisateur.save().then((ListDoc) => {
            res.status(200).json({message: "Utilisateur ajouté !"})
        })
        .catch((e) => {
            res.status(500).json({ message: "Erreur serveur lors de l'ajout de l'utilisateur" });
            console.log(e);
        });
    }
    else{
        res.status(200).json({ message: "Erreur ! Ajout effectuer par un compte non admin !" });
    }
});

/**
 * DELETE /admin/deleteUsert/:id
 * supprimer un utilisateur par un administrateur
 */
app.delete('/admin/deleteUser/:id',authenticateUser, async(req,res) => {


    if (req.session.typeCompte === "administrateur") {
        try {
            //On récupère l'utilisateur par id
            const FindUtilisateur = await utilisateur.findById(req.params.id);
        
            //On vérifie que l'utilisateur existe et est trouvé
            if (!FindUtilisateur) {
              return res.status(404).json({ message: "Utilisateur non trouvé" });
            }
        
            //On supprime l'utilisateur
            await FindUtilisateur.deleteOne().then((ListDoc) => {
                res.status(200).json({message : "Suppression réussi !"})
            })
            .catch((e) => {
                res.status(500).json({ message: "Erreur serveur lors de la suppression de l'utilisateur"});
                console.log(e);
            });
    
        }
        catch(err) {
            console.error(err);
            res.status(500).json({ message: "Erreur serveur lors de la suppression de l'utilisateur" });
        }
    }
});

/**
 * PUT /admin/updateUser/:id
 * Route de modification d'utilisateur
 */
app.post('/updateUser',authenticateUser, async(req, res) => {
    
    const nomModif = req.body.nom;
    const prenomModif = req.body.prenom;
    const emailModif = req.body.email;
    const motDePasseModif = req.body.motDePasse;
    const id_typeUtilisateurModif = req.body.idTypeUtilisateur;
    const idUtilisateur = req.body.idUtilisateur;
    

    let roleUtilisateur = ""
    let FindAdmin = ""

    
    if (req.session.typeCompte === "administrateur" || idUtilisateur === req.session.user) {
        
        const utilisateurModif = await utilisateur.findById(idUtilisateur);
        console.log(nomModif);
        console.log(prenomModif);
        console.log(emailModif);
        console.log(motDePasseModif);
        
        try {
       
            if (nomModif !== "" || nomModif !== null) {
                utilisateurModif.updateOne(
                    {
                        $set: {
                            nom: nomModif
                        }
                    }
                ).then((result) => {
                    if (result.nModified > 0) {
                        console.log("Modification du nom réussie");
                      } else {
                        console.log("Aucune modification effectuée pour le nom");
                      }
                })
                .catch((e) => {
                    console.error(e);
                   
                })
            }
            else{
                utilisateurModif.updateOne(
                    {
                        $set: {
                            nom: utilisateurModif.nom
                        }
                    }
                ).then((result) => {
                    if (result.nModified > 0) {
                        console.log("Modification du nom réussie");
                      } else {
                        console.log("Aucune modification effectuée pour le nom");
                      }
                })
                .catch((e) => {
                    console.error(e);
                   
                })
            }

            if (prenomModif !== "" || prenomModif !== null) {
                utilisateurModif.updateOne(
                    {
                        $set: {
                            prenom: prenomModif
                        }
                    }
                ).then(() => {
                    console.log("Modification du prenom réussi" );
                })
                .catch((e) => {
                    console.error(e);
                    
                })
            }
            else{
                utilisateurModif.updateOne(
                    {
                        $set: {
                            prenom: utilisateurModif.prenom
                        }
                    }
                ).then(() => {
                    console.log("Modification du prenom réussi" );
                })
                .catch((e) => {
                    console.error(e);
                    
                })
            }

            if (emailModif !== "" || emailModif !== null) {
                utilisateurModif.updateOne(
                    {
                        $set: {
                            email: emailModif
                        }
                    }
                ).then(() => {
                    console.log("Modification de l'email réussi" );
                })
                .catch((e) => {
                    console.error(e);
                    
                })
            }
            else{
                utilisateurModif.updateOne(
                    {
                        $set: {
                            email: utilisateurModif.email
                        }
                    }
                ).then(() => {
                    console.log("Modification de l'email réussi" );
                })
                .catch((e) => {
                    console.error(e);
                    
                })
            }

            if (motDePasseModif !== "" || motDePasseModif !== null) {

                // création d'un sel unique
                const saltMdp = crypto.randomBytes(16).toString('hex'); 
  
                // hashage du mot de passe de l'utilisateur avec 1000 itérations, 
                const hashMdp = crypto.pbkdf2Sync(motDePasseModif, saltMdp, 1000, 64, `sha512`).toString(`hex`);
                
                log(saltMdp);
                log(hashMdp)

                utilisateurModif.updateOne(
                    {
                        $set: {
                            salt: saltMdp,
                        }
                    }
                ).then(() => {
                    console.log("Modification du mot de passe réussi" );
                })
                .catch((e) => {
                    console.error(e);
                   
                })

                utilisateurModif.updateOne(
                    {
                        $set: {
                            hash: hash
                        }
                    }
                ).then(() => {
                    console.log("Modification du mot de passe réussi" );
                })
                .catch((e) => {
                    console.error(e);
                })
            }
            else{
                utilisateurModif.updateOne(
                    {
                        $set: {
                            salt: utilisateurModif.salt,
                        }
                    }
                ).then(() => {
                    console.log("Modification du mot de passe réussi" );
                })
                .catch((e) => {
                    console.error(e);
                   
                })

                utilisateurModif.updateOne(
                    {
                        $set: {
                            hash: utilisateurModif.hash
                        }
                    }
                ).then(() => {
                    console.log("Modification du mot de passe réussi" );
                })
                .catch((e) => {
                    console.error(e);
                })
            }

            if (id_typeUtilisateurModif !== "" || id_typeUtilisateurModif !== null) {
                utilisateurModif.updateOne(
                    {
                        $set: {
                            id_typeUtilisateur: id_typeUtilisateurModif
                        }
                    }
                ).then(() => {
                    console.log("Modification du type utilisateur réussi" );
                })
                .catch((e) => {
                    console.error(e);
                    
                })
            }
            else{
                utilisateurModif.updateOne(
                    {
                        $set: {
                            id_typeUtilisateur: utilisateurModif.id_typeUtilisateur
                        }
                    }
                ).then(() => {
                    console.log("Modification du type utilisateur réussi" );
                })
                .catch((e) => {
                    console.error(e);
                    
                })
            }
            
           
                res.status(200).json({ message: "Modification réussi" });
            
            

            
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur dans la mise à jour !" });
        }  
    }

});

/**
 * GET /admin/:id
 * Récupération d'un utilisateur par id.
 */
app.get('/admin/:id',authenticateUser, async(req, res) => {
       
    utilisateur.findById(req.params.id)
    .populate('id_typeUtilisateur')
    .exec()
    .then((user) => {
        const userJson = JSON.stringify(user)
        res.end(userJson)
    });

});

/**
 * GET /admin
 * Permet de récupérer tout les comptes utilsateurs ainsi que leur type.
 */
app.get('/admin',authenticateUser, (_req,res) =>  {
    utilisateur.find()
    .populate('id_typeUtilisateur')
   .then((users)=> {
        const userJson = JSON.stringify(users);
        res.end(userJson);
    })
    .catch((error)=>{
        console.error(error)
    })
});

app.post('/connexion', async(req, res) => {
    const mail = req.body.email;
    const motDePasse = req.body.motDePasse;
    console.log(mail)
    console.log(req.body.motDePasse)
    const secret = 'clesupersecurise123456789';
    
    console.log(mail)
    utilisateur.findOne({ email: mail })
    .populate('id_typeUtilisateur')
    .then((users)=> {
        
        var hash = crypto.pbkdf2Sync(motDePasse ,users.salt, 1000, 64, `sha512`).toString(`hex`); 
     
        if (hash === users.hash) 
        {
            const token = jwt.sign({ connexion: true, type: users.id_typeUtilisateur.nom, utilisateur: users._id, nom : users.nom, prenom: users.prenom }, secret);
            
            req.session.jwt = token;
            req.session.save();

            res.json(token);
        }
        else {
            const token = jwt.sign({ connexion: false }, secret);
            req.session.token = token;

            res.json(token);
        }
    })
    .catch((error)=>{
        console.error(error)
    })
      
});

app.post('/competence/add',authenticateUser, async(req, res) => {

    //on récupère les informations du formulaire
    const nom = req.body.nomCompetence;
    const niveau = req.body.niveauCompetence;
    const selectedValue = req.body.selectedValue

    let roleUtilisateur = ""
    let FindUtilisateur = ""

     // On récupère l'administrateur par l'id
     try {
        FindUtilisateur = await utilisateur.findById(req.session.user);
        roleUtilisateur = FindUtilisateur.nom;
    } catch (error) {
        console.error(error);
       
    }

    //On récupère le role de l'utilisateur
    try {
        const FindTypeUtilisateur = await typeUtilisateur.findById(FindUtilisateur.id_typeUtilisateur);
        roleUtilisateur = FindTypeUtilisateur.nom;
    } catch (error) {
        console.error(error);
        
    }

    if (roleUtilisateur === "enseignant") {

        const dateCreation = new Date();

        //Création du nouvelle utilisateur.
        const newCompetence = new competence({
            idProf : req.session.user,
            nom,
            niveau,
            dateCreation
        });

        //Sauvegarde du nouvelle utilisateur
        newCompetence.save().then((ListDoc) => {
            

            log(ListDoc);
            log(selectedValue)
            if (selectedValue.length !== 0) {

                selectedValue.forEach(id_competence => {
                    const newLie = new lie({
                        idCompetenceParent : ListDoc._id,
                        idCompetenceEnfant : id_competence
                    })

                    newLie.save().then(()=>{
                        log("lie ajouté !")
                    });
                });
                
            }
            res.status(200).json({ message: "Ajout de la compétence" });
        })
        .catch((e) => {
            res.status(500).json({ message: "Erreur serveur lors de l'ajout de la compétence" });
            console.log(e);
        });
    }
    else{
        res.status(500).json({ message: "Erreur ! Ajout effectuer par un compte authorisé !" });
    }
});

app.get('/lie',authenticateUser, async(req,res) => {

    let Comp = req.query.competence;
   
    Comp = Comp.split(',')

    Comp.forEach(element => {
        log(element)
    });

    function getLie(elementCompetence) {
        console.log(elementCompetence)
        return lie
                .find({ idCompetenceParent: {$in : elementCompetence} })
                .populate("idCompetenceEnfant idCompetenceParent")
                .exec(); 
    }

    function getLie2(elementCompetence) {
           
        return lie
                .find({ idCompetenceParent: elementCompetence })
                .populate("idCompetenceEnfant idCompetenceParent")
                .exec(); 
    }
       

    if (typeof Comp !== "string") {
        
        getLie(Comp)
        .then((retour) => {
            console.log(retour)
            console.log(JSON.stringify(retour))
            // Faire quelque chose avec les projets trouvés
            res.end(JSON.stringify(retour))
            
        })
        .catch((error) => {
            console.log('Erreur lors de la recherche du lie :', error);
            // Gérer l'erreur de recherche du projet
        });
        
      } else {
        getLie2(Comp)
        .then((retour) => {
            
            // Faire quelque chose avec les projets trouvés
            res.end(JSON.stringify(retour))
            
        })
        .catch((error) => {
            console.log('Erreur lors de la recherche du lie :', error);
            // Gérer l'erreur de recherche du projet
        });
    }
})

app.get('/competence',authenticateUser, async(req, res) => {

    let roleUtilisateur = ""
    let FindUtilisateur = ""
   
     // On récupère l'administrateur par l'id
    try {
        FindUtilisateur = await utilisateur.findById(req.session.user);
        roleUtilisateur = FindUtilisateur.nom;
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur, administrateur non trouvé !" });
    }

    //On récupère le role de l'utilisateur
    try {
        const FindTypeUtilisateur = await typeUtilisateur.findById(FindUtilisateur.id_typeUtilisateur);
        roleUtilisateur = FindTypeUtilisateur.nom;
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur, typeUtilisateur non trouvé !" });
    }

    if (roleUtilisateur === "enseignant") {
        competence.find({idProf : req.session.user})
        .then((comp)=> {
             const CompetenceJson = JSON.stringify(comp);
             res.end(CompetenceJson);
         })
         .catch((error)=>{
             console.error(error)
         })
        
    }
    else{
        res.status(200).json({ message: "Erreur ! Ajout effectuer par un compte authorisé !" });
    }
})

app.get('/competence/:id',authenticateUser, async(req, res) => {

    if (req.session.typeCompte === "enseignant") {

        competence.findById(req.params.id)
        .then((comp)=> {
             const CompetenceJson = JSON.stringify(comp);
             res.end(CompetenceJson);
         })
         .catch((error)=>{
             console.error(error)
         })
        
    }
    else{
        res.status(200).json({ message: "Erreur ! Récupération effectuer par un compte non authorisé !" });
    }
})

app.delete('/competence/delete/:id',authenticateUser, async(req, res) => {
   

    if (req.session.typeCompte === "enseignant") {
        try {
            
            //On récupère l'id de la compétence en parametre 
            const FindCompetence = await competence.findById(req.params.id);
        
            //On vérifie que la compétence existe et est trouvé
            if (!FindCompetence) {
              return res.status(404).json({ message: "Compétence non trouvé" });
            }
        
            //On supprime la compétence
            await FindCompetence.deleteOne().then(async () => {


                const Poss = await possede.find({idCompetence : req.params.id})

                console.log(Poss)

                Poss.map((element)=>{
                    element.deleteOne()
                        .then((retour)=>{
                            console.log("possede supprimer")
                        })
                })

                const Result = await resultat.find({idCompetence : req.params.id})
                console.log(Result)

                Result.map((element)=>{
                    element.deleteOne()
                        .then((retour)=>{
                            console.log("Resultat supprimer")
                        })

                })
                
                /*await Result.delete()
                .then((retour)=>{
                    console.log("resultat supprimer")
                })*/
                
                res.status(200).json({ message: "Compétence supprimer"});

                console.log("Compétence supprimé");
            })
            .catch((e) => {
                res.status(500).json({ message: "Erreur serveur lors de la suppression de la competence"});
                console.log(e);
            });
        }
        catch(err) {
            console.error(err);
            res.status(500).json({ message: "Erreur serveur lors de la suppression de la competence" });
        }
    }
    else{
        res.status(200).json({ message: "Erreur ! Ajout effectuer par un compte authorisé !" });
    }
})


app.post('/competence/updateCompetence',authenticateUser, async(req, res) => {
    
    //on récupère les informations du formulaire
    const nomModif = req.body.nom;
    const niveauModif = req.body.niveau;
    const idCompetence = req.body.idCompetence

    console.log(nomModif)
    console.log(niveauModif)
    console.log(idCompetence)

    if (req.session.typeCompte === "enseignant") {
        const CompetenceModif = await competence.findById(idCompetence);

        

        try {
       
            if (nomModif !== "" && nomModif !== null) {
                CompetenceModif.updateOne(
                    {
                        $set: {
                            nom: nomModif
                        }
                    }
                ).then((result) => {
                    if (result.nModified > 0) {
                        console.log("Modification du nom réussie");
                      } else {
                        console.log("Aucune modification effectuée pour le nom");
                      }
                })
                .catch((e) => {
                    console.error(e);
                   
                })
            }
            else{
                console.log("nom je suis la")
                CompetenceModif.updateOne(
                    {
                        $set: {
                            nom: CompetenceModif.nom
                        }
                    }
                ).then((result) => {
                    if (result.nModified > 0) {
                        console.log("Modification du nom réussie");
                      } else {
                        console.log("Aucune modification effectuée pour le nom");
                      }
                })
                .catch((e) => {
                    console.error(e);
                   
                })
            }

            if (niveauModif !== "" && niveauModif !== null) {
                CompetenceModif.updateOne(
                    {
                        $set: {
                            niveau: niveauModif
                        }
                    }
                ).then(() => {
                    console.log("Modification du niveau réussi" );
                })
                .catch((e) => {
                    console.error(e);
                    
                })
            }
            else{
                console.log("niveaux je suis la")
                CompetenceModif.updateOne(
                    {
                        $set: {
                            niveau: CompetenceModif.niveau
                        }
                    }
                ).then(() => {
                    console.log("Modification du niveau réussi" );
                })
                .catch((e) => {
                    console.error(e);
                    
                })
            }
              
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur dans la mise à jour !" });
        }  
        res.status(200).json({ message: "Modification réussi" });
    }
    else{
        res.status(200).json({ message: "Erreur ! Ajout effectuer par un compte authorisé !" });
    }
})

app.post('/cour/add',authenticateUser, async(req, res) => {

    //on récupère les informations du formulaire
    const nom = req.body.nomCour;
    const description = req.body.descriptionCour;
   
    const Competences = req.body.id_competence;

    let roleUtilisateur = ""
    let FindUtilisateur = ""

     // On récupère l'enseignant par l'id
     try {
        FindUtilisateur = await utilisateur.findById(req.session.user);
        roleUtilisateur = FindUtilisateur.nom;
    } catch (error) {
        console.error(error);
    }

    //On récupère le role de l'utilisateur
    try {
        const FindTypeUtilisateur = await typeUtilisateur.findById(FindUtilisateur.id_typeUtilisateur);
        roleUtilisateur = FindTypeUtilisateur.nom;
    } catch (error) {
        console.error(error);
    }

    if (roleUtilisateur === "enseignant") {

        const dateCreation = new Date();

        //Création du nouvelle utilisateur.
        let newCours = new projet({
            idEnseignant : req.session.user,
            nom,
            description,
            dateCreation
        });

        //Sauvegarde du nouvelle utilisateur
        newCours.save().then((ListDoc) => {
            

            const idProjet = ListDoc._id
        
            //ListDoc._id pour récupérer l'id de l'élément enregistrer
            const CompetenceArray = Competences

            

            CompetenceArray.forEach(element => {
                let idCompetence = new mongoose.Types.ObjectId(element)


                let newPossede = new possede({
                    idProjet,
                    idCompetence
                })
            
                //Sauvegarde du lien entre projet et compétence
                newPossede.save().then((ListDoc) => {
                    console.log("possede ajoute " )
                })
                .catch((e) => {
                    //res.status(500).json({ message: "Erreur serveur lors de l'ajout du projet" });
                    console.log(e);
                });
            });

            res.status(200).json({ message: "Projet ajouté !!" });
        })
        .catch((e) => {
            res.status(500).json({ message: "Erreur serveur lors de l'ajout du projet" });
            console.log(e);
        });
    }
    else{
        res.status(500).json({ message: "Erreur ! Ajout effectuer par un compte authorisé !" });
    }
});

app.get('/courEtudiant',authenticateUser, async(req, res) => {
   
    let ProjetJson = ""    

    function GetInscription(ElementProjet)
    {   
        let tableau = []
        ElementProjet.forEach(element => {
            tableau.push(element._id)
            console.log(element._id)
        });

        return inscription
                .find({idEtudiant : req.session.user })
    }

    function GetProjet()
    {
        return projet
                .find()
    }

    function GetProjet2(idProjetARecup)
    {       
        let tableau = []
        idProjetARecup.forEach(element => {
            tableau.push(element.idProjet)
            
        });
        console.log(tableau)
        return projet
                .find({_id : {$nin : tableau}})
    }

    GetProjet()
    .then((elementProjet)=>{
        console.log(elementProjet)
        GetInscription(elementProjet)
        .then((inscr)=>{
           console.log("inscription : " + inscr)
            GetProjet2(inscr)
            .then((retour)=>{
                res.end(JSON.stringify(retour))
            })
        })
        .catch((error)=>
        {
            console.log(error)
        })
    })
    .catch((error)=>
    {
        console.log(error)
    })

    
         
})

app.get('/courEnseignant',authenticateUser, async(req, res) => {
   
    let ProjetJson = ""       
    projet.find({idEnseignant : req.session.user})
    .then(async (comp)=> {
        const ProjetJson = JSON.stringify(comp)
        res.end(ProjetJson)
    })
    .catch((error)=>{
        console.error(error)
    })
         
})

app.delete('/cour/delete/:id',authenticateUser, async(req, res) => {
   
    if (req.session.typeCompte === "enseignant") {
        try {
            //On récupère l'utilisateur par id
            const FindCour = await projet.findById(req.params.id);
        
            //On vérifie que l'utilisateur existe et est trouvé
            if (!FindCour) {
              return res.status(404).json({ message: "Cour non trouvé" });
            }
        
            //On supprime l'utilisateur
            await FindCour.deleteOne().then(async () => {
                res.status(200).json({ message: "Cour supprimer"});
                

                //il faut aussi supprimer toutes les inscriptions

                const Insc = await inscription.find({idProjet : req.params.id})

                Insc.forEach(element => {
                    element.deleteOne()
                    .then((result)=>{
                        console.log("suppression réussi")
                    })
                    .catch((error)=>{
                        console.log(error)
                    })
                });

                //il faut aussi supprimer toutes les possedes
                const Poss = await possede.find({idProjet : req.params.id})

                Poss.forEach(element => {
                    element.deleteOne()
                    .then((result)=>{
                        console.log("suppression réussi")
                    })
                    .catch((error)=>{
                        console.log(error)
                    })
                });
            })
            .catch((e) => {
                res.status(500).json({ message: "Erreur serveur lors de la suppression du cour"});
                console.log(e);
            });
        }
        catch(err) {
            console.error(err);
            res.status(500).json({ message: "Erreur serveur lors de la suppression de la competence" });
        }
    }
    else{
        res.status(200).json({ message: "Erreur ! Ajout effectuer par un compte authorisé !" });
    }
})

app.put('/cour/updateCour/:id',authenticateUser, async(req, res) => {
    
    //on récupère les informations du formulaire
    const nom = req.body.nomCompetence;
    const niveau = req.body.niveauCompetence;

    let roleUtilisateur = ""
    let FindUtilisateur = ""

     // On récupère l'administrateur par l'id
     try {
        FindUtilisateur = await utilisateur.findById(req.body.id_admin);
        roleUtilisateur = FindUtilisateur.nom;
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur, administrateur non trouvé !" });
    }

    //On récupère le role de l'utilisateur
    try {
        const FindTypeUtilisateur = await typeUtilisateur.findById(FindUtilisateur.id_typeUtilisateur);
        roleUtilisateur = FindTypeUtilisateur.nom;
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur, typeUtilisateur non trouvé !" });
    }

    if (roleUtilisateur === "enseignant") {
        const CompetenceModif = await competence.findById(req.params.id);

        console.log(CompetenceModif.nom)

        try {
 
             if (nom !== "") {
                CompetenceModif.updateOne(
                     {
                         $set: {
                             nom: nom
                         }
                     }
                 ).then(() => {
                     console.log("modification du nom réussi")
                 })
                 .catch((e) => {
                     console.error(e);
                     res.status(500).json({ message: "Modification du nom non réussi" });
                 })
             }
 
             if (niveau !== "") {
                CompetenceModif.updateOne(
                    {
                        $set: {
                            niveau: niveau
                        }
                    }
                ).then(() => {
                    console.log("modification du niveau réussi")
                })
                .catch((e) => {
                    console.error(e);
                    res.status(500).json({ message: "Modification du niveau non réussi" });
                })
            }
            
            console.log(CompetenceModif.nom)

            res.status(200).json({ message: "Modification réussi" });
         } catch (error) {
             console.error(error);
             res.status(500).json({ message: "Erreur dans la mise à jour !" });
         }  
    }
    else{
        res.status(200).json({ message: "Erreur ! Ajout effectuer par un compte authorisé !" });
    }
})

/**
 * Inscription
 */

app.post('/inscription/:id',authenticateUser, async(req, res) => {
    /**
     * Pour l'inscription il faut: 
     *  - un id étudiant.
     *  - un id projet.
     *  - une date d'insription
     */

    //on récupère les informations du formulaire
    const idEtudiant = req.body.idEtudiant;
    const idProjet = req.body.idProjet;

  

        if (req.session.typeCompte === "étudiant") {
            const dateInscription = new Date();
            const RechercheInscription = await inscription.find({idEtudiant : idEtudiant, idProjet : idProjet})

            if (RechercheInscription.length === 0) {
                //Création du nouvelle inscription.
                let newInscription = new inscription({
                    idEtudiant,
                    idProjet,
                    dateInscription
                });

                //Sauvegarde de l'inscription
                newInscription.save().then((ListDoc) => {
                    possede.find({ idProjet: idProjet })
                    .populate('idCompetence')
                    .exec()
                    .then(comp => {
                        const PossedeCompetence = comp;
                    // console.log(PossedeCompetence)

                        
                        PossedeCompetence.forEach(async element => {
                            const res = await resultat.find({idCompetence : element.idCompetence._id})
                            console.log("resultat : " + res)

                            if (res.length > 0) {
                                console.log("Élément trouvé :", res);
                            } else {
                                let newResultat = new resultat({
                                    idEtudiant,
                                    idCompetence : element.idCompetence._id,
                                    niveauCompetence : 0
                                })
        
                                newResultat.save().then((result)=>{
                                    console.log("creationResultat")
                                })
                            }   
                        });
                    })
                    .catch(error => {
                        console.error(error);
                    });  
                    
                

                    res.status(200).json({ message: "Inscription au projet réussi" });
                })
                .catch((e) => {
                    res.status(500).json({ message: "Inscription au projet non réussi" });
                    console.log(e);
                });
            }
            else{
                console.log("test")
                res.end("dejaInscript")
            }
            
        }
        else{
            res.status(500).json({ message: "Erreur ! Ajout effectuer par un compte non authorisé !" });
        }
});

app.delete('/desinscription/:id',authenticateUser, async(req, res) => {
   

 
        try {
            
            //On récupère l'id de la compétence en parametre 
            const FindInscription = await inscription.find({idProjet : req.params.id});
        
            //On vérifie que la compétence existe et est trouvé
            if (!FindInscription) {
              return res.status(404).json({ message: "Inscription non trouvé" });
            }
        
            FindInscription.forEach(async element => {
                 //On supprime l'inscription
                await element.deleteOne().then(async () => {
                    
                    res.status(200).json({ message: "Compétence supprimer"});

                    console.log("Compétence supprimé");
                })
                .catch((e) => {
                    res.status(500).json({ message: "Erreur serveur lors de la suppression de la competence"});
                    console.log(e);
                });
            });
           
        }
        catch(err) {
            console.error(err);
            res.status(500).json({ message: "Erreur serveur lors de la suppression de la competence" });
        }

})

/**
 * Validation des compétences
 */

app.get('/cour/inscrit',authenticateUser, async(req, res) => {
    
   
    /**
     * Il faut récupérer tout les id de projet dans la table
     * inscription correspondant à l'id de l'etudiant
     */
    let ProjetArray = [];
    inscription.find({idEtudiant : req.session.user})
    .populate('idProjet') 
    .exec()
    .then(inscriptions => {
        const ProjetJson = JSON.stringify(inscriptions);
        res.end(ProjetJson);
    })
    .catch(error => {
      console.error(error);
    });   
})

app.get('/etudiant/projet/competence',authenticateUser, async(req, res)=>{
    const idEtudiant = req.query.idEtudiant;
    const idProjet = req.query.idProjet;


    /*function getPossede()
    {
        return possede
                .find({ idProjet: idProjet })
                .populate('idCompetence')
                .exec()
    }

    function getResultat(elementPoss)
    {   
        let tableau = []
        elementPoss.forEach(element => {
            tableau.push(element.idCompetence._id)
        });

        return resultat
                .find({ idEtudiant : req.session.user , idCompetence: {$in : tableau}})
                .populate("idCompetence");
    }


    getPossede()
    .then((poss)=>{
        getResultat(poss)
        .then((result)=>{
            console.log(result)
        })
    })*/
  
    let ResultatJson = []

    possede.find({ idProjet: idProjet })
    .populate('idCompetence')
    .exec()
    .then(async comp => {
        const PossedeCompetence = comp;

    // Créez un tableau de promesses pour stocker les résultats des opérations `resultat.find()`
    const promesses = PossedeCompetence.map(async (element) => {
        const result = await resultat.find({ idCompetence: element.idCompetence._id })
        .populate("idCompetence");
        return result;
    });
  
    // Utilisez Promise.all() pour attendre que toutes les promesses soient résolues
    const resultats = await Promise.all(promesses);
    
    // Parcourez les résultats et effectuez les actions souhaitées
    resultats.forEach((value) => {
        console.log("Résultat : " + value);
    
        if (value.length > 0) {
            console.log("On est là");
            ResultatJson.push(value);
        } else {
            console.log("On n'est pas là");
        }
    });
  
        // Poursuivez avec d'autres actions ici après que toutes les opérations soient terminées
        console.log("Toutes les opérations sont terminées");
        console.log("++++++++++++++++++++++++++++++")
        console.log("Résultat final :", resultats);
        console.log("vs")
        console.log(ResultatJson)
        console.log("------------------------------")
        res.end(JSON.stringify(resultats))
    })
    .catch(error => {
        console.error(error);
    });  
});

app.post('/modif/resultat',authenticateUser, async(req, res)=>{
    const idResultat = req.body.idResultat;
    const niveauCompetence = req.body.niveauCompetence;

    console.log(idResultat)
    console.log(niveauCompetence)

    const resultatModif = await resultat.findById(idResultat);

    try {

        if (niveauCompetence !== "") {
            resultatModif.updateOne(
                {
                    $set: {
                        niveauCompetence: niveauCompetence
                    }
                }
            ).then(() => {
                console.log("Changement des resultats réussi !" );
            })
            .catch((e) => {
                console.error(e);
                res.status(500).json({ message: "Changement des resultats non réussi !" });
            })
        }
        
        res.status(200).json({ message: "Modification réussi" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur dans la mise à jour !" });
    }   
});

app.get('/etudiant/competence',authenticateUser, async(req, res)=>{
    const idEtudiant = req.query.idEtudiant;
    
    resultat.find({idEtudiant: idEtudiant})
    .populate('idCompetence')
    .exec()
    .then(comp => {
        console.log(comp)
        res.end(JSON.stringify(comp))
    })
    .catch(error => {
      console.error(error);
    });  
});



/*
 * GET /etudiant/inscript
 * Permet de récupérer les étudiants inscrit a un projet
 */
app.get('/etudiant/inscript', authenticateUser, async(req, res)=>{

    let resultatEtudiant = "";
    //on récupère l'id du projet

    const idProjet = req.query.idProjet

    if(req.session.typeCompte === "enseignant")
    {

        function getInscription()
        {   
            return inscription
            .find({idProjet: idProjet})
            .populate('idEtudiant')
            .exec();
        }

        getInscription()
        .then((Inscr)=>{
            res.end(JSON.stringify(Inscr))
        })
        .catch((error)=>{
            console.log('Erreur lors de la recherche de l inscription :', error);
        }) 
    }
});

app.get('/etudiant/inscript/competence', authenticateUser, async(req, res)=>{

    const idProjet = req.query.idProjet
    

    //il faut récupérer tout les compétences du projet

    if(req.session.typeCompte === "enseignant")
    {
        log("avant")

        function getCompetence() {
            log("pendant")
            return projet
                    .find({ idEnseignant: req.session.user })
                    .select('_id')
                    .exec();
        }

        function getInscription(elementProjet)
        {   
            log("pendant 2")
            return inscription
            .find({idProjet: { $in: elementProjet } }).exec();
        }

        getProjet()
        .then((projets) => {
            console.log('Projets trouvés :', projets);
            // Faire quelque chose avec les projets trouvés

            getInscription(projets)
            .then((Inscr)=>{
                console.log('Inscription trouvés :', Inscr);
                
            })
            .catch((error)=>{
                console.log('Erreur lors de la recherche de l inscription :', error);
                // Gérer l'erreur de recherche du projet
            })

            
        })
        .catch((error) => {
            console.log('Erreur lors de la recherche du projet :', error);
            // Gérer l'erreur de recherche du projet
        });

        log("après")
    }

});

app.get('/etudiant/inscript/resultat', authenticateUser, async(req, res)=>{

    const idProjet = req.query.param1
    const idEtudiant = req.query.param2

    console.log(idProjet)
    console.log(idEtudiant)

    //il faut récupérer tout les compétences du projet

    if(req.session.typeCompte === "enseignant")
    {
        

        function getCompetence() {
           
            return possede
                    .find({ idProjet: idProjet,  })
                    .select('idCompetence -_id')
                    .exec();
        }

        function getResult(elementCompetence)
        {   
            
            let tableauCompetence = []
            elementCompetence.forEach((element)=>{
                tableauCompetence.push(element.idCompetence)
                
            })
            
            console.log(tableauCompetence)

            return resultat
                    .find({idEtudiant : idEtudiant, idCompetence: { $in: tableauCompetence }})
                    .populate('idCompetence')
                    .exec();
        }

        getCompetence()
        .then((comp) => {
            
            // Faire quelque chose avec les projets trouvés

            getResult(comp)
            .then((resul)=>{
                console.log('Resultat trouvés :', resul);
                res.end(JSON.stringify(resul))
            })
            .catch((error)=>{
                console.log('Erreur lors de la recherche de l inscription :', error);
                // Gérer l'erreur de recherche du projet
            })

            
        })
        .catch((error) => {
            console.log('Erreur lors de la recherche du projet :', error);
            // Gérer l'erreur de recherche du projet
        });

        log("après")
    }

});

app.listen(3000, () => {
    console.log("serveur is listening on port 3000 !")
})
