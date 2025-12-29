import { Schema, model, Types } from "mongoose";

const savingsGoalSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    targetAmount: { type: Number, required: true },
    currentAmount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default model("SavingsGoal", savingsGoalSchema);
