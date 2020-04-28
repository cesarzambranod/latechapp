const {Router}=require ('express');
const router=Router();
const admin = require('firebase-admin');
var estado=false;
var serviceAccount = require("../../latechfactory-firebase-adminsdk-slk9a-80d0065e3f.json");
const app = expres();

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    datebaseURL:'https://latechfactory.firebaseio.com/database/'
}), (err=>{
    if (err) res.status(403).send({message:`No posee autentificacion ${err}`})
    res.status(500).send({message:`Autentificacion exitosa`})
    estado=true;
});

const db= admin.database();
router.get('/',(req,res)=> {
    db.ref(producto).once('value', (snapshot)=>{
        const data= snapshot.val()
        res.status(200).render('index', {producto:data});
    })

});
if (estado=true){router.post('/nuevo-producto', (req,res)=>{
    const nuevoProducto={
        nombreProducto:req.body.nombreProducto,
        precioProducto:req.body.precioProducto
    }
    db.ref(producto).push(nuevoProducto)
    res.status(200).redirect('/');
});

router.put('/actualizar-producto/:id',(req,res)=>{
    const nuevoProducto={
        nombreProducto:req.body.nombreProducto,
        precioProducto:req.body.precioProducto
    }
    db.ref('producto/'+ req.params.id).update;
    res.status(200).redirect('/');
})

router.delete('/borrar-producto/:id',(res,req)=>{
db.ref('producto/'+ req.params.id).remove;
res.status(200).redirect('/');
})
}




module.exports=router;