const express = require("express");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

app.get("/api", (req, res) => {
  res.json({ message: "hello, you've reached the api route." });
});

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
