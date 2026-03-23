const minioClient = require("../configs/minio.config");

const BUCKET_NAME = process.env.BUCKET_NAME || "media";

class FileModel {
  static async uploadFileSingle({ bucketName, fileName, fileBuffer, myType }) {
    try {
      const bucketExists = await minioClient.bucketExists(bucketName);
      if (!bucketExists) {
        await minioClient.makeBucket(bucketName, "us-east-1");
      }

      const metaData = {
        "Content-Type": myType,
      };

      await minioClient.putObject(
        bucketName,
        fileName,
        fileBuffer,
        fileBuffer.length,
        metaData,
      );

      const endPoint = process.env.ENDPOINT || "localhost";
      const port = process.env.MINIO_API_PORT || 9000;

      return {
        bucket: bucketName,
        objectName: fileName,
        url: `http://${endPoint}:${port}/${bucketName}/${fileName}`,
      };
    } catch (error) {
      throw error;
    }
  }

  static async uploadMultiplefile({ bucketName, objectFile }) {
    try {
      const uploadPromise = objectFile.map(
        ({ fileName, fileBuffer, mimetype }) => {
          minioClient.putObject(
            bucketName,
            fileName,
            fileBuffer,
            fileBuffer.length,
            {
              "content-type": mimetype,
            },
          );
        },
      );
      await Promise.all(uploadPromise);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = FileModel;
