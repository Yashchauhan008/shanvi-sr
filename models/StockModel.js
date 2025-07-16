const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    patiya: {
        type: String,
        required: true,
    },
    pati_role:{
        type:String,
        required:true,
    },
    filem_blue:{
        type:String,
        required:true,
    },
    filem_white:{
        type:String,
        required:true,
    },
    chapla:{
        type:String,
        required:true,
    },
    tep_role:{
        type:String,
        required:true,
    },
    cap:{
        type:String,
        required:true,
    },
    farm_sheet:{
        type:String,
        required:true,
    },
    tharmocol:{
        type:String,
        required:true,
    },
    
    
},{
   timestamps:true 
})


module.exports = mongoose.models.Stock || mongoose.model("Stock", stockSchema);
