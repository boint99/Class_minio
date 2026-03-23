const express = require("express");
const FileController = require("../controllers/file.controller");
const Upload = require("../../../utils/multer.utils");

const router = express.Router();

router.post(
  "/upload/single",
  Upload.single("file"),
  FileController.uploadSinglefile,
);

router.post(
  "/upload/multiple",
  Upload.array("files"),
  FileController.uploadMultiplefile,
);

module.exports = router;
