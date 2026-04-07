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

  static async viewObject(bucketName, objectName) {
    if (!bucketName || !objectName) {
      throw new Error("Bucket name and object name are required");
    }
    return await MediaModel.viewObject(bucketName, objectName);
  }

  static async getObjectStat(bucketName, objectName) {
    if (!bucketName || !objectName) {
      throw new Error("Bucket name and object name are required");
    }
    return await MediaModel.getObjectStat(bucketName, objectName);
  }

  static async getObjectUrl(bucketName, objectName, expiry = 3600) {
    if (!bucketName || !objectName) {
      throw new Error("Bucket name and object name are required");
    }
    const parsedExpiry = Number(expiry) || 3600;

    return await MediaModel.getObjectUrl(bucketName, objectName, parsedExpiry);
  }

  static async getObjectInfo(bucketName, objectName) {
    try {
      if (!bucketName || !objectName) {
        throw new Error("Bucket name and object name are required");
      }

      return await MediaModel.getObjectInfo(bucketName, objectName);
    } catch (error) {
      throw error;
    }
  }

  static async deleteObject(bucketName, objectName) {
    try {
      if (!bucketName || !objectName) {
        throw new Error("Bucket name and object name are required");
      }
      return await MediaModel.deleteObject(bucketName, objectName);
    } catch (error) {
      throw error;
    }
  }

  static async deleteObjects(bucketName, objectName) {
    try {
      if (!bucketName || !objectName) {
        throw new Error("Bucket name and object name are required");
      } else if (!Array.isArray(objectName)) {
        throw new Error("objectName should be an array of object names");
      }
      return await MediaModel.deleteObjects(bucketName, objectName);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = MediaService;
