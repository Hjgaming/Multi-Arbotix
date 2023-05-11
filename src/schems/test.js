const {model, Schema} = require("mongoose");
 
let test = new Schema({
    Channel: String,
    Guild: String,
});
 
module.exports = model("test", test);