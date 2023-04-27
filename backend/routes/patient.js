const express = require('express');
const router = express.Router();
const PatientController = require('../controllers/patient');

//get all patients
router.get('/', PatientController.findAll)

//get active
router.get('/active', PatientController.findActive)

//get active with modules
router.get('/activeColor', PatientController.findActiveWithModulos) 

//get one patient
router.get('/:id', PatientController.findOne)

//create patient
router.post('/', PatientController.createPatient)

//update patient
router.put('/', PatientController.updatePatient)

//delete patient
router.delete('/', PatientController.deletePatient)


module.exports = router;