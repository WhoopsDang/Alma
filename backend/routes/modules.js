const express = require('express');
const router = express.Router();
const ModuleController = require('../controllers/modules');

//get all patients
router.get('/', ModuleController.findAll)

//find Active modules
router.get('/active', ModuleController.findActive)


module.exports = router;