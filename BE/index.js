const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const noteRoutes = require("./routes/noteRoutes");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost",
      "http://localhost:5500",
      "http://127.0.0.1:5500",
      "http://localhost:8080",
      "http://127.0.0.1:8080",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Notes API is running");
});

require("./schema/Note");
app.use("/api/v1/notes", noteRoutes);

const port = process.env.PORT || 3000;

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected");
    return sequelize.sync();
  })
  .then(() => {
    console.log("Database synced");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server:", error.message);
  });
