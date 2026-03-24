const envConfig = {
  // MINIO_ROOT_USER and MINIO_ROOT_PASSWORD are required for MinIO server authentication
  MINIO_ROOT_USER: process.env.MINIO_ROOT_USER,
  MINIO_ROOT_PASSWORD: process.env.MINIO_ROOT_PASSWORD,
  MINIO_CONSOLE_PORT: process.env.MINIO_CONSOLE_PORT,
  MINIO_API_PORT: process.env.MINIO_API_PORT,

  // PORT is the port number on which the server will listen for incoming requests
  PORT: process.env.PORT,
  // ENDPOINT is the address of the MinIO server, defaulting to "localhost" if not specified
  ENDPOINT: process.env.ENDPOINT || "localhost",
  // ACCESS_KEY is the access key for MinIO server authentication
  ACCESS_KEY: process.env.ACCESS_KEY,
  // SECRET_KEY is the secret key for MinIO server authentication
  SECRET_KEY: process.env.SECRET_KEY,
};

module.exports = envConfig;
