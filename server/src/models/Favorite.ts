import mongoose, { Document, Schema } from "mongoose";

export interface IFavorite extends Document {
  user: mongoose.Types.ObjectId;
  calculation: mongoose.Types.ObjectId; // reference to Calculation
  note?: string; // optional label for the favorite
  createdAt: Date;
}

const FavoriteSchema: Schema<IFavorite> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    calculation: { type: Schema.Types.ObjectId, ref: "Calculation", required: true },
    note: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Favorite = mongoose.model<IFavorite>("Favorite", FavoriteSchema);
export default Favorite;
