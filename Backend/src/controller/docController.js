const Doctor = require("../models/doctor");
const jwt = require("jsonwebtoken");

const signup = async (req,res) => {
    const {name,email,password} = req.body;

    const doctorExists = await Doctor.findOne({email});

    if(doctorExists) {
        return res.status(400).json({message: "User already exists"});
    }

    const doctor = new Doctor({name,email,password});

    try{
        const info = await doctor.save();
        res.status(201).json({message: "You can update your profile now",info});

    } catch(error){
        res.status(500).json({message: "Something went wrong",error});
    } 
}

const login = async (req,res) => {
    const {email,password} = req.body;

    const doctor = await Doctor.findOne({email});

    if(!doctor){
        return res.status(400).json({message: "Invalid credentials"});
    }

    const token = jwt.sign(
        {
            id:doctor._id,
            name:doctor.name,
            email:doctor.email
        },
        process.env.JWT_SECRET,
        {expiresIn:"1h"}
    );

    res.status(200).json({message: "Login successful",token});
};


const updateProfile = async (req,res) => {
    try{const {id,profile} = req.body;
    const doctor = await Doctor.findById(id);
    if(!doctor){
        return res.status(400).json({message: "Doctor not found"});
    }
    const updatedDoctor = await Doctor.findByIdAndUpdate(id,{...profile},{new:true});
     return res.status(200).json({message: "Profile updated successfully",updatedDoctor});}
     catch(error){
         res.status(500).json({message: "Something went wrong",error});
     }

    // const updatedDoctor = { ...doctor._doc, ...profile };
    
    // await Doctor.findByIdAndUpdate(id,);
}

module.exports = {signup,login,updateProfile};

