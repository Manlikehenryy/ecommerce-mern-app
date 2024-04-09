import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import isTokenExpired from '../utils/isTokenExpired.js'


export const signUpAdmin = async (req,res) =>{
    try {
    
		const { fullName, username, password, confirmPassword } = req.body;

		if (password !== confirmPassword) {
			return res.status(400).json({status: "failed", error: "Passwords don't match" });
		}

		const user = await User.findOne({ username });

		if (user) {
			return res.status(400).json({status: "failed", error: "Username already exists" });
		}

		// HASH PASSWORD HERE
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);


		const newUser = new User({
			fullName,
			username,
			password: hashedPassword,
			role: "admin"
		});

		if (newUser) {
			// Generate JWT token here
			generateTokenAndSetCookie(newUser._id, res);
			await newUser.save();

			res.status(201).json({status: "success", data: {
				_id: newUser._id,
				fullName: newUser.fullName,
				username: newUser.username,
				role: newUser.role,
			}});
		} else {
			res.status(400).json({status: "failed", error: "Invalid user data" });
		}
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({status: "failed", error: "Internal Server Error" });
	}
}

export const signUp = async (req,res) =>{
    try {
    
		const { fullName, username, password, confirmPassword } = req.body;

		if (password !== confirmPassword) {
			return res.status(400).json({status: "failed", error: "Passwords don't match" });
		}

		const user = await User.findOne({ username });

		if (user) {
			return res.status(400).json({status: "failed", error: "Username already exists" });
		}

		// HASH PASSWORD HERE
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);


		const newUser = new User({
			fullName,
			username,
			password: hashedPassword,
			role: "customer"
		});

		if (newUser) {
			// Generate JWT token here
			generateTokenAndSetCookie(newUser._id, res);
			await newUser.save();

			res.status(201).json({status: "success", data: {
				_id: newUser._id,
				fullName: newUser.fullName,
				username: newUser.username,
				role: newUser.role,
			}});
		} else {
			res.status(400).json({status: "failed", error: "Invalid user data" });
		}
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({status: "failed", error: "Internal Server Error" });
	}
}

export const signIn = async (req,res) =>{
    try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({status: "failed", error: "Invalid username or password" });
		}

		generateTokenAndSetCookie(user._id, res);

		res.status(200).json({status: "success", data: {
			_id: user._id,
			fullName: user.fullName,
			username: user.username,
            role: user.role
		}});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({status: "failed", error: "Internal Server Error" });
	}
}

export const signOut = (req,res) =>{
    try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({status: "success", message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({status: "failed", error: "Internal Server Error" });
	}
}

export const hasTokenExpired = (req,res) =>{
    try {
		const token = req.cookies.jwt;

		if (isTokenExpired(token)) {
			res.status(200).json({status: "success", message: "Session has expired" });
		}
		else{
			res.status(200).json({status: "success", message: "Session has not expired" });
		}

		
	} catch (error) {
		console.log("Error in hasTokenExpired controller", error.message);
		res.status(500).json({status: "failed", error: "Internal Server Error" });
	}
}