import { Schema, model, Types, Document } from "mongoose";

export interface ISavingsGoal extends Document {
  user: Types.ObjectId;
  title: string;
  targetAmount: number;
  currentAmount: number;
  image?: string; // ✅ NEW
}

const savingsGoalSchema = new Schema<ISavingsGoal>(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    targetAmount: {
      type: Number,
      required: true,
    },
    currentAmount: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default: "", // ✅ NEW
    },
  },
  { timestamps: true }
);

export default model<ISavingsGoal>(
  "SavingsGoal",
  savingsGoalSchema
);
