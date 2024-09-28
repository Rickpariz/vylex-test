import { Schema } from "mongoose";
import { Package } from "../entities/package.entity";

export const PackageSchema = new Schema<Package>(
  {
    name: { type: String, required: true },
    genres: [{ type: Schema.Types.ObjectId, ref: "genres" }],
    version: { type: Number, default: 1 },
  },
  { timestamps: true }
);
