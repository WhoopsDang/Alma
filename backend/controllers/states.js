const db = require("../db")


async function findActive (req, res){
    try{
        const results = await db.query("select * from paciente_estados where estado = 'A'")
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

//create module
async function createState(req, res){
    var script = "INSERT INTO public.paciente_estados(paciente_id, modulo_id) VALUES ($1, $2) returning *;"
    var variables = [req.query.pId, req.query.mId]
    console.log(req.query.pId)
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

//upate module
async function setInactive (req, res){
    const script = "UPDATE public.paciente_estados SET estado='I' WHERE id=$1 returning *;"
    const variables = [req.params.id]
    try{
        const results = await db.query(script, variables)
        res.status(200).json({
            status: "success",
            data:{
                state: results.rows[0]
            }
            
        })
    }catch(err){
        console.log(err)
    }

}

async function updateState(req, res){
    const script = "UPDATE public.paciente_estados SET paciente_id=$1, modulo_id=$2, estado = $3 returning *"
    const variables = [req.body.paciente_id, req.body.modulo_id, req.body.estado]

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



//delete state
async function deleteState (req, res){
    try{
        results = await db.query("DELETE FROM public.paciente_estado WHERE id = $1 returning *;", [req.params.id])
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

module.exports = {findActive, createState, setInactive, updateState, deleteState}