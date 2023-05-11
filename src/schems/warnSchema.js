const { model, Schema } = require('mongoose')
 
let warnSchema = new Schema({
    GuildID: String,
    UserID: String,
    Warns: Array
})
 
module.exports = model('warnSchema', warnSchema)