import mongoose from "mongoose";

const contactSubmissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  company: {
    type: String,
    default: ""
  },
  subject: {
    type: String,
    default: ""
  },
  message: {
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

export default mongoose.model("ContactSubmission", contactSubmissionSchema);
