import { Schema, model, Types } from "mongoose";

const incomeSchema = new Schema({
  source: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  user: { type: Types.ObjectId, ref: "User", required: true }
});

export default model("Income", incomeSchema);
