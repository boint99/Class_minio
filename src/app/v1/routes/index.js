const express = require("express");

const router = express.Router();

router.use("/file", require("./file.routes"));

module.exports = router;
