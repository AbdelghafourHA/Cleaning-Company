import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["work", "rental", "cleaning"],
      required: true,
    },
    clientName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    address: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "completed"],
      default: "pending",
    },
    notes: {
      type: String,
      trim: true,
    },
    agreeToTerms: {
      type: Boolean,
      default: false,
    },

    workExperience: {
      type: String,
      trim: true,
    },

    equipmentType: {
      type: String,
      trim: true,
    },
    rentalDuration: {
      type: String,
      trim: true,
    },
    equipmentNotes: {
      type: String,
      trim: true,
    },

    placeType: {
      type: String,
      trim: true,
    },
    additionalDetails: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Request = mongoose.model("Request", requestSchema);
export default Request;
