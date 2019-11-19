const { check, validationResult } = require("express-validator");
const config = require("config");
const request = require("request");
const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

/**
 * @route   GET /api/profile/me
 * @desc    Get users profile
 * @access  Private
 */
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});

/**
 * @route   POST /api/profile
 * @desc    Create and update users profile
 * @access  Private
 */
router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required")
        .not()
        .isEmpty(),
      check("skills", "Skills is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      location,
      website,
      status,
      skills,
      bio,
      githubusername,
      youtube,
      facebook,
      instagram,
      linkedin
    } = req.body;
    const profileFields = {};
    profileFields.social = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (location) profileFields.location = location;
    if (website) profileFields.website = website;
    if (status) profileFields.status = status;
    if (bio) profileFields.bio = bio;
    if (githubusername) profileFields.githubusername = githubusername;
    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (skills) {
      profileFields.skills = skills.split(",").map(skill => skill.trim());
    }

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (!profile) {
        // Create profile
        profile = new Profile(profileFields);
        await profile.save();
        return res.json(profile);
      }

      // Update profile
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      res.json(profile);
    } catch (err) {
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

/**
 * @route   GET /api/profile
 * @desc    Get all users profiles
 * @access  Public
 */
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    if (!profiles) {
      return res.status(400).json({ msg: "Profiles not found" });
    }
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});

/**
 * @route   GET /api/profile/user/:user_id
 * @desc    Get user profile by id
 * @access  Public
 */
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ msg: "Profiles not found" });
    }
    res.json(profile);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: "Profiles not found" });
    }
    res.status(500).json({ msg: "Server Error" });
  }
});

/**
 * @route   DELETE /api/profile
 * @desc    Delete profile and user
 * @access  Private
 */
router.delete("/", auth, async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User Deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});

/**
 * @route   PUT /api/profile/experience
 * @desc    Create user profile experience
 * @access  Private
 */
router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Title is required")
        .not()
        .isEmpty(),
      check("company", "Company is required")
        .not()
        .isEmpty(),
      check("from", "Date is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;

    const newExperience = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    };

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (!profile) {
        return res.status(400).json({ msg: "Profile not found" });
      }
      profile.experience.unshift(newExperience);
      await profile.save();
      res.json(profile);
    } catch (err) {
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

/**
 * @route   DELETE /api/profile/experience
 * @desc    Delete user experience
 * @access  Private
 */
router.delete("/experience/:id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(400).json({ msg: "Profile not found" });
    }

    const experienceIndex = profile.experience
      .map(({ _id }) => _id)
      .indexOf(req.params.id);
    profile.experience.splice(experienceIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});

/**
 * @route   PUT /api/profile/education
 * @desc    Create user profile education
 * @access  Private
 */
router.put(
  "/education",
  [
    auth,
    [
      check("school", "School is required")
        .not()
        .isEmpty(),
      check("degree", "Degree is required")
        .not()
        .isEmpty(),
      check("fieldofstudy", "Field of study is required")
        .not()
        .isEmpty(),
      check("from", "Date is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body;

    const newEducation = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    };

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (!profile) {
        return res.status(400).json({ msg: "Profile not found" });
      }
      profile.education.unshift(newEducation);
      await profile.save();
      res.json(profile);
    } catch (err) {
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

/**
 * @route   DELETE /api/profile/education
 * @desc    Delete user education
 * @access  Private
 */
router.delete("/education/:id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(400).json({ msg: "Profile not found" });
    }

    const educationIndex = profile.education
      .map(({ _id }) => _id)
      .indexOf(req.params.id);
    profile.education.splice(educationIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});

/**
 * @route   GET /api/profile/github/:username
 * @desc    Get user github repositories
 * @access  Public
 */
router.get("/github/:username", (req, res) => {
  try {
    const query = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=creates:asc&client_id=${config.get(
        "githubClientId"
      )}&client_secret=${config.get("githubClientSecret")}`,
      method: "GET",
      headers: { "user-agent": "node.js" }
    };

    request(query, (err, response, body) => {
      if (err) return res.status(404).json({ msg: "Not found" });
      if (response.statusCode !== 200)
        return res.status(404).json({ msg: "Not found" });
      return res.json(JSON.parse(body));
    });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
