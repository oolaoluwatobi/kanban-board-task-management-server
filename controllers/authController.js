const User = require('../model/User');
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { userName, pwd } = req.body;
  if (!userName || !pwd) return res.status(400).json({ message: "Username and password are required." });

  const foundUser = await User.findOne({ username: userName }).exec();
  if (!foundUser) return res.sendStatus(401); //unauthorized
  // evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  console.log("match:", match, "ln: 14 authCont...")
  console.log("foundUser:", foundUser, "ln: 15 authCont...")
  
  if (match) {
    console.log("match:", match, "ln: 18 authCont...")
    const roles = Object.values(foundUser.roles);

    console.log("roles:", roles, "ln: 21 authCont...")
    //create JWTs
    const accessToken = jwt.sign(
      {
        "UserInfo": {
          "username": foundUser.username,
          "roles": roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" } // 5-15 mins in production
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" } // Several hours/a day/ days in production
    );
    // Saving refreshToken with crrent user
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log(result, "ln:41 authCont...");
    
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    }); // secure: true in production
    res.json({ accessToken });
  } else {
    res.status(401).json({ 'message': 'Password mismatch.'});
  }
};

module.exports = { handleLogin };
