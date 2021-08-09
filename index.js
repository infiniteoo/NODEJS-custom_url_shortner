const express = require("express");

const app = express();

const PORT = process.env.PORT || 5000;

app.get("/api", (req, res) => {
  res.json({ message: "hello, you've reached the api route." });
});

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
