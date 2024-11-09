const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const doctorSchema = new mongoose.Schema(
{
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}, 
    specialization: {type: String},
    experience: {type: Number},
    qualification: {type: String},
    description: {type: String},
    visible: {type: Boolean, default: false, required: true},
},
{timestamps: true}
);


doctorSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;