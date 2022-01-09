const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shops_Registration', {
    useUnifiedTopology: true,    
    useNewUrlParser: true
}).then(()=>{
    console.log(`connection successful`)
}).catch((error)=>{
    console.log(error);
})