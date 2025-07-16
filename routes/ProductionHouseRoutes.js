const express = require('express');
const bcrypt  = require('bcrypt');
const ProductionHouse = require('../models/ProductionHouseModel');
const jwt = require('jsonwebtoken');
const router = express.Router();




//get specific User
router.get('/:ProductionHouseId',async(req,res)=>{
  const productionHouse = await ProductionHouse.findById(req.params.ProductionHouseId)

  if (!ProductionHouse) {
    console.log("ProductionHouse not found!");
    return res.status(404).json({ message: "ProductionHouse not found" });
  }
  res.json(productionHouse);

})

//get All student
router.get('/getall',async(req,res)=>{
    try {
        const users = await User.find();
        res.status(200).json(users); 
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' }); 
      }
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

    // Find user
    const user = await ProductionHouse.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials!' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials!' });
    }

    // Create JWT Token
    const token = jwt.sign(
  { userId: user._id},  // <== `userId` here
  process.env.JWT_SECRET,
  { expiresIn: '2h' }
);


    res.status(200).json({
      token,
      ProductionHouse : {
        id: user._id,
        name: user.username,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// router.put('/update-profile/:userId', async (req, res) => {
//   const { userId } = req.params;
//   const { name, email, password } = req.body;

//   try {
//     const updatedData = {};
//     if (name) updatedData.name = name;
//     if (email) updatedData.email = email;
//     if (password) updatedData.password = password;

//     const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });
    
//     if (!updatedUser) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
//   } catch (error) {
//     res.status(500).json({ error: 'Error updating profile' });
//   }
// });


module.exports = router;
