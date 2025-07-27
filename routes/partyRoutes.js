const express = require('express');
const router = express.Router();
const partyController = require('../controllers/partyController');

//Create Party
router.post('/create', partyController.createParty);
//GetAll party
router.get('/getAll', partyController.getAllParties);
//Update Party
router.put('/update/:id', partyController.updateParty);
//Delete Party
router.delete('/delete/:id', partyController.deleteParty);


module.exports = router;
