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

// node /media/media/download.jpg
router.get("/:bucketName/:objectName", MediaController.viewObject);

// GET /media?bucketName=media&objectName=test.jpg&expiry=3600&download=myfile.jpg&contentType=image/jpeg
router.get("/", MediaController.getObjectUrl);

module.exports = router;
