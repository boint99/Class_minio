const MediaService = require("../services/media.service");

class MediaController {
  static async uploadObject(req, res) {
    try {
      await MediaService.uploadObject(req);
      return res.status(200).json({
        success: true,
        message: "File upload successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async uploadObjects(req, res) {
    try {
      await MediaService.uploadObjects(req);
      return res.status(200).json({
        success: true,
        message: "Files upload successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async downloadObject(req, res) {
    try {
      const { objectName, bucketName } = req.params;
      const fileStream = await MediaService.downloadObject(
        bucketName,
        objectName,
      );
      res.set("content-type", "application/octet-stream");
      fileStream.pipe(res);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = MediaController;
