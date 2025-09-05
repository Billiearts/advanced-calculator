import mongoose, { Document, Schema } from "mongoose";

export interface ICalculation extends Document {
  user: mongoose.Types.ObjectId; // reference to User
  expression: string;
  result: string;
  type: "scientific" | "financial";
  createdAt: Date;
}

const CalculationSchema: Schema<ICalculation> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    expression: { type: String, required: true },
    result: { type: String, required: true },
    type: { type: String, enum: ["scientific", "financial"], required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Calculation = mongoose.model<ICalculation>("Calculation", CalculationSchema);
export default Calculation;
