import mongoose, { Document, Schema } from "mongoose";

// 1. Define a TypeScript interface
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
}

// 2. Create the schema
const UserSchema: Schema<IUser> = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// 3. Create and export the model
const User = mongoose.model<IUser>("User", UserSchema);
export default User;
