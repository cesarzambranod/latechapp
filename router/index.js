const {Router}=require ('express');
const router=Router();
const admin = require('firebase-admin');
var serviceAccount = require("../../latechfactory-firebase-adminsdk-slk9a-80d0065e3f.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    datebaseURL:'https://latechfactory.firebaseio.com/database/'
});
const db= admin.database();

router.get('/',(req,res)=> {
    db.ref(producto).once('value', (snapshot)=>{
        const data= snapshot.val()
        res.render('index', {producto:data});
    })

});

router.post('/nuevo-producto', (req,res)=>{
    const nuevoProducto={
        nombreProducto:req.body.nombreProducto,
        precioProducto:req.body.precioProducto
    }
    db.ref(producto).push(nuevoProducto)
    res.redirect('/');
});

router.put('/actualizar-producto/:id',(req,res)=>{
    const nuevoProducto={
        nombreProducto:req.body.nombreProducto,
        precioProducto:req.body.precioProducto
    }
    db.ref('producto/'+ req.params.id).update;
    res.redirect('/');
})

router.get('/borrar-producto/:id',(res,req)=>{
db.ref('producto/'+ req.params.id).remove;
res.redirect('/');
})


module.exports=router;