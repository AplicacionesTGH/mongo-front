const rabbit = require('../queue/queue');
const conexion = require('../conection/conectionmongo');
const Marca = require('../conection/MaarcaModel');

exports.createMarca = async (req,res) => {
    try{
        const {nombre} = req.body;

        rabbit.enviarRMQ(JSON.stringify({tipo:'marca',nombre:nombre}));
        //const nuevaMarca = new Marca({nombre});
        //await nuevaMarca.save();

        res.redirect('/allMarcas')
    }catch(err){
        console.log('Error: ' + err.message)
    }
}

exports.registrarDeCola = async (message) =>{
    const jsonMessage = JSON.parse(message);
        const nuevaMarca = new Marca({nombre: jsonMessage.nombre});
        await nuevaMarca.save();
};

exports.listarMarcas = async (req,res) => {
    try{
        const marcas = await Marca.find();

        res.render('listMarcas',{marcas});
    }catch(err){
        console.log('Error: ' + err.message);
    }

}

exports.obtenerMarca= async (req,res) => {
    try{
        const marca = await Marca.findById(req.params._id);
        res.render('updateMarca',{marca});
    }catch(err){
        console.log('Error: ' + err.message);
    }
}

exports.UpdateMarca = async (req,res) => {
    try{
        const marcaId = req.body.codigo;
        const nombre = req.body.nombre;
        await Marca.findByIdAndUpdate(marcaId,{nombre:nombre});
        res.redirect('/allMarcas');

    }catch(err){
        console.log('Error: ' + err.message);
    }
}

exports.deleteMarca = async (req,res) => {
    try{
        await Marca.findByIdAndRemove(req.params._id);
        res.redirect('/allMarcas')

    }catch(err){
        console.log('Error: ' + err.message);
    }
}