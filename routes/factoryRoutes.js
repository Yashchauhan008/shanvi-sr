const express = require('express');
const router = express.Router();
const factoryController = require('../controllers/factoryController');

router.post('/create', factoryController.createFactory);
router.get('/getAll', factoryController.getAllFactories);
router.put('/update/:id', factoryController.updateFactory);
router.delete('/delete/:id', factoryController.deleteFactory);

module.exports = router;
