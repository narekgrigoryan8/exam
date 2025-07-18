const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware');
const { requireRole } = require('../middlewares/rbacMiddleware');
const maintenanceService = require('../services/ maintenanceService');

router.post('/cleanup-overdue', authenticate, requireRole(['admin']), async (req, res) => {
  try {
    const results = await maintenanceService.markOverdueRentals();
    res.json({ marked: results.length, records: results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
