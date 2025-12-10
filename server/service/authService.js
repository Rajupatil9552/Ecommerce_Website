import User from '../model/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import 'dotenv/config'

const loginService = async (req,res) => {
     try {
        let user = await User.findOne({email : req.body.email})
        if(!user){
            return res.send("Email id is not registered")
        }
       
        //verify password
        const isMatch = await bcrypt.compare(req.body.pass , user.password);
        if(!isMatch){
            return  res.send("Invalid credentials");
        }

        //jwt token
        const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' });


        res.json({ token });
    }
    catch (error) {
        res.send(error.message);
    }
}


const registerService = async (req,res) => {

    try {
        const { userName, email, pass, profilePic, role} = req.body;

        let user = await User.findOne({email : email});
        if(user){
            return res.send("email id already registered!")
        }
        const hashedPassword = await bcrypt.hash(pass, 10);

        user = new User({
            userName: userName,
            email: email,
            password: hashedPassword,
            profilePic: profilePic,
            role : role
        })

        user = await user.save();

        if (!user) {
            return res.status(400).send("User Cannot created");
        }

        res.status(201).json({message : "User Created Successfully", user});
    }
    catch (error) {
        res.send(error.message);
    }
}





const logoutService = async (req,res) => {
    try {
        // Invalidate the token on client side by removing it
        res.json({ message: "User logged out successfully" });
    }
    catch (error) {
        res.send(error.message);
    }
}

export {
    loginService,
    registerService,
    logoutService
}