const mongoose = require('mongoose');

const productionHouseSchema = new mongoose.Schema({
    productionHouseName: {
        type: String,
        required: true,
    },
    username:{
        type:String,
        required:true,
    },
     email: {
        type: String,
        required:true,
        unique:true


    },
    password: {
        type: String,
        required:true 
    },
    stock_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stock',
    }
},{
   timestamps:true 
})


module.exports = mongoose.models.ProductionHouse || mongoose.model("ProductionHouse", productionHouseSchema);
