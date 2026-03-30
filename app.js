const express = require("express");
const cors = require("cors");// server_Daniel.js
//create the Express app
const path = require("path");
const bodyParser = require("body-parser");
//require("dotenv").config();

const mongoose = require("mongoose");// server_Daniel.js

const Member = require("./models/Member");

const app = express();
const port = 3000;

const session = require("express-session");
app.use(session({
  secret: "flexifit-secret",
  resave: false,
  saveUninitialized: true
}));





//Middleware// need for work req.body
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//serve css from public folder
app.use(express.static(path.join(__dirname, "public")));





//set ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


const mongoURI = "mongodb://localhost:27017/flexifitDB";//server_Daniel.js
mongoose.connect(mongoURI)//server_Daniel.js
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB connection error:", err));
// Routes

app.get("/", (req, res) => {
  res.redirect('/login');
});

app.get("/login", (req, res) => {
  const email = req.query.email || "";
  const error = req.query.error || "";
  res.render("login", { title: "Login", email, error });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;  
 //if fields are empty, redirect back to login with error message and preserve email input
  if (!email||!password) {
    return res.redirect("/login?error=" + encodeURIComponent("Invalid credentials: password.") + "&email=" + encodeURIComponent(email));
  }
    try {
      const member = await Member.findOne ({ email, password });
      if (member) {
        req.session.email = member.email; // Store email in session
        //login successful, redirect to index page
         return res.redirect('/index');
      } else {
        //invalid credentials, redirect back to login with error message and preserve email input
         return res.redirect('/login?error=' + encodeURIComponent("Invalid credentials.") + '&email=' + encodeURIComponent(email));
      }
    } catch (error) {
      console.error(error);
      return res.redirect("/login?error=" + encodeURIComponent("An error occurred.") + "&email=" + encodeURIComponent(email));
    }
  
});

app.get("/register", (req, res) => {
  res.render('register', { title: 'Register' });
});


app.post("/register", async (req, res) => {
  const { firstName, lastName, email, dateOfBirth, address, membershipType, phoneNumber, password } = req.body;
  if(firstName&&lastName&&email&&password) {
    try{
      const newMember = new Member({
        firstName,
        lastName,
        email,  
        dateOfBirth,
        address,
        membershipType,
        phoneNumber,
        password
      });
      await newMember.save();
      console.log("User saved to database");
      res.json({ message: "Member registered successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error registering member" });
    }
  }else {
    res.redirect('/register?error=Please fill in all fields.');
  }
});
   

app.get("/index", (req, res) => {
  if (!req.session.email) {
    return res.redirect("/login");
  }
  res.render('index', { title: 'Home' });
});


app.get("/membershipPlans", (req, res) => {
  res.render('membershipPlans', { title: 'Membership Plans' });
}); 

app.post("/select-plan", async (req, res) => {
  const  plan = req.body.plan;

  
  
  try {
    await Member.updateOne(
      { email: req.session.email },
      { membershipType: plan } // Assuming you have the user's email in the request body
    );

    res.redirect("/index");
  } catch (error) {
    console.error("Error updating membership plan:", error);
    res.send("An error occurred while updating the membership plan.");
  }
});

//start server
app.listen(port, () => {
  console.log(`FlexiFittApp is listening at http://localhost:${port}`);
});
