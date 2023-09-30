const express = require("express");
const helmet = require("helmet");
const app = express();
const cors = require("cors");
const port = 3060;
const gptRoute = require("./routes/gpt");
const templateRoute = require("./routes/template");
const path = require("path");

// ミドルウェア
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use("/api/gpt", gptRoute);
app.use("/api/template", templateRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log("Server listening on port 3060");
});
