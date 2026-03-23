const { Client } = require("minio");

const minioClient = new Client({
  endPoint: process.env.ENDPOINT || "localhost",
  port: parseInt(process.env.MINIO_API_PORT, 10) || 9000,
  accessKey: process.env.ACCESS_KEY,
  secretKey: process.env.SECRET_KEY,
  useSSL: false,
})

module.exports = minioClient;
