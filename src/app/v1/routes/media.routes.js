const express = require("express");
const MediaController = require("../controllers/media.controller");
const Upload = require("../../../utils/multer.utils");

const router = express.Router();

router.post(
  "/upload/single",
  Upload.single("file"),
  MediaController.uploadObject,
);

router.post(
  "/upload/multiple",
  Upload.array("files"),
  MediaController.uploadObjects,
);

router.get("/:bucketName/:objectName", MediaController.downloadObject);

module.exports = router;
