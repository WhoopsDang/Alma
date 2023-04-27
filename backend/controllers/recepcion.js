const db = require("../db")

//get all
async function findAll(req, res){
    try{
        const results = await db.query("select * from recepcion")
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data:{
                patients: results.rows
            }
        
    })
    }catch(err){
        console.log(err)
    }

}

//get one
async function findOne(req, res){
        
    try{
        const result = await db.query("select * from recepcion where id = $1", [req.params.id])
        res.status(200).json({
            status: "success",
            data:{
                patient: result.rows[0]
            }
            
        })
    }catch(err){
        console.log(err)
    }
}

//find active patients
async function findActive(req, res){
    try{
        const results = await db.query("select * from recepcion where estado = 'A' order by id")
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data:{
                patients: results.rows
            }
        
    })
    }catch(err){
        console.log(err)
    }
}

//create one

async function createRecepcion (req, res){
    var script = "INSERT INTO public.paciente_personal(nombre, estado) VALUES ($1, $2) returning *"
    var variables = [req.body.nombre, req.body.estado]

    try{
        const results = await db.query(script, variables)
        res.status(201).json({
            status: "success",
            data:{
                data: results.rows[0]
            }
        
    })
    }catch(err){
        console.log(err)
    }
    
}

//update patient
async function updateRecepcion(req, res){
    const script = "UPDATE public.recepcion SET nombre=$1, estado=$2 returning *"
    const variables = [req.body.nombre, req.body.estado]

    try{
        const results = await db.query(script, variables)
        res.status(200).json({
            status: "success",
            data:{
                patient: results.rows[0]
            }
            
        })
    }catch(err){
        console.log(err)
    }

}



//delete patient
async function deleteRecepcion (req, res){
    try{
        results = await db.query("DELETE FROM public.recepcion WHERE id = $1 returning *;", [req.params.id])
        res.status(204).json({
            status: success,
            data:{
                result: results.rows[0]
            }
        })
    }catch(err){
        console.log(err)
    }
}

//get Nextval
async function nextVal(req, res){

}

module.exports = {findAll, findOne, findActive, createRecepcion, updateRecepcion, deleteRecepcion}