const User = require("../models/User");
const jwt = require("jsonwebtoken");

const signup = async (req,res) => {
    const {name,email,password} = req.body;

    const userExists = await User.findOne({email});

    if(userExists) {
        return res.status(400).json({message: "User already exists"});
    }

    const user = new User({name,email,password});


    try{
        await user.save();
        res.status(201).json({message: "User created successfully"});
    } catch(error){
        res.status(500).json({message: "Something went wrong",error});
    }
};

const login = async (req,res) => {
    const {email,password} = req.body;

    const user = await User.findOne({email});

    if(!user){
        return res.status(400).json({message: "Invalid credentials"});
    }

    const token = jwt.sign(
        {
            id:user._id,
            name:user.name,
            email:user.email
        },
        process.env.JWT_SECRET,
        {expiresIn:"1h"}
    );

    res.status(200).json({message: "Login successful",token});
};

module.exports = {signup,login};
