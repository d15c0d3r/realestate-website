const express = require("express")
const cors = require("cors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const User = require("./models/user")
const Land = require("./models/land")

//consts
const saltRounds = 10
const secret_code = "XyF3456"

//server
const app = express()
app.listen(5000,()=>console.log("server connected"))     

app.use(cors())

//middleware
app.use(express.json())     

//database
mongoose.connect("mongodb+srv://root:12345@jwt-project.cbobu.mongodb.net/database_?retryWrites=true&w=majority", 
{useNewUrlParser : true, useUnifiedTopology : true})
    .then(result=> console.log("database conencted"))
    .catch(err=>console.log(err))


//JWT's
const createToken = (id)=>{
    return jwt.sign({id},secret_code,{expiresIn : 3*24*60*60})
}

const checkToken = (token)=> {
    console.log("checking token")
    const data = jwt.verify(token,secret_code,(err,data)=>{
        if(err){
            console.log("error is here")
            console.log(err)
        }else{
            console.log(data)
            return data
        }
    })
    return data
}

//routes
app.post("/signup",async (req,res)=>{
    const {name,email,password,phone} = req.body
    try{
        // checking if the user already exists
        const [_checkemail] = await User.find({email})
        console.log(_checkemail)
        if(_checkemail){
            res.status(200).send("user exists")
        }
        else{
            //if not, then creating a new user 
            const user = await User.create(req.body)
            const token = createToken(user._id)
            res.status(200).json({token : token,email : user.email})
        }
    }catch{err=> console.log(err); res.status(400).json({error: err})}
    
})

app.post("/login", async(req,res)=> {
    const  {email,password} = req.body
    console.log(req.body)
    //checking if password is correct or not
    const user = await User.findOne({email})
    console.log(user)
    if(user){
        const auth = await bcrypt.compare(password,user.password)
        if(auth){
            const token = createToken(user._id)
            res.status(200).json({token: token,email : user.email})
        }else{
            res.status(200).send("incorrect password")
        }
    }else{
        res.status(200).send("user doesnt exist")
    }
     
})

app.post("/isTokenValid", async(req,res)=>{
    const {token} = req.body
    console.log(token)
    if(token){
        const data = checkToken(token)
        console.log(data.id)
        const user = await User.findById(data.id)
        console.log(user)
        console.log(user.email)
        if(user){
            res.status(200).json({email : user.email,exists : true})
        }else{
            res.status(200).json({exists : false})
        }
    }else{
        res.status(200).json({exists : false})
    }
})

app.post("/sell",async(req,res)=>{
    console.log(req.body)
    const land = await Land.create(req.body)
    if(land){
        res.json({land, created : true})
    }else{
        res.json({created : false})
    }
})

app.get("/buy/:id",async(req,res)=>{
    const pin = req.params.id
    let data = await Land.find({pin: pin})
    if(data){
        res.status(200).json(data)
    }else{
        res.status(200).send("no data")
    }
})

app.post("/myuploads", async(req,res)=>{
    console.log("request data for myuploads",req.body)
    const data = await Land.find(req.body)
    if(data){
        res.status(200).json(data)
    }else{
        res.status(200).send("no data")
    }
})

