const BUCKET_NAME = require("../../../utils/constaints");
const FileModel = require("../models/file.model");
const path = require("path");

class FileService {
  static async uploadSinglefile(req) {
    const file = req.file;
    console.log("🚀 ~ FileService ~ uploadSinglefile ~ file:", file)
    if (!file) throw new Error("No file uploaded");

    const bucketName = BUCKET_NAME;
    const fileName = file.originalname;
    const myType = file.mimetype;
    const fileBuffer = file.buffer;
    return await FileModel.uploadFileSingle({ bucketName, fileName, fileBuffer, myType });
  }

  static async uploadMultiplefile(req) {
    const files = req.files;
    if (!files || files.length === 0) throw new Error("No files uploaded");

    const results = [];
    for (const file of files) {
      const ext = path.extname(file.originalname);
      const fileName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
      const myType = file.mimetype;
      const fileBuffer = file.buffer;
      results.push(await FileModel.uploadFileSingle({ bucketName, fileName, fileBuffer, myType }));
    }
    return results;
  }

  static async updateImage(req) {
    const file = req.file;
    const { oldObjectName } = req.body;

    if (!file) throw new Error("No new file uploaded for update");

    if (oldObjectName) {
      try {
        await FileModel.deleteFile(oldObjectName);
      } catch (error) {
        console.error(`Failed to delete old image ${oldObjectName}:`, error.message);
      }
    }

    // Upload file mới
    const bucketName = BUCKET_NAME;
    const ext = path.extname(file.originalname);
    const fileName = `${Date.now()}${ext}`;
    const myType = file.mimetype;
    const fileBuffer = file.buffer;

    return await FileModel.uploadFileSingle({ bucketName, fileName, fileBuffer, myType });
  }
}

module.exports = FileService;
