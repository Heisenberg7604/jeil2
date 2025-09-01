import mongoose from "mongoose";

const catalogueSubmissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  visitorIP: {
    type: String,
    default: "Unknown"
  },
  followupStatus: {
    type: String,
    enum: ["Read", "Pending", "Contacted", "No Response"],
    default: "Pending"
  },
  isSpam: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("CatalogueSubmission", catalogueSubmissionSchema);
