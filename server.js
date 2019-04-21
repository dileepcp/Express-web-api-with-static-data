const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;
const studentApi = require("./Routes/Api/Student");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/students", studentApi);
app.listen(PORT, () => {
  console.log(`server started at:${PORT}`);
});
