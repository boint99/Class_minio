🚀 File Upload API with MinIO & Node.js

API upload file sử dụng Node.js và MinIO (S3-compatible object storage).
Hỗ trợ upload, lấy file và quản lý file đơn giản.

📌 Features
Upload file lên MinIO
Lấy file (public URL / stream)
Xóa file
Hỗ trợ nhiều loại file (image, pdf, zip…)
Sử dụng chuẩn S3 API

🏗️ Tech Stack
Node.js (Express)
MinIO (Object Storage)
Multer (Upload middleware)
AWS SDK / MinIO SDK

⚙️ Requirements
Node.js >= 20
Docker (optional, để chạy MinIO)
MinIO Server

🐳 Setup MinIO (Docker)
docker run -d \
 -p 9000:9000 \
 -p 9001:9001 \
 -e "MINIO_ROOT_USER=admin" \
 -e "MINIO_ROOT_PASSWORD=password" \
 quay.io/minio/minio server /data --console-address ":9001"
Console: http://localhost:9001
API: http://localhost:9000

🔐 Environment Variables

Tạo file .env:

PORT=3000

MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_USE_SSL=false
MINIO_ACCESS_KEY=admin
MINIO_SECRET_KEY=password
MINIO_BUCKET=uploads
📦 Installation
git clone https://github.com/boint99/Class_minio.git
cd Class_minio

npm install
▶️ Run Project
npm run dev
📁 Project Structure
├── app/
│ ├── v1/
│ │ ├── config/
│ │ │ └── minio.config.js
│ │ │
│ │ ├── controllers/
│ │ │ └── file.controller.js
│ │ │
│ │ ├── routes/
│ │ │ └── file.routes.js
│ │ │
│ │ ├── services/
│ │ │ └── file.service.js
│ │ │
│ │ ├── models/
│ │ │ └── file.model.js
│ │ │
│ │ └── index.js // (optional: gom route v1)
│ │
│ └── app.js
│
├── utils/
│ └── (helper functions, upload utils, etc.)
│
└── server.js
📤 API Endpoints

1. Upload File
   POST api/file/upload/single
   POST api/file/upload/multiple

Form-data:
file: file upload

Response:

{
"url": "http://localhost:9000/uploads/abc.png"
}

2. Get File
   GET /files/:filename

3. Delete File
   DELETE /files/:filename

🧠 Sample Code (MinIO Client)
const Minio = require('minio')

const minioClient = new Minio.Client({
endPoint: process.env.MINIO_ENDPOINT,
port: parseInt(process.env.MINIO_PORT),
useSSL: process.env.MINIO_USE_SSL === 'true',
accessKey: process.env.MINIO_ACCESS_KEY,
secretKey: process.env.MINIO_SECRET_KEY,
})

module.exports = minioClient

📌 Notes
Bucket cần được tạo trước hoặc auto create trong code
Có thể set bucket policy để public file
Nếu dùng production → nên bật SSL
