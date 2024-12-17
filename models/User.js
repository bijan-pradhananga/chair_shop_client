import mongoose, { Schema, model } from "mongoose";

// User Schema
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    password: {
      type: String,
      select: false,
    },
    image: {
      type: String,
    },
    emailVerified: {
      type: Date,
    },
    role: { type: String, default: "user" },
    authProviderId: { type: String },
  },
  {
    timestamps: true,
  }
);

// Check if the model exists, otherwise create a new one
const User = mongoose.models?.User || model("User", UserSchema);
export default User;
