const express = require("express");
const FileController = require("../controllers/file.controller");
const Upload = require("../../../utils/multer.utils");

const router = express.Router();

router.post(
  "/upload/single",
  Upload.single("file"),
  FileController.uploadSingle,
);

router.post(
  "/upload/multiple",
  Upload.array("files"),
  FileController.uploadMultiple,
);

module.exports = router;
