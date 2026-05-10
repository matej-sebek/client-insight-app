const express = require("express");
const cors = require("cors");
const clientRoutes = require("./routes/client-routes");
const insightRoutes = require("./routes/insight-routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    name: "Evidence klientskych poznatku API",
    status: "running",
  });
});

app.use("/clients", clientRoutes);
app.use("/", insightRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: "notFound",
    message: "Requested object was not found.",
  });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({
    error: "serverError",
    message: "Unexpected server error.",
  });
});

module.exports = app;
