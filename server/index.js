
const express = require("express");
const cors = require("cors");
const db = require("./models");
const makeCrudRouter = require("./routes/crud");

const app = express();
const PORT = Number(process.env.PORT || 3007);

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "Shipping Line API is running",
    status: "ok"
  });
});

// CRUD modules
app.use("/api/customer", makeCrudRouter("Customer"));
app.use("/api/ship", makeCrudRouter("Ship"));
app.use("/api/port", makeCrudRouter("Port"));

// Related-record modules
app.use("/api/booking", require("./routes/booking"));
app.use("/api/shipment", require("./routes/shipment"));
app.use("/api/payment", require("./routes/payment"));

app.use((req, res) => {
  res.status(404).json({
    message: `Route not found: ${req.method} ${req.originalUrl}`
  });
});

async function startServer() {
  try {
    await db.sequelize.authenticate();
    console.log("MySQL connected successfully!");

    await db.sequelize.sync();

    console.log("Database models synchronized.");

    app.listen(PORT, () => {
      console.log(`Shipping Line API running at http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("Unable to start server:", error);
    process.exitCode = 1;
  }
}

startServer();
