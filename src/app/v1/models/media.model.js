const BUCKET_NAME = require("../../../utils/constaints");
const minioClient = require("../configs/minio.config");

class MediaModel {
  static async uploadObject({ originalname, mimetype, buffer }) {
    try {
      const bucketExists = await minioClient.bucketExists(BUCKET_NAME);

      if (!bucketExists) {
        await minioClient.makeBucket(BUCKET_NAME, "us-east-1");
      }

      await minioClient.putObject(
        BUCKET_NAME,
        originalname,
        buffer,
        buffer.length,
        {
          "Content-Type": mimetype,
        },
      );

      return {
        bucket: BUCKET_NAME,
        objectName: originalname,
      };
    } catch (error) {
      throw error;
    }
  }

  static async uploadObjects({ objectFile }) {
    try {
      const uploadPromise = objectFile.map(
        ({ originalname, buffer, mimetype }) => {
          minioClient.putObject(
            BUCKET_NAME,
            originalname,
            buffer,
            buffer.length,
            {
              "Content-Type": mimetype,
            },
          );
        },
      );
      await Promise.all(uploadPromise);
    } catch (error) {
      throw error;
    }
  }

  static async viewObject(bucketName, objectName) {
    try {
      const dataStream = await minioClient.getObject(bucketName, objectName);
      return dataStream;
    } catch (error) {
      throw error;
    }
  }

  static async getObjectStat(bucketName, objectName) {
    try {
      const objectStat = await minioClient.statObject(bucketName, objectName);
      return objectStat;
    } catch (error) {
      throw error;
    }
  }

  static async getObjectUrl(bucketName, objectName, expiry) {
    try {
      const url = await minioClient.presignedUrl(
        "GET",
        bucketName,
        objectName,
        expiry,
      );
      return url;
    } catch (error) {
      throw error;
    }
  }

  static async getObjectInfo(bucketName, objectName) {
    try {
      const objectInfo = await minioClient.statObject(bucketName, objectName);
      return objectInfo;
    } catch (error) {
      throw error;
    }
  }

  static async deleteObject(bucketName, objectName) {
    try {
      const deleted = await minioClient.removeObject(bucketName, objectName);
      return deleted;
    } catch (error) {
      throw error;
    }
  }

  static async deleteObjects(bucketName, objectName = []) {
    try {
      const deleted = await minioClient.removeObjects(bucketName, objectName);
      return deleted;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = MediaModel;
