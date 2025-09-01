import express from 'express';
import ContactSubmission from '../models/ContactSubmission.js';

const router = express.Router();

// Get all contact submissions
router.get("/get-submissions", async (req, res) => {
  try {
    const submissions = await ContactSubmission.find().sort({ createdAt: -1 });
    res.status(200).json(submissions);
  } catch (err) {
    console.error("Error fetching contact submissions:", err);
    res.status(500).send("Error fetching submissions");
  }
});

router.put("/update-status/:id", async (req, res) => {
  try {
    const { followupStatus, isSpam } = req.body;
    const submission = await ContactSubmission.findByIdAndUpdate(
      req.params.id,
      { followupStatus, isSpam },
      { new: true }
    );
    
    if (!submission) {
      return res.status(404).json({ success: false, message: "Submission not found" });
    }
    
    res.json({ success: true, submission });
  } catch (err) {
    console.error("Error updating contact submission:", err);
    res.status(500).json({ success: false, message: "Error updating submission" });
  }
});

// Get submission by ID
router.get("/get-submission/:id", async (req, res) => {
  try {
    const submission = await ContactSubmission.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }
    res.status(200).json(submission);
  } catch (err) {
    console.error("Error fetching submission:", err);
    res.status(500).send("Error fetching submission");
  }
});



// Delete submission
router.delete("/delete-submission/:id", async (req, res) => {
  try {
    const submission = await ContactSubmission.findByIdAndDelete(req.params.id);
    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }
    res.status(200).json({ message: "Submission deleted successfully" });
  } catch (err) {
    console.error("Error deleting submission:", err);
    res.status(500).send("Error deleting submission");
  }
});

// Get submission statistics
router.get("/statistics", async (req, res) => {
  try {
    const total = await ContactSubmission.countDocuments();
    const pending = await ContactSubmission.countDocuments({ followupStatus: "Pending" });
    const contacted = await ContactSubmission.countDocuments({ followupStatus: "Contacted" });
    const noResponse = await ContactSubmission.countDocuments({ followupStatus: "No Response" });
    const read = await ContactSubmission.countDocuments({ followupStatus: "Read" });
    
    res.status(200).json({
      total,
      pending,
      contacted,
      noResponse,
      read
    });
  } catch (err) {
    console.error("Error fetching statistics:", err);
    res.status(500).send("Error fetching statistics");
  }
});

export default router;
