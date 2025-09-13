const Notice = require('../models/notice.model');

// --- Get all notices ---
exports.getAllNotices = async (req, res) => {
    try {
        // Use the Notice model to find all documents in the notices collection
        // .sort({ createdAt: -1 }) will sort them with the newest one first
        const notices = await Notice.find().sort({ createdAt: -1 });
        res.status(200).json(notices); // Send the notices back as a JSON response
    } catch (error) {
        res.status(500).json({ message: "Error fetching notices", error: error.message });
    }
};

// --- Create a new notice ---
exports.createNotice = async (req, res) => {
    // We expect the request body to contain the title and content for the new notice
    const { title, content, author } = req.body;

    // Basic validation
    if (!title || !content) {
        return res.status(400).json({ message: "Please provide a title and content." });
    }

    // Create a new notice instance using our model
    const newNotice = new Notice({
        title,
        content,
        author,
    });

    try {
        // Save the new notice to the database
        const savedNotice = await newNotice.save();
        res.status(201).json(savedNotice); // 201 means "Created"
    } catch (error) {
        res.status(500).json({ message: "Error creating notice", error: error.message });
    }
};

// --- Get a single notice by its ID ---
exports.getNoticeById = async (req, res) => {
    try {
        const notice = await Notice.findById(req.params.id);
        if (!notice) {
            // If no notice is found with that ID
            return res.status(404).json({ message: "Notice not found." });
        }
        res.status(200).json(notice);
    } catch (error) {
        res.status(500).json({ message: "Error fetching notice", error: error.message });
    }
};

// --- Delete a notice by its ID ---
exports.deleteNotice = async (req, res) => {
    try {
        const notice = await Notice.findByIdAndDelete(req.params.id);
        if (!notice) {
            return res.status(404).json({ message: "Notice not found." });
        }
        res.status(200).json({ message: "Notice deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Error deleting notice", error: error.message });
    }
};

