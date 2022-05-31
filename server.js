var express=require('express');
var bodyParser=require('body-parser');
var app=express();
var cors = require('cors')
var http = require("http");
var server = http.createServer(app);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configurer la base de données
//const dbConfig = require('./Config/livraison.Config.js');
const mongoose = require('mongoose');
const { Server } = require('mongodb');
require("dotenv").config({ path: ".env" });

// declaration du dossier static
app.use(express.static('images'));


var loginRoutes=require("./routes/authentification")
app.use(cors({
    
    origin :"*"
    }));
app.use('/api/auth', loginRoutes);

mongoose.Promise = global.Promise;

require('./routes/client')(app);
require('./routes/responsable')(app);
require('./routes/livreur')(app);
require('./routes/livraison')(app);
require('./routes/facture')(app);
require('./routes/offer')(app);


mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true
    }).then(() => {
        console.log("Successfully connected to the database");
        }).catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
        });
    app.get('/', (req, res) =>{ 
        res.send("hello world");  
    });
    

    server.listen(process.env.PORT || 5000,()=>{console.log("Node server is running..")});
