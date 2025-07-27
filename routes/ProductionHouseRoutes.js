const express = require('express');

const  productionHouseContoller= require('../controllers/productionHouseController');
const router = express.Router();



// Register route
router.post('/register', productionHouseContoller.registerNewProductionHouse);
//login Route
router.post('/login', productionHouseContoller.login);
//get specific ProductionHouse
router.get('/:ProductionHouseId',productionHouseContoller.getProductionHouseByID)



module.exports = router;
