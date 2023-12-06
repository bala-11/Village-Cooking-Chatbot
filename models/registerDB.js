const mongoose = require('mongoose');

const regSchema = new mongoose.Schema(
        {
            username:{
                type: String,
                trim: true,
                required: [true, "name is required"],
            },
            email:{
                type: String,
                trim: true,
                unique: true,
                required: [true, "email is required"],
            },
            role:{
                type:String,
                trim: true,
                required: [true, "Role is required"],
            },
            password:{
                type: String,
                trim: true,
                required: [true, "password is required"],
            }
        }
);

module.exports = mongoose.model("Register_details", regSchema);
