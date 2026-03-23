const FileService = require("../services/file.service");

class FileController {
  async uploadSingle(req, res) {
    try {
      await FileService.uploadSingle(req);
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

  async uploadMultiple(req, res) {
    try {
      await FileService.uploadMultiple(req);
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
}

module.exports = new FileController();
