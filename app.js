//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use("/public",express.static("public"));

mongoose.connect("mongodb://localhost:27017/cusersDb",{useNewUrlParser: true});

const formSchema = {
    Name : String,
    Rno : String,
    Email : String
};

const cUser = mongoose.model("Cuser",formSchema);

app.get("/",(req,res)=>{
    res.render("home");
});

app.get("/jobs",(req,res)=>{
    res.render("jobs");
})

app.post("/jobs",(req,res)=>{
    const fname = req.body.name;
    const frno = req.body.rno;
    const email = req.body.email;
    const key = req.body.key;
    console.log(key)
    if(key==="true"){

        const user = new cUser({
            Name : fname,
            Rno : frno,
            Email : email
        });
        user.save();
   
    res.redirect("https://www.codechef.com/problems/school/?itm_medium=navmenu&itm_campaign=problems");
    }
    else{
        res.redirect('/Jobs');
    }
});

app.listen(process.env.PORT || 3000, function() {
    console.log("Server started on port 3000");
  });