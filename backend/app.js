//pour faire tourner le front il faut installer package angular -> npm install -g @angular/cli


const express = require('express');// import du framework express
const bodyParser = require('body-parser'); // import 
const app = express();
const mongoose = require('mongoose'); // import d'un package pour mangodb

mongoose.connect('mongodb+srv://admin:root@cluster-0zvyu.gcp.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


const Product = require('./models/product'); // constante class

// middleware
app.use((req, res, next) => { // requete, réponse, next permet de passer a la fonction suivante

  //Pour résoudre les probleme CORS vu que le front et le back on deux ports differents
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();// passe a la fonction suivante
  });
  
  app.use(bodyParser.json());

  app.post('/api/products', (req, res, next) => {
    const products = new Product({

      ...req.body // du spread permet de tout récuperer dans le corp du champ 

    });

    products.save()
    .then(product =>res.status(200).json({ product })) //promise si c'est bon 
    .catch(error => res.status(404).json({ error })) // promise si c'est erreur
  });

  app.get('/api/products/:id', (req, res, next) => { // a cette route faire la requete
    Product.findOne({ _id: req.params.id }) //FindOne permet de retrouvé 1 seul objet grace a son id
      .then(product => res.status(200).json({product: product}))// promise ok
      .catch(error => res.status(404).json({ error }));// promise erreur
  });

  app.put('/api/products/:id', (req, res, next) => { //modifier un element d'un seul objet
    Product.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Modified!'})) // resultat bon status 200 et enrevoie la reponse json
      .catch(error => res.status(400).json({ error }));// resultat pas bon status 400 (erreur) 
  });

  app.delete('/api/products/:id', (req, res, next) => {// supprime un seul element dans la bdd
    Product.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Deleted!'}))
      .catch(error => res.status(400).json({ error }));
  });

  app.get('/api/products', (req, res, next) => {
// trouve tout la liste
    Product.find()
      .then(product => res.status(200).json({products: product}))// renvoie dans un tableau un autre tableau pour nom products
      .catch(error => res.status(400).json({ error }));
      //console.log(Product);
  });



  
module.exports = app; // export le module app.js