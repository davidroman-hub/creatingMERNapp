const mooongose = require ('mongoose')

const userSchema = new mooongose.Schema({
    name:{
    type:String,
    require:true
 },
 email:{
    type:String,
    require:true,
    unique:true
 },
 password:{
    type:String,
    require:true
 },
})

module.exports = mooongose.model('user', userSchema,)