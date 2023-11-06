const rabbit = require('../queue/queue');
const conexion = require('../conection/conectionmongo');
const Marca = require('../conection/MaarcaModel');
const Producto = require('../conection/productoModel');

exports.comboMarcas = async (req,res) => {
    try{
        const marcas = await Marca.find();

        res.render('registerProduct',{marcas});
    }catch(err){
        console.log('Error: ' + err.message);
    }

}

exports.comboMarcas2 = async (req,res) => {
    try{
        const marcas = await Marca.find();

        res.render('registerProducts',{marcas});
    }catch(err){
        console.log('Error: ' + err.message);
    }

}

exports.registrarProducto = (req,res) => {
    try{
        const {nombre,idmarca} = req.body;
        rabbit.enviarRMQ(JSON.stringify({tipo:'producto',nombre:nombre,idmarca:idmarca}));
        //const nuevoProducto = new Producto({nombre,idmarca});
        //await nuevoProducto.save();

        res.redirect('/allProducts')
    }catch(err){
        console.log('Error: ' + err.message)
    }
}

exports.registrarProductos = (req,res) => {
    try{
        const {nombre,idmarca, numero} = req.body;
        for(let i = 0; i < numero; i++){
            let nuevoNombre = nombre;
            nuevoNombre += '_' + i;
            
            rabbit.enviarRMQ(JSON.stringify({tipo:'producto',nombre:nuevoNombre,idmarca:idmarca}));
            
            //const nuevoProducto = new Producto({nombre: nuevoNombre,idmarca});
            //await nuevoProducto.save();
        }

        res.redirect('/allProducts')
    }catch(err){
        console.log('Error: ' + err.message)
    }
}

exports.registrarDeCola = async (message) =>{
    const jsonMessage = JSON.parse(message);
        const nuevoProducto = new Producto({nombre: jsonMessage.nombre,idmarca:jsonMessage.idmarca});
        await nuevoProducto.save();
};

exports.listarProductos = async (req,res) => {
    try{
        const productos = await Producto.find().populate('idmarca');

        res.render('listProducts',{productos});
    }catch(err){
        console.log('Error: ' + err.message);
    }
}

exports.obtenerProducto = async (req,res) =>{
    try{
        const producto = await Producto.findById(req.params._id).populate('idmarca');
        const marcas = await Marca.find();
        res.render('updateProducto',{producto,marcas});
    }catch(err){
        console.log('Error: ' + err.message);
    }
}

exports.modificarProducto = async (req,res) => {
    try{
        const productoId = req.body.codigo;
        const nombre = req.body.nombre;
        const idmarca = req.body.idmarca;
        await Producto.findByIdAndUpdate(productoId,{nombre:nombre,idmarca:idmarca});
        console.log(productoId,nombre,idmarca);
        res.redirect('/allProducts');

    }catch(err){
        console.log('Error: ' + err.message);
    }
}

exports.eliminarProducto = async (req,res) => {
    try{
        await Producto.findByIdAndRemove(req.params._id);
        res.redirect('/allProducts')

    }catch(err){
        console.log('Error: ' + err.message);
    }
}