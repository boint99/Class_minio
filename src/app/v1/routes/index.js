const express = require("express");

const MediaRoutes = require("./media.routes");
const router = express.Router();

router.use("/media", MediaRoutes);

module.exports = router;
