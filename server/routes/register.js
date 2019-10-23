const router = require ('express').Router()
const {check, validationResult} = require ('express-validator')
const bcrypt = require('bcrypt') 
const jwt = require('jsonwebtoken')


//user model

const User = require('../models/UserSquema')

// @route POST /register
// @des Register a new user
// @access Public

router.post('/',
[
    
    check('name', 'please provide a name').not().isEmpty(),
    check('email', 'please provide a validate Email').isEmail(),
    check ('password', 'please provide 6 characters long password').isLength({min:6})
],
async (req, res)=>{
   /* res.send('user registered')  <= solo es para testear */
   //crearemos el validador:
   const errors = validationResult(req)
   if(!errors.isEmpty()){
       return res.status(400).json({error: errors.array() })
   }
   //res.send('success')
   
   const {name, email, password} = req.body
   try {

    //user alredy exists?
     let user = await User.findOne({email})
     if(user){
         return res.status(400).json({msg:'user already exists'})
     }  

     user = new User ({
         name,
         email,
         password
     })

     // password encryption

     const salt = await bcrypt.genSalt(10)
     user.password = await bcrypt.hash(password, salt)

     await user.save()
        
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