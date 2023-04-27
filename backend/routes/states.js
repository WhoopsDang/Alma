const express = require('express');
const router = express.Router();
const StatesController = require('../controllers/states');

//Find active states
router.get('/', StatesController.findActive)

//Create new state
router.post('/', StatesController.createState)

//Set state Inactive
router.put('/inactive/:id',StatesController.setInactive )

module.exports = router;