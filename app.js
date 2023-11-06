const mysql = require('mysql');
const express = require('express');
const path = require('path');
const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());


app.listen(3000,() =>{
    console.log('SERVER CORRIENDO EN http://localhost:3000');
})

//establecemos el motor de plantillas
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');


app.use('/',require('./route'));
const conexion = require('./conection/conectionmongo');

// [TEST] conectamos a la BD de RDS
const conn = mysql.createConnection({
    host    : "tghdatabase.c2ha0al1uqt8.us-east-2.rds.amazonaws.com",
    user    : "Admin",
    password: "j[OCU8`9bQqtrLLK$R86dMgla87Ws##y",
    port    : 3306
});

conn.connect(function (err){
    if(err){
        console.error('Fallo de conexión la RDS: ' + err.stack);
        return;
    }
    console.log('== Conexión exitosa a RDS ==');
    console.log('RDS host: ' + conn.config.host);

});
conn.end();
