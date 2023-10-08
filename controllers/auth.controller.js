import { errorHandler } from "../utils/error.js";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";

export const signup = async (req, res, next) => {
  try {
    const { username, password, email, mobile } = req.body;
    const hashPass = bcrypt.hashSync(password, 10);
    const newUser = new User({ username,password: hashPass, email, mobile });
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "user created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const signin = (req, res) => {
  console.log("signin also working");
};
