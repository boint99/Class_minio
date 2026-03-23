const minioClient = require("../configs/minio.config");

const BUCKET_NAME = process.env.BUCKET_NAME || "media";

class FileModel {
  /**
   * Upload một file lên Minio
   * @param {Object} file - File object từ multer (req.file)
   * @param {String} objectName - Tên object trên Minio
   * @returns {Object} Thông tin file đã upload
   */
  static async uploadFileSingle({ bucketName, fileName, fileBuffer, myType }) {
    try {
      const bucketExists = await minioClient.bucketExists(bucketName);
      if (!bucketExists) {
        await minioClient.makeBucket(bucketName, "us-east-1");
      }

      const metaData = {
        "Content-Type": myType,
      };

      await minioClient.putObject(bucketName, fileName, fileBuffer, fileBuffer.length, metaData);

      const endPoint = process.env.ENDPOINT || "localhost";
      const port = process.env.MINIO_API_PORT || 9000;

      return {
        bucket: bucketName,
        objectName: fileName,
        url: `http://${endPoint}:${port}/${bucketName}/${fileName}`,
      };
    } catch (error) {
      console.log("🚀 ~ FileModel ~ uploadFileSingle ~ error:", error);
      throw error;
    }
  }

  /**
   * Xóa một file trên Minio
   * @param {String} objectName - Tên object cần xóa
   * @returns {Boolean} true nếu xóa thành công
   */
  static async deleteFile(objectName) {
    try {
      await minioClient.removeObject(BUCKET_NAME, objectName);
      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = FileModel;
