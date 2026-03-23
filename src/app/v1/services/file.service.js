const BUCKET_NAME = require("../../../utils/constaints");
const FileModel = require("../models/file.model");
const path = require("path");

class FileService {
  static async uploadSinglefile(req) {
    const file = req.file;
    if (!file) throw new Error("No file uploaded");

    const bucketName = BUCKET_NAME;
    const fileName = file.originalname;
    const myType = file.mimetype;
    const fileBuffer = file.buffer;
    return await FileModel.uploadFileSingle({
      bucketName,
      fileName,
      fileBuffer,
      myType,
    });
  }

  static async uploadMultiplefile(req) {
    const files = req.files;
    console.log("🚀 ~ FileService ~ uploadMultiplefile ~ files:", files);
    if (!files || files.length === 0) throw new Error("No files uploaded");

    const bucketName = BUCKET_NAME;
    const objectFile = files.map((file) => ({
      fileName: file.originalname,
      fileBuffer: file.buffer,
      mimetype: file.mimetype,
    }));

    return await FileModel.uploadMultiplefile({ bucketName, objectFile });
  }
}

module.exports = FileService;
