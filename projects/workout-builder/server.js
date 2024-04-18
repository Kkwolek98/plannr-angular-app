const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "dist/plannr-app/browser")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/plannr-app/browser/index.html"));
});

const port = process.env["FRONTEND_PORT"] || 4200;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
