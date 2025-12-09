import { Schema, model, Types } from "mongoose";

const expenseSchema = new Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  notes: { type: String },
  category: { type: Types.ObjectId, ref: "Category" },
  user: { type: Types.ObjectId, ref: "User", required: true }
});

export default model("Expense", expenseSchema);
