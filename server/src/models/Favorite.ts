// server/src/models/Favorite.ts
import mongoose, { Document, Schema } from "mongoose";

export interface IFavorite extends Document {
  user: mongoose.Types.ObjectId;
  calculation: mongoose.Types.ObjectId;
  note?: string;
  createdAt: Date;
}

const FavoriteSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  calculation: { type: Schema.Types.ObjectId, ref: "Calculation", required: true },
  note: { type: String }
}, { timestamps: true });

export default mongoose.model<IFavorite>("Favorite", FavoriteSchema);
