import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import passport from "passport";
import GitHubStrategy from "passport-github2";
import session from "express-session";
import cors from "cors";

const app = express();

const frontend = process.env.FRONTEND_URL || "http://localhost:3000";

const successLoginUrl = `${frontend}/login/success`;
const errorLoginUrl = `${frontend}/error`;

// const successLoginUrl = "http://localhost:3000/login/success";
// const errorLoginUrl = "http://localhost:3000/error";
// const clientUrl = "http://localhost:3000";

const PORT = process.env.port || 3001;

app.use(cors({ origin: frontend, credentials: true }));

app.use(
  session({ secret: "my_secret", resave: false, saveUninitialized: false })
);

app.use(passport.initialize());

app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get(
  "/signin",

  /*for scopes check https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/scopes-for-oauth-apps */
  passport.authenticate("github", { scope: ["profile", "email"] })
);

passport.use(
  "github",
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    (accessToken, refreshToken, profile, cb) => {
      //add the token here
      profile.githubAccessToken = accessToken;

      return cb(null, profile);
    }
  )
);

app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: errorLoginUrl }),
  (req, res) => {
    console.log("You are authenticated");
    res.redirect(successLoginUrl);
  }
);

app.post("/logout", function (req, res, next) {
  res.clearCookie("connect.sid"); // Clear specific cookie

  req.logout(function (err) {
    if (err) {
      return next(err);
    }

    res.clearCookie("connect.sid"); // Clear specific cookie
    console.log("unauthenticated");

    res.sendStatus(200);
    //res.end();
  });
});

app.post("/logout", function (req, res) {
  req.session.destroy(function (err) {
    res.send();
  });
});

app.get("/auth/user", (req, res) => {
  if (req.isAuthenticated()) {
    return res.json(req.user);
  } else {
    return res.sendStatus(401);
  }
});

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
