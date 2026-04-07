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

router.get("/:bucketName/:objectName", MediaController.viewObject);

router.get("/:bucketName/:objectName/url", MediaController.getObjectUrl);

router.get("/:bucketName/:objectName/info", MediaController.getObjectInfo);

module.exports = router;
