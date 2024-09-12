require("dotenv").config();
const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");
const verifyJWT = require("./middleware/verifyJWT");
const { verifyPayment } = require("./controllers/paymentController");
const cors = require("cors");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const PORT = process.env.PORT || 3500;

//connect to MongoDB database
connectDB();

//Handle options credentials check --before CORS!
//and fetch cookies credentials reqruirements
app.use(credentials);

//Cross Origin Resource sharing
app.use(cors(corsOptions));

//built-in middleware to handle to urlencoded data
app.use(express.urlencoded({ extended: false }));

//built-in middleware for json
app.use(express.json());

//middleware cookies
app.use(cookieParser());

//server static
app.use("/", express.static(path.join(__dirname, "/public")));

//routes
app.use("/", require("./routes/root"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));
app.use("/users", require("./routes/api/user"));
app.use("/payment-khalti", require("./routes/payment"));
app.use("/product", require('./routes/api/product'))

app.use(verifyJWT);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 not found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to mongoDB database");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
