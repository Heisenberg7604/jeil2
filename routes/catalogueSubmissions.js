import express from 'express';
import CatalogueSubmission from '../models/CatalogueSubmission.js';

const router = express.Router();

// Get all catalogue submissions
router.get("/get-submissions", async (req, res) => {
  try {
    const submissions = await CatalogueSubmission.find().sort({ createdAt: -1 });
    res.status(200).json(submissions);
  } catch (err) {
    console.error("Error fetching catalogue submissions:", err);
    res.status(500).send("Error fetching submissions");
  }
});

router.put("/update-status/:id", async (req, res) => {
  try {
    const { followupStatus, isSpam } = req.body;
    const submission = await CatalogueSubmission.findByIdAndUpdate(
      req.params.id,
      { followupStatus, isSpam },
      { new: true }
    );
    
    if (!submission) {
      return res.status(404).json({ success: false, message: "Submission not found" });
    }
    
    res.json({ success: true, submission });
  } catch (err) {
    console.error("Error updating catalogue submission:", err);
    res.status(500).json({ success: false, message: "Error updating submission" });
  }
});

// Get submission by ID
router.get("/get-submission/:id", async (req, res) => {
  try {
    const submission = await CatalogueSubmission.findById(req.params.id);
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
    const submission = await CatalogueSubmission.findByIdAndDelete(req.params.id);
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
    const total = await CatalogueSubmission.countDocuments();
    const pending = await CatalogueSubmission.countDocuments({ followupStatus: "Pending" });
    const contacted = await CatalogueSubmission.countDocuments({ followupStatus: "Contacted" });
    const noResponse = await CatalogueSubmission.countDocuments({ followupStatus: "No Response" });
    const read = await CatalogueSubmission.countDocuments({ followupStatus: "Read" });
    
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
