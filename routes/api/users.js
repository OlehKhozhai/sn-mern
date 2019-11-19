const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const gravatar = require("gravatar");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");
const router = express.Router();

/**
 * @route   /api/users
 * @desc    Registration
 * @access  Public
 */
router.post(
  "/",
  [
    check("name", "Name field is require")
      .not()
      .isEmpty(),
    check("email", "Invalid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or mor charters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json([{ msg: "User with same email already exist" }]);
      }
      const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });
      user = new User({
        name,
        email,
        password,
        avatar
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

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
          res.json({ token });
        }
      );
    } catch (e) {
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
