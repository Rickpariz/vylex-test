import { Schema } from "mongoose";
import { Subscription } from "../entities/subscription.entity";

export const SubscriptionSchema = new Schema<Subscription>(
  {
    package: { type: Schema.Types.ObjectId, ref: "packages", required: true },
    users: [{ type: Number }],
  },
  { timestamps: true }
);
