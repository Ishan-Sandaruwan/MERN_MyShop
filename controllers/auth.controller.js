import { errorHandler } from "../utils/error.js";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  try {
    const { username, password, email, mobile } = req.body;
    const hashPass = bcrypt.hashSync(password, 10);
    const newUser = new User({ username, password: hashPass, email, mobile });
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "user created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res , next) => {
  try {
    const { email, password } = req.body;
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "user not found"));
    const validPass = bcrypt.compareSync(password, validUser.password);
    if (!validPass) return next(errorHandler(401, "invalid password"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
