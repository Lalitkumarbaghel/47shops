const express = require("express");
const app = express();
const path = require("path");
const hbs = require('hbs');
const bcrypt = require("bcrypt");


// for db
require('./db/conn');
// modal
const Register = require('./models/Register');
// const { json } = require("express");
const port = process.env.PORT ||3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partial_path = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partial_path);
app.set('views', template_path);
app.set('view engine', 'hbs');
app.use(express.static(static_path));
// post data read
app.use(express.json());

// for db form data read 
app.use(express.urlencoded({extended: false}));

app.get("/", (req,res)=>{
    res.render("index");
});

app.get("/subscription-model", (req,res)=>{
    res.render("subscription-model");
});

app.get("/membership-plan", (req,res)=>{
    res.render('membership-plan');
});
app.get("/my-grocery-list", (req,res)=>{
    res.render("my-grocery-list");
});
app.get("/loyality-program", (req,res)=>{
    res.render('loyality-program');
});
app.get("/features", (req,res)=>{
    res.render('features');
});
app.get("/pricing-why", (req,res)=>{
    res.render('pricing-why');
});
app.get("/grocery-ecommerce-app", (req,res)=>{
    res.render('grocery-ecommerce-app');
});
app.get("/grocery-application-demo", (req,res)=>{
    res.render('grocery-application-demo');
});
app.get("/grocery-admin-panel", (req,res)=>{
    res.render('grocery-admin-panel');
});
app.get("/ecommerce-grocery-requirements", (req,res)=>{
    res.render('ecommerce-grocery-requirements');
});
app.get("/joinus", (req,res)=>{
    res.render('joinus');
});
app.get("/faq", (req,res)=>{
    res.render('faq');
});
app.get("/terms-condition", (req,res)=>{
    res.render('terms-condition');
});
app.get("/login", (req,res)=>{
    res.render('login');
});
app.get("/signup", (req,res)=>{
    res.render('signup');
});
app.get("/change-password", (req,res)=>{
    res.render('change-password');
});
app.get("/forgot-password", (req,res)=>{
    res.render('forgot-password');
});
app.get("/register", (req,res)=>{
    res.render('register');
});

// create a new user in out database
app.post("/register", async (req,res)=>{
    try{

        const registerEmployee = new Register({
            email : req.body.email,
            full_name :req.body.full_name,
            mobile :req.body.mobile,
            password :req.body.password
        }) 
      const registered =  await registerEmployee.save();
      res.status(201).render('index');

    }catch(err){
        res.status(400).send(err);
    }
});
// for login
app.post("/login", async (req,res)=>{
    try{
        const email = req.body.email;
        const pass = req.body.password;
        const useremail = await Register.findOne({email:email});
        const isMatch = await bcrypt.compare(pass, useremail.password);
        if(isMatch){
            res.status(201).render("index");
        }else{
            res.send("Invaild Login details");
        }

    }catch(err){
        res.status(400).send("Invaild Login details");
    }
});

app.get("*", (req,res)=>{
    res.status(404).render("404");
});

app.listen(port, (err)=>{
    console.log(`connection succe full ${port}`);
});