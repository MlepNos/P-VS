const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const blogRoutes = require("./routes/blog");
const { connectToDatabase } = require("./controller/connect.js");

const app = express();

// CORS Middleware
app.use(cors());

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/blog", blogRoutes);

connectToDatabase()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Server is listening at http://localhost:${process.env.PORT}`
      );
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database", err);
  });
