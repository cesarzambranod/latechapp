const {Router}=require ('express');
var admin = require("firebase-admin");
const router=Router();
const serviceAccount = require("../../latechfactory-firebase-adminsdk-slk9a-80d0065e3f.json");
estado=false;
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://latechfactory.firebaseio.com"
}), (err=>{
    if (err) res.status(403).send({message:`No posee autentificacion ${err}`})
    res.status(500).send({message:`Autentificacion exitosa`})
    estado=true;
});


const db= admin.database();

router.get('/',(req,res)=> {
    db.ref('producto').once('value', (snapshot)=>{
        const data= snapshot.val();
        console.log(data);
        res.send(data);
        //res.render('index', {producto:data});
    })

});
if (estado=true){
router.post('/nuevo-producto', (req,res)=>{
        const nuevoProducto={
        /*nombreProducto:"cerdo",
        precioProducto:"450"*/
        nombreProducto:req.body.nombreProducto,
        precioProducto:req.body.precioProducto
    };
    console.log(nuevoProducto);
    db.ref('producto').push(nuevoProducto)
    res.redirect('/');
});

router.put('/actualizar-producto/:id',(req,res)=>{
    const nuevoProducto={
        /*nombreProducto:"cerdo",
        precioProducto:"550"*/
        nombreProducto:req.body.nombreProducto,
        precioProducto:req.body.precioProducto
    }
    db.ref('producto/'+ req.params.id).update;
    res.redirect('/');
})

router.delete('/borrar-producto/:id',(res,req)=>{
db.ref('producto/'+ req.params.id).remove;
res.redirect('/');
});
}
module.exports=router;