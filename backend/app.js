const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const adminRoute = require("./routes/adminRoute");
const blogRoute = require("./routes/blogRoutes");
const productRoute = require("./routes/productRoutes");
const emailRoutes = require("./routes/emailRoutes");
const recipeRoute = require("./routes/recipeRoute");

app.use(cors());
app.use(express.json());

const connectDB = require("./database/db_connection");
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(process.env.PORT ? process.env.PORT : 5000, () => {
  console.log(`app listening on PORT ${process.env.PORT}`);
});

app.use("/admin", adminRoute);
app.use("/blogs", blogRoute);
app.use("/products", productRoute);
app.use("/recipe", recipeRoute);
app.use("/sendemail", emailRoutes);
