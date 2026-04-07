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

  static async viewObject(req, res) {
    try {
      const { objectName, bucketName } = req.params;
      const { download } = req.query;

      const fileStream = await MediaService.viewObject(bucketName, objectName);

      const contentType =
        fileStream.headers?.["content-type"] || "application/octet-stream";
      const contentLength = fileStream.headers?.["content-length"];
      const disposition = download === "true" ? "attachment" : "inline";

      res.set("Content-Type", contentType);
      if (contentLength) res.set("Content-Length", contentLength);
      res.set(
        "Content-Disposition",
        `${disposition}; filename="${objectName}"`,
      );

      fileStream.pipe(res);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async getObjectUrl(req, res) {
    try {
      const { bucketName, objectName } = req.params;
      const expiry = Number(req.query.expiry) || 3600;
      const url = await MediaService.getObjectUrl(
        bucketName,
        objectName,
        expiry,
      );
      return res.status(200).json({
        success: true,
        url,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async getObjectInfo(req, res) {
    try {
      const { bucketName, objectName } = req.params;
      const objectInfo = await MediaService.getObjectInfo(
        bucketName,
        objectName,
      );
      return res.status(200).json({
        success: true,
        objectInfo,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async deleteObject(req, res) {
    try {
      const { bucketName, objectName } = req.params;
      await MediaService.deleteObject(bucketName, objectName);
      return res.status(200).json({
        success: true,
        message: "Object deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async deleteObjects(req, res) {
    try {
      const { bucketName, objectName } = req.body;
      await MediaService.deleteObjects(bucketName, objectName);
      return res.status(200).json({
        success: true,
        message: "Objects deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = MediaController;
