const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const employeeSchema = new mongoose.Schema({
    email :{
        type:String,
        unique: true,
        required:true
    },
    full_name :{
        type:String,
        required:true
    },
    mobile:{
        type: Number,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required:true
    }
})

employeeSchema.pre("save", async function(next){
    
    if(this.isModified("password")){
        // console.log(`the current password ${this.password}`);
        this.password = await bcrypt.hash(this.password, 10);
        // console.log(`the current password ${this.password}`);
    }
    
    next();

})
// now create collections
const Register = new mongoose.model("Resister", employeeSchema);
module.exports = Register;