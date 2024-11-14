const Doctor = require("../models/doctor");
const jwt = require("jsonwebtoken");

const signup = async (req,res) => {
    const {name,email,password} = req.body;

    const doctorExists = await Doctor.findOne({email});


    if(doctorExists) {
        return res.status(400).json({message: "User already exists"});
    }

    const doctor = new Doctor({name,email,password});
    const token = jwt.sign(
        {
            id:doctor._id,
            name:doctor.name,
            email:doctor.email
        },
        process.env.JWT_SECRET,
        {expiresIn:"1h"}
    );

    try{
        const info = await doctor.save();
        res.status(201).json({message: "You can update your profile now",info,token});

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
    try{const {id,profile,jwtToken} = req.body;
    const doctor = await Doctor.findById(id);
    if(!doctor){
        return res.status(400).json({message: "Doctor not found"});
    }
    
    const decoded = jwt.verify(jwtToken,process.env.JWT_SECRET);
    if(decoded.id !== id){
        return res.status(403).json({message: "You are not authorized to update this profile"});
    }
    const updatedDoctor = await Doctor.findByIdAndUpdate(id,{...profile},{new:true});
     return res.status(200).json({message: "Profile updated successfully",updatedDoctor});}
     catch(error){
         res.status(500).json({message: "Something went wrong",error});
     }

    // const updatedDoctor = { ...doctor._doc, ...profile };
    
    // await Doctor.findByIdAndUpdate(id,);
}


const getAllDoctor = async(req,res) => {
    const Doctors = await Doctor.find({visible:true});
    const updatedDoctors = Doctors.map((doctor)=>{
        return {
           _id: doctor._id,
            name: doctor.name,
            specialization: doctor.specialization,
            description: doctor.description   
        }
       
    })
     return res.status(200).json({message: "All doctors",updatedDoctors});
}


const getDoctor = async(req,res) => {
    const {id} = req.params;
    const doctor = await Doctor.findById(id);

    if(!doctor){
        return res.status(400).json({message: "Doctor not found"});
    }
    return res.status(200).json({message: "Doctor found",doctor});
}

module.exports = {signup,login,updateProfile,getAllDoctor,getDoctor};



