const express = require('express')
const mongoose = require('mongoose');
const ProductionHouseRoute = require('./routes/ProductionHouseRoutes');
require('dotenv').config(); 
const app = express();
const cors = require('cors');




//configuration

app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;



mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Error connecting to MongoDB:', err));


// Sample route
app.get('/', (req, res) => {
    res.send('Welcome to Shanvi API');
});


app.use('/api/productionHouse',ProductionHouseRoute)


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});