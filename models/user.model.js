import mongoose from "mongoose";

const userShema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile:{
      type:Number,
      required:true,
      unique:true,
    }
  },
  { timestamps: true }
);

const User = mongoose.model('User',userShema);

export default User;
