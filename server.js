const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// app.use("./routes/api.js");

app.use("./routes/api.js", function(req, res, next) {
  console.log("whatever this is a test", req.method)
})


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
