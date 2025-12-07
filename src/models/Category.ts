import { Schema, model } from "mongoose";

export interface ICategory {
  name: string;
  createdAt?: Date;
}

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

export default model<ICategory>("Category", categorySchema);
