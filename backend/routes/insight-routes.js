const express = require("express");
const {
  createInsight,
  listClientInsights,
  getInsight,
  updateInsight,
  deleteInsight,
} = require("../controllers/insight-controller");

const router = express.Router();

router.post("/clients/:clientId/insights", createInsight);
router.get("/clients/:clientId/insights", listClientInsights);
router.get("/insights/:id", getInsight);
router.put("/insights/:id", updateInsight);
router.delete("/insights/:id", deleteInsight);

module.exports = router;
