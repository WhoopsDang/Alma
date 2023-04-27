const db = require("../db")

//get all
async function findAll(req, res){
    try{
        const results = await db.query("select * from paciente_personal")
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
        const result = await db.query("select * from paciente_personal where id = $1", [req.params.id])
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
        const results = await db.query("select * from paciente_personal inner join paciente_estados on paciente_personal.id=paciente_estados.paciente_id where paciente_estados.estado = 'A' order by paciente_id")
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

//find active patients
async function findActiveWithModulos(req, res){
    try{
        const results = await db.query("select * from paciente_personal inner join paciente_estados on paciente_personal.id=paciente_estados.paciente_id inner join modulos on paciente_estados.modulo_id = modulos.id where paciente_estados.estado = 'A' order by paciente_id")
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

async function createPatient (req, res){
    var script = "INSERT INTO public.paciente_personal(nombre, apellidos, edad, sexo, estado_civil, religion, ocupacion, direccion, ciudad, peso, talla, tension_arterial, f_cardiaca, f_respiratoria, temperatura, alergias, app, motivo, notas_extras) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19) returning *"
    var variables = [req.body.nombre, req.body.apellidos, req.body.edad, req.body.sexo, req.body.estado_civil, req.body.religion, req.body.ocupacion, req.body.direccion, req.body.ciudad, req.body.peso, req.body.talla, req.body.tension_arterial, req.body.f_cardiaca, req.body.f_respiratoria, req.body.temperatura, req.body.alergias, req.body.app, req.body.motivo, req.body.notas_extras]

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
async function updatePatient(req, res){
    const script = "UPDATE public.paciente_personal SET nombre=$1, apellidos=$2, edad=$3, sexo=$4, estado_civil=$5, religion=$6, ocupacion=$7, direccion=$8, ciudad=$9, peso=$10, talla=$11, tension_arterial=$12, f_cardiaca=$13, f_respiratoria=$14, temperatura=$15, alergias=$16, app=$17, motivo=$18, notas_extras=$19 WHERE id=$20 returning *"
    const variables = [req.body.nombre, req.body.apellidos, req.body.edad, req.body.sexo, req.body.estado_civil, req.body.religion, req.body.ocupacion, req.body.direccion, req.body.ciudad, req.body.peso, req.body.talla, req.body.tension_arterial, req.body.f_cardiaca, req.body.f_respiratoria, req.body.temperatura, req.body.alergias, req.body.app, req.body.motivo, req.body.notas_extras, req.params.id]

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
async function deletePatient (req, res){
    try{
        results = await db.query("DELETE FROM public.paciente_personal WHERE id = $1 returning *;", [req.params.id])
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

module.exports = {findAll, findOne, findActive, findActiveWithModulos, createPatient, updatePatient, deletePatient}