const db = require("../db")

//get all
async function findAll(req, res){
    try{
        const results = await db.query("select * from modulos")
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data:{
                modules: results.rows
            }
        
    })
    }catch(err){
        console.log(err)
    }

}

//get one
async function findOne(req, res){
        
    try{
        const result = await db.query("select * from modulos where id = $1", [req.params.id])
        res.status(200).json({
            status: "success",
            data:{
                modules: result.rows[0]
            }
            
        })
    }catch(err){
        console.log(err)
    }
}

//find active patients
async function findActive(req, res){
    try{
        const results = await db.query("select * from modulos where estado = 'A' order by id")
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data:{
                modules: results.rows
            }
        
    })
    }catch(err){
        console.log(err)
    }
}

//create one

async function createModulo (req, res){
    var script = "INSERT INTO public.modulos(nombre_modulo, estado, nombre_corto, color) VALUES ($1, $2, $3, $4) returning *"
    var variables = [req.body.nombre_modulo, req.body.estado, req.body.nombre_corto, req.body.color]

    try{
        const results = await db.query(script, variables)
        res.status(201).json({
            status: "success",
            data:{
                modules: results.rows[0]
            }
        
    })
    }catch(err){
        console.log(err)
    }
    
}

//update patient
async function updateModulos(req, res){
    const script = "UPDATE public.modulos SET nombre_modulo=$1, estado=$2, nombre_corto=$3, color=$4 returning *"
    const variables = [req.body.nombre_modulo, req.body.estado, req.body.nombre_corto, req.body.color]

    try{
        const results = await db.query(script, variables)
        res.status(200).json({
            status: "success",
            data:{
                modules: results.rows[0]
            }
            
        })
    }catch(err){
        console.log(err)
    }

}



//delete patient
async function deleteModulo (req, res){
    try{
        results = await db.query("DELETE FROM public.modulos WHERE id = $1 returning *;", [req.params.id])
        res.status(204).json({
            status: success,
            data:{
                modules: results.rows[0]
            }
        })
    }catch(err){
        console.log(err)
    }
}


module.exports = {findAll, findOne, findActive, updateModulos, createModulo, deleteModulo,}