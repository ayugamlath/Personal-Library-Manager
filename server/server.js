const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/books", require("./routes/books"));

app.get("/", (req, res) => {
  res.send("Library Manager API is running");
});

// MongoDB Connection
const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      // Already connected
      return;
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    // Don't exit process in serverless, just log
  }
};

// Connect to DB immediately
connectDB();

// Only listen if not in a serverless environment (e.g. Vercel)
// require.main === module is true when run directly (node server.js)
if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
