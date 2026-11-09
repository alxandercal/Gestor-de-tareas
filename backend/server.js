// Se importan los modulos
import express from 'express';
import cors from 'cors'; 

// se definen el puerto y se crea app , app es o que nos permite trabajar con los comandos de express
const app = express();
const PORT =3000;

//arreglo que guarda tareas
let tareas= [
    {id:1,titulo:"Tarea 1",descripcion:"prueba de datos locales para probar",completada:true},
    {id:2,titulo:"Tarea 2",descripcion:"prueba de datos locales para probar",completada:false}
]


let proximoId=3;


//middleware
app.use(express.json());
app.use(cors());

//rutas -> Peticiones


//aqui la respuesta del servidor a llamar raiz en localhost3000 el 3000 es el puerto que se definio arriba
app.get('/',(req,res) =>{
    res.send('Servidor funcionando')
});

app.get('/tareas',(req,res)=>{
    res.json(tareas)
})


app.post('/tareas',(req,res)=>{
    //obtiene el body
    const {titulo,descripcion}=req.body;
    
    if(!titulo || !descripcion){
        return res.status(400).json({error:'Hace falta uno de los datos'});
    }
    
    //crea la tarea
    const nuevaTarea={
        id:proximoId,
        titulo:titulo,
        descripcion:descripcion,
        completada:false
    };
    proximoId++;
    tareas.push(nuevaTarea);
    res.status(201).json(nuevaTarea)
});

app.put('/tareas/:id',(req,res)=>{
    const id =parseInt(req.params.id);
    const tarea= tareas.find(t=>t.id ===id);
    //si  no existe
    if(!tarea){
        return res.status(404).json({error:'No existe una tarea con ese id'})
    }


    if(req.body.titulo !== undefined){
        tarea.titulo=req.body.titulo;
    }
    if(req.body.descripcion !== undefined){
        tarea.descripcion=req.body.descripcion;
    }
    if(req.body.completada !== undefined){
        tarea.completada=req.body.completada;
    }
    
    res.status(200).json({ message: 'Tarea actualizada', tarea });
});

app.delete('/tareas/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    const index=tareas.findIndex(t=>t.id ===id);


    if(index === -1){
        return res.status(404).json({error:'No existe una tarea con ese id'})
    }
    tareas.splice(index,1);
    res.status(200).json({message:'recurso eliminadoexitosamente'})

})





//Aqui se enciende el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});