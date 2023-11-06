const amqp = require('amqplib/callback_api');
const productoController = require('../Controller/ProductoController');
const marcaController = require('../Controller/MarcaController');

let connected = false;

const enviarMensaje = (message) => {
    return new Promise((resolve, reject) =>{
        if(!connected){
            reject('Conexion no establecida');
            return;
        }
        amqp.connect("amqp://rabbitmq", function (err, connection) {
            if (err) {
                console.log('Conexión fallida al enviar mensaje');
                console.log(err);
                connected = false;
                reconnect();
            } else{
                connection.createChannel(function (err, channel) {
                    if (err){
                        console.log('Fallo al abrir canal');
                        console.log(err);
                        reconnect();
                    }
    
                    let queue = "MongoQueue";
                    channel.assertQueue(queue, {
                        durable: true,
                    });
                    channel.sendToQueue(queue, Buffer.from(message), {
                        persistent:true,
                    });
                    console.log("Enviado a cola: "+ message);
                    resolve(message);
                });
                setTimeout(function(){
                    connection.close();
                }, 500);
            }
        });
    });
}

exports.enviarRMQ = async (message) =>{
    await enviarMensaje(message);
}

const registrarObjeto = (tipo, message) =>{
    switch(tipo){
        case "producto":
            productoController.registrarDeCola(message);
            break;
        case "marca":
            marcaController.registrarDeCola(message);
            break;
    }
}

const reconnect = ()=>{
    var reconnectTimeout = 5000;
    console.log('Reconectando en: '+(reconnectTimeout/1000)+'s');
    setTimeout(function(){
            console.log('Intentando reconexión ...');
            recibirMensaje();
    }, reconnectTimeout);
}


const recibirMensaje = () => {
    return new Promise((resolve, reject) =>{
        amqp.connect("amqp://rabbitmq", function (err, connection) {
            if (err) {
                console.log('Conexión fallida al recibir mensaje');
                console.log(err);
                reconnect();
            } else{
                connection.createChannel(function (err, channel) {
                    if (err) reject(err);

                    let queueName = "MongoQueue";
                    channel.assertQueue(queueName, {
                        durable: true,
                    });
                    connected = true;
                    channel.prefetch(1);
                    console.log("Esperando mensaje en: "+ queueName);
                    channel.consume(queueName, function (msg){
                        let strMessage = msg.content.toString()
                        console.log("Recibido mensaje: " + strMessage);
                        registrarObjeto(JSON.parse(strMessage).tipo, strMessage);
                        resolve.msg;
                        channel.ack(msg);
                    })
                });
                
            }
        });
    });
}

recibirRMQ = async ()=>{
    const response = await recibirMensaje();
}

recibirRMQ();