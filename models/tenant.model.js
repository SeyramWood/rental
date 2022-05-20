import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema(
    {
        fullName: {
          type: String,
          required: [true, 'Full name is required'],
        },
        phone: {
          type: String,
          required: [true, 'Phone is required'],
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

export default mongoose.models.Tenant || mongoose.model("Tenant", tenantSchema);
