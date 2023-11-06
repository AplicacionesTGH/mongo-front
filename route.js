const express = require('express');
const router = express.Router();

const conexion=require('./conection/conectionmongo');

//RUTA PARA QUE ME MUESTRE LA VENTANA PRINCIPAL
router.get('/',(req,res)=>{
    res.render('index')
});

// router.get('/allProducts',(req,res)=>{
//     res.render('listProducts');
// })

// router.get('/register/product',(req,res)=>{
//     res.render('registerProduct')
// })

router.get('/register/marca',(req,res) => {
    res.render('registerMarca')
})


//MANEJAR CRUD MARCAS
const marcaController = require('./Controller/MarcaController');
router.get('/allMarcas',marcaController.listarMarcas);
router.post('/createMarca', marcaController.createMarca);
router.get('/editMarca/:_id', marcaController.obtenerMarca);
router.post('/updateMarca',marcaController.UpdateMarca);
router.get('/deleteMarca/:_id',marcaController.deleteMarca);


const productoController = require('./Controller/ProductoController');
router.get('/allProducts',productoController.listarProductos);
router.get('/register/product', productoController.comboMarcas);
router.get('/register/products', productoController.comboMarcas2);
router.post('/saveProduct',productoController.registrarProducto);
router.post('/saveProducts',productoController.registrarProductos);
router.get('/editProduct/:_id',productoController.obtenerProducto);
router.post('/updateProducto',productoController.modificarProducto);
router.get('/deleteProducto/:_id',productoController.eliminarProducto);
module.exports=router;  