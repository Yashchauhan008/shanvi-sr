const express = require('express')
const mongoose = require('mongoose');
const PartyRoute = require('./routes/partyRoutes');
const FactoryRoute = require('./routes/factoryRoutes');
const OrderRoute = require('./routes/orderRoutes');
const ProductionHouseRoute = require('./routes/ProductionHouseRoutes');

require('dotenv').config(); 
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

//configuration
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json());



mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Error connecting to MongoDB:', err));


// Sample route
app.get('/', (req, res) => {
    res.send('Welcome to Shanvi API');
});




app.use('/api/productionHouse',ProductionHouseRoute)
app.use('/api/party',PartyRoute)
app.use('/api/factory',FactoryRoute)
app.use('/api/order',OrderRoute)




//Main Server 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});