import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    city:{
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    type:{
      type: String,
      required: true,
    },
    status:{
      type: Boolean,
      default: false,
    },
    landlord:String,
  },
  { timestamps: true }
);

export default mongoose.models.Property || mongoose.model("Property", propertySchema);
