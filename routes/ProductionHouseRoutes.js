const express = require('express');
const bcrypt  = require('bcrypt');
const ProductionHouse = require('../models/ProductionHouseModel');
const jwt = require('jsonwebtoken');
const router = express.Router();




//get specific ProductionHouse
router.get('/:ProductionHouseId',async(req,res)=>{
  const productionHouse = await ProductionHouse.findById(req.params.ProductionHouseId)

  if (!ProductionHouse) {
    console.log("ProductionHouse not found!");
    return res.status(404).json({ message: "ProductionHouse not found" });
  }
  res.json(productionHouse);

})


// Register route
router.post('/register', async (req, res) => {
  const { productionHouseName, username, password} = req.body;
  
  try {
    const existingProductionHouse = await ProductionHouse.findOne({ username });
    if (existingProductionHouse) {
      return res.status(400).json({ message: 'ProductionHouse already exists!' });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const productionHouse = new ProductionHouse({
        productionHouseName,
        username,
        password: hashedPassword,

    });

    await productionHouse.save();
    res.status(201).json({ message: 'ProductionHouse registered successfully' });

  } catch (error) {
    res.status(400).json({ error: 'Error registering ProductionHouse' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find production
    const production = await ProductionHouse.findOne({ username });
    if (!production) {
      return res.status(400).json({ message: 'Invalid credentials!' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, production.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials!' });
    }

    // Create JWT Token
    const token = jwt.sign(
        { productionId: production._id},  // <== `userId` here
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
    );


    res.status(200).json({
      token,
      ProductionHouse : {
        id: production._id,
        name: production.username,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


module.exports = router;
