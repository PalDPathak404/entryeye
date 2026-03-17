const Batch = require('../models/Batch');

/**
 * @desc    Create a new batch
 * @route   POST /api/batches
 * @access  Private/Admin
 */
exports.createBatch = async (req, res, next) => {
  try {
    const { name, year, course } = req.body;

    // Validate name and year
    if (!name || !year) {
      return res.status(400).json({ message: 'Name and year are required' });
    }

    // Create new batch
    const batch = new Batch({
      name,
      year,
      course,
      createdBy: req.user.id,
    });

    await batch.save();

    res.status(201).json({
      message: 'Batch created successfully',
      batch,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all batches
 * @route   GET /api/batches
 * @access  Private
 */
exports.getBatches = async (req, res, next) => {
  try {
    const batches = await Batch.find().sort({ createdAt: -1 });

    res.status(200).json({
      batches,
    });
  } catch (error) {
    next(error);
  }
};
