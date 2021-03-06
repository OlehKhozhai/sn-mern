const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const config = require("config");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");

/**
 * @route /api/auth
 * @desc Return user
 * @access Private
 */
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (e) {
    res.status(500).send("Server Error");
  }
});

/**
 * @route   /api/auth
 * @desc    Login
 * @access  Public
 */
router.post(
  "/",
  [
    check("email", "Invalid email").isEmail(),
    check("password", "Password is require").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json([{ msg: "Invalid credential" }]);
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json([{ msg: "Invalid credential" }]);
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token, name: user.name, email: user.email });
        }
      );
    } catch (e) {
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
