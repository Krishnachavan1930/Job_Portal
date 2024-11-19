import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
         
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists with this email.',
                success: false,
            });
        }

        let profilePhoto = '';
        if (req.file) {
            try {
                const fileUri = getDataUri(req.file);
                const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
                profilePhoto = cloudResponse.secure_url;
            } catch (fileError) {
                console.error("File upload error:", fileError);
                return res.status(400).json({
                    message: "File upload failed",
                    success: false,
                    error: fileError.message
                });
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto,
            }
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true,
            user: {
                _id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
                role: newUser.role,
            }
        });
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({
            message: "An error occurred during registration",
            success: false,
            error: error.message
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Email, password, and role are required",
                success: false
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials",
                success: false,
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Invalid credentials",
                success: false,
            });
        }

        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role",
                success: false
            });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        const userResponse = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200)
            .cookie("token", token, {
                maxAge: 24 * 60 * 60 * 1000, // 1 day
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict'
            })
            .json({
                message: `Welcome back, ${user.fullname}`,
                user: userResponse,
                success: true
            });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            message: "An error occurred during login",
            success: false,
            error: error.message
        });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({
            message: "Logged out successfully.",
            success: true
        });
    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({
            message: "An error occurred during logout",
            success: false,
            error: error.message
        });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const userId = req.userId; // Assuming this is set by your authentication middleware

        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        // Update user fields if provided
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skills.split(",").map(skill => skill.trim());

        // Handle file upload
        if (req.file) {
            try {
                const fileUri = getDataUri(req.file);
                const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
                user.profile.resume = cloudResponse.secure_url;
                user.profile.resumeOriginalName = req.file.originalname;
            } catch (fileError) {
                console.error("File upload error:", fileError);
                return res.status(400).json({
                    message: "File upload failed",
                    success: false,
                    error: fileError.message
                });
            }
        }

        await user.save();

        const updatedUser = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser,
            success: true
        });
    } catch (error) {
        console.error("Profile update error:", error);
        return res.status(500).json({
            message: "An error occurred while updating the profile",
            success: false,
            error: error.message
        });
    }
};