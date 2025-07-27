const bcrypt  = require('bcrypt');
const ProductionHouse = require('../models/ProductionHouseModel');
const jwt = require('jsonwebtoken');
const Stock = require('../models/StockModel');





exports.registerNewProductionHouse =  async (req, res) => {
  const { productionHouseName, username, password, email } = req.body;

  try {
    // 1️⃣ Check for existing username
    const existing = await ProductionHouse.findOne({ username });
    if (existing) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // 2️⃣ Create a new Stock (all fields default to 0)
    const stock = new Stock({});
    await stock.save();

    // 3️⃣ Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // 4️⃣ Create the ProductionHouse, linking to stock._id
    const productionHouse = new ProductionHouse({
      email,
      productionHouseName,
      username,
      password: hashedPassword,
      stock_id: stock._id
    });
    await productionHouse.save();

    // 5️⃣ Respond with the new IDs
    res.status(201).json({
      message: 'ProductionHouse registered successfully',
      productionHouse: {
        _id: productionHouse._id,
        stock_id: stock._id,
      }
    });

  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ error: 'Server error during registration' });
  }
};


exports.login = async (req, res) => {
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
        stock_id: production.stock_id,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
} 

exports.getProductionHouseByID = async(req,res)=>{
  const productionHouse = await ProductionHouse.findById(req.params.ProductionHouseId)

  if (!ProductionHouse) {
    console.log("ProductionHouse not found!");
    return res.status(404).json({ message: "ProductionHouse not found" });
  }
  res.json(productionHouse);

};