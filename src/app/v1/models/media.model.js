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

  static async downloadObject(bucketName, objectName) {
    try {
      const dataStream = await minioClient.getObject(bucketName, objectName);
      return dataStream;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = MediaModel;
