require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/users");
const app = express();

app.use(express.json());
app.use(cors({ // enable two sites to communicate
  credentials: true,
  origin: "http://localhost:5173",
}));

const bcryptSalt = bcrypt.genSaltSync(8);
const jwtSecret = "fshewfbjhcdsbchdbsckjf";

mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
  res.json("test ok"); 
});

app.post("/register", async (req, res) => { // async: to avoid object not match error
  const {name, email, password} = req.body;
  try {const userData = await User.create({
    name,
    email,
    password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userData);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/login", async (req, res) => {
  const {email, password} = req.body;
  try {
    const userData = await User.findOne({email});
    if (userData) {
      const pass = bcrypt.compareSync(password, userData.password);
      if (pass) {
        jwt.sign({email: userData.email, id: userData._id}, jwtSecret, {}, (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json("password is correct"); // set a cookie
        }); 
      } else {
        res.status(422).json("password is wrong");
      }
    } else {
      res.status(422).json(e);
    }
  } catch (e) {
    res.status(422).json(e);
  }

});


app.listen(4000);