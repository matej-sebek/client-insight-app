const express = require("express");
const {
  createClient,
  listClients,
  getClient,
  updateClient,
  deleteClient,
} = require("../controllers/client-controller");

const router = express.Router();

router.post("/", createClient);
router.get("/", listClients);
router.get("/:id", getClient);
router.put("/:id", updateClient);
router.delete("/:id", deleteClient);

module.exports = router;
