const MediaModel = require("../models/media.model");

class MediaService {
  static async uploadObject(req) {
    const file = req.file;
    if (!file) throw new Error("No file uploaded");

    const { originalname, mimetype, buffer } = file;

    return await MediaModel.uploadObject({
      originalname,
      mimetype,
      buffer,
    });
  }

  static async uploadObjects(req) {
    const files = req.files;
    if (!files || files.length === 0) throw new Error("No files uploaded");

    const objectFile = files.map((file) => ({
      originalname: file.originalname,
      buffer: file.buffer,
      mimetype: file.mimetype,
    }));

    return await MediaModel.uploadObjects({ objectFile });
  }

  static async downloadObject(bucketName, objectName) {
    if (!bucketName || !objectName) {
      throw new Error("Bucket name and object name are required");
    }
    return await MediaModel.downloadObject(bucketName, objectName);
  }
}

module.exports = MediaService;
