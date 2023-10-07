const express = require("express");
const router = express.Router();
const Template = require("..schema");

require("dotenv").config();
const dbURI = process.env.DBURI;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

// GET:template

// POST:template

// PUT:template

// DELETE:template

// GET one:template

module.exports = router;
