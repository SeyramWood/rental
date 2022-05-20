import mongoose from "mongoose";

const propertyAdvanceSchema = new mongoose.Schema(
  {
    tenant: {
      fullName: String,
      phone: String,
      username: String,
    },
    landlord: {
      fullName: String,
      phone: String,
      username: String,
    },
    property: {
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
      city: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
    },
    startDate: Date,
    endDate: Date,
    tenantId: String,
    landlordId: String,
  },
  { timestamps: true }
);

export default mongoose.models.PropertyAdvance ||
  mongoose.model("PropertyAdvance", propertyAdvanceSchema);
