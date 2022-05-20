import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    started: {
      type: Boolean,
      default:false
    },
    completed: {
      type: Boolean,
      default:false
    },
    startedOn: Date,
    completedOn: Date,
    user: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Task || mongoose.model("Task", taskSchema);
