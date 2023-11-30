const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 4500;

mongoose.connect('')

mongoose.connect('mongodb+srv://jatinsahijwanidev:Jatin1234@cluster0.iu2oqjw.mongodb.net/?retryWrites=true&w=majority');

const userSchema = new mongoose.Schema({
    username: {type: String},
    gmail: {type: String},
    password: {type: String}
});

const formSchema = new mongoose.Schema({
    name : String,
    age: Number,
    gender: String,
    physics: Number,
    chemistry: Number,
    economy: Number,
    psychology: Number,
    maths: Number,
    business: Number,
    politics: Number,
    sports: Number,
    path: String
})

const User = mongoose.model('User_EDU',userSchema);
const Form = mongoose.model('Form',formSchema)

app.post('/register',async(req,res) => {
    const username = req.body.username;
    const gmail = req.body.gmail;
    const password = req.body.password;
    let existingUser = await User.findOne({username});
    if(existingUser) 
    {
        return res.json({
            message: "Username already exists"
        });
    }
    existingUser = await User.findOne({gmail});
    if(existingUser) 
    {
        return res.json({
            message: "gmail already exists"
        });
    }
    const json = {username,gmail,password};
    const newUser = new User(json);
    await newUser.save();
    const token = jwt.sign(json,secret);
    return res.json({
        message: "Registration successful",
        token: token
    });
});



app.post('/login',async(req,res)=> {
    const username = req.body.username;
    const password = req.body.password;
    let existingUser = await User.findOne({username});
    if(!existingUser) return res.json({
        message: "User not found"
    })
    if(password !== existingUser.password)
    {
        return res.json({message: "Password incorrect"});
    }
    let json = {
        username: username,
        password: password,
        gmail: existingUser.gmail
    }
    const token = jwt.sign(json,secret);
    return res.json({
        message: "Registration successful",
      token: token
    });
})

app.post('/form',async(req,res)=> {
    const {name,age,gender,physics,chemistry,economy,psychology,maths,business,politics,sports,path} = req.body;
    const json = {name,age,gender,physics,chemistry,economy,psychology,maths,business,politics,sports,path}
    const newForm = new Form(json);
    await newForm.save();
});

app.post('/getAnalytics',async (req,res)=> {
    const name = req.body.name;
    let existingForm = await Form.findOne({name});
    if(!existingForm)
    {
        return res.json({
            message: "There are no analytics for this username"
        })
    }
    else
    {
        return res.json(existingForm);
    }
});

app.listen(port,()=> {
    console.log(`Listening at port number ${port}`);
})