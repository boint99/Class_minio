const FileService = require("../services/file.service");

class FileController {
  async uploadSinglefile(req, res) {
    try {
      const file = await FileService.uploadSinglefile(req);
      return res.status(200).json({
        success: true,
        message: "File upload successfully",
        data: file,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
        data: null,
      });
    }
  }

  async uploadMultiplefile(req, res) {
    try {
      const files = await FileService.uploadMultiplefile(req);
      return res.status(200).json({
        success: true,
        message: "File upload successfully",
        data: files,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
        data: null,
      });
    }
  }
}

module.exports = new FileController();
