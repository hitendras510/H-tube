import mongoose, { Schema } from "mongoose"; // mongodb

const subscriptionSchema = new Schema(
  {
    subscriber: {
      // 🔹 fixed typo: was "susbcriber"
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    channel: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// 🔹 Export as named "Subscription" so controller import works
export const Subscription = mongoose.model("Subscription", subscriptionSchema);
