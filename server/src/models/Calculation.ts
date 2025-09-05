// server/src/models/Calculation.ts
import mongoose, { Document, Schema } from "mongoose";

export interface ICalculation extends Document {
  user: mongoose.Types.ObjectId;
  expression: string;
  result: string;
  type?: "scientific" | "financial";
  createdAt: Date;
}

const CalculationSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  expression: { type: String, required: true },
  result: { type: String, required: true },
  type: { type: String, enum: ["scientific", "financial"], default: "scientific" }
}, { timestamps: true });

export default mongoose.model<ICalculation>("Calculation", CalculationSchema);
