const app = require("./src/app/app");

const server = app.listen(process.env.PORT, () => {
  console.log(`Server runing on port http://localhost:${process.env.PORT}`);
});
