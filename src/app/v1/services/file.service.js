const BUCKET_NAME = require("../../../utils/constaints");
const FileModel = require("../models/file.model");

class FileService {
  static async uploadSingle(req) {
    const file = req.file;

    console.log(file.length);
    if (!file) throw new Error("No file uploaded");

    const { originalname, mimetype, buffer } = file;

    return await FileModel.uploadSingle({
      originalname,
      mimetype,
      buffer,
    });
  }

  static async uploadMultiple(req) {
    const files = req.files;
    if (!files || files.length === 0) throw new Error("No files uploaded");

    const objectFile = files.map((file) => ({
      originalname: file.originalname,
      buffer: file.buffer,
      mimetype: file.mimetype,
    }));

    return await FileModel.uploadMultiple({ objectFile });
  }
}

module.exports = FileService;
