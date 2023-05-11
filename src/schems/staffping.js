const { model, Schema } = require("mongoose");

let pingStaff = new Schema({
    Guild: String,
    RoleID: String,
    RoleName: String
})

module.exports = model("pingstaff", pingStaff)