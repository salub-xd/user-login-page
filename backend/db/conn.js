const mongoose = require('mongoose');
const mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl,{
    useUnifiedTopology:true,
    UseNewUrlParser:true
}).then(()=>{
    console.log("MongoDb Backend conected successfully");
}).catch((err)=>{
    console.log(err);
})

module.exports = mongoose;