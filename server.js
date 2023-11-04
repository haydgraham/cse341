const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./db/connect");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const port = process.env.PORT || 8080;
const app = express();

// Middleware for JSON request body and CORS
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// Initialize passport for OAuth
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "568417694108-frag9tgrtg8va7es9hhruoic4pi83tie.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "https://cse341-qga0.onrender.com", // Define your callback URL
    },
    (accessToken, refreshToken, profile, done) => {
      // Check if the user is already in your database by searching for their Google ID
      User.findOne({ googleId: profile.id }, (err, existingUser) => {
        if (err) {
          return done(err);
        }

        if (existingUser) {
          // User is already registered, return the existing user
          return done(null, existingUser);
        }

        // User is not registered, create a new user in your database
        const newUser = new User({
          googleId: profile.id,
          email: profile.emails[0].value,
          // Additional user data can be extracted from the 'profile' object
        });

        newUser.save((err) => {
          if (err) {
            return done(err);
          }

          return done(null, newUser);
        });
      });
    }
  )
);

app.use(passport.initialize());

// Define your routes here
app.use("/", require("./routes"));

// OAuth routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Successful authentication, redirect or respond as needed
    res.redirect("/dashboard"); // For example, redirect to a dashboard page
  }
);

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
