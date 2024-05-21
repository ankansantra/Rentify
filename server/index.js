const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");


const authRoutes = require("./routes/auth.js")
const listingRoutes = require("./routes/listing.js")
const bookingRoutes = require("./routes/booking.js")
const userRoutes = require("./routes/user.js")


app.use(cors({
  origin : ["https://rentify-flax.vercel.app"],
  methods: ["POST", "GET","PATCH", "DELETE"],
  credentials: true
}));
app.use(express.json());
app.use(express.static("public"));

/* ROUTES */
app.use("/auth", authRoutes)
app.use("/properties", listingRoutes)
app.use("/bookings", bookingRoutes)
app.use("/users", userRoutes)
app.use("/", (req,res) => {
  res.send("Server is running!")
})

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 3001; 
mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "Rentify"
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((err) => console.log(`${err} did not connect`));
