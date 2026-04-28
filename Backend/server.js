


const express = require('express')
const mongoose =  require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const app = express()
const authModel = require('./models/authModel')

// =========== Middleware ============
app.use(express.json())
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://user-authentication-indol-three.vercel.app/"
  ],
  credentials: true
}));


// =========== DataBase Conection ============
mongoose.connect("mongodb://localhost:27017/userauth")
.then(() => console.log("conencted"))
.catch(err => console.log(err))


// =========== Signup/Add user ============
app.post('/signup', async(req,res) =>{
try{
    const {name,email,password} = req.body
    const hashpassword = await bcrypt.hash(password,10)
    const user = await authModel.create({
        name,
        email,
        password:hashpassword
    })
    if (user) {
     return  res.json(user)
    }
    
}
catch(err){
    res.status(500).json({error:err})
}
})


// =========== Login user ============
app.post('/login', async(req,res) =>{
try{
  const {email,password} = req.body
  const user = await authModel.findOne({email})
    if (!user) {
    return  res.status(404).json({msg:"user not found"})
  }
  const isMatch = await bcrypt.compare(password,user.password)
   if (!isMatch) {
     res.status(401).json({msg:"password incorrect"})
  }
    const token = jwt.sign(
        {id:user._id},
        "SECRET KEY",
        {expiresIn:"1d"}

    )
    return res.status(200).json({
        token:token,
        msg:"Login succesfull"
    })

}
catch(err){
    res.status(500).json({error:err})
}
})


// =========== Update /Replace user ============
app.put('/signup/:id', async(req,res) =>{
try{
    const {name,email,password} = req.body
    let updatePassword = {name,email}
    if (password) {
         const hashpassword = await bcrypt.hash(password,10)
         updatePassword.password = hashpassword
    }
    const user = await authModel.findByIdAndUpdate(
        req.params.id,
        updatePassword,
        {new:true}
    ).select("-password")
    if (!user) {
    res.status(404).json({msg:"user not found"})
    }
     return  res.json({
        msg:"user updated",
        user
     })
    
}
catch(err){
    res.status(500).json({error:err})
}
})

// =========== Delete /Delete user ============
app.delete('/signup/:id', async(req,res) =>{
try{
  
    const user = await authModel.findByIdAndDelete(req.params.id)
    if (!user) {
    res.status(404).json({msg:"user not found"})
    }
     return  res.json({
        msg:"user Deleted",
     })
    
}
catch(err){
    res.status(500).json({error:err})
}
})

// =========== Server Connection ============
app.listen(4000, (req,res) =>{
    console.log("server are running")
})
