import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
    },
    username: {
      type: String,
      required: [true, 'Email is required'],
      unique:true,
      lowercase:true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength:6
    },
  },
  { timestamps: true }
);

export default mongoose.models.Admin || mongoose.model("Admin", adminSchema);
