require('dotenv').config()
const router = require ('express').Router()
const {check, validationResult} = require ('express-validator')
const bcrypt = require('bcrypt') 
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

//user model

const User = require('../models/UserSquema')


router.get('/', auth, async (req, res)=>{
try {
    const user = await User.findById(req.user.id).select("-password")
    res.json(user)
    } catch (err) {
    console.error(error.message)
    res.status(500).send('Server error')
    }
})

// @route POST /register
// @des Register a new user
// @access Public

router.post('/',
[
    check('email', 'please provide a validate Email').isEmail(),
    check ('password', 'please provide 6 characters long password').exists()
],
async (req, res)=>{
   /* res.send('user registered')  <= solo es para testear */
   //crearemos el validador:
   const errors = validationResult(req)
   if(!errors.isEmpty()){
       return res.status(400).json({error: errors.array() })
   }
   //res.send('success')
   
   const { email, password} = req.body
   try {

    //user alredy exists?
     let user = await User.findOne({email})
     if(!user){
         return res.status(400).json({msg:' Invalid credentials '})
     }  
     const match = await bcrypt.compare(password, user.password)
     if(!match){
        return res.status(400).json({msg:' Invalid credentials '})
     }

     //sign a jsonwebtoken

     const payload = {
         user:{
           id: user.id
         }
     }

     jwt.sign(payload, process.env.SECRET, {
         expiresIn:3600
     }, 
       (err, token)=> {
         if(err) throw err
         res.json({token})//aqui hay algo 
     }
     
)

     } catch (err) {
       console.error(err.message)
       res.status(500).send('Server Error')
   }
}) 

module.exports  = router