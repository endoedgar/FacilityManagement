const { Router, json } = require("express");

const authenticateJWT = require("../middlewares/authenticateJWT");
const canUpdateUser = require("../middlewares/canUpdateUser");
const { getJWT } = require("../util/jwt");

const User = require("../schemas/user");

const router = Router();

router.get("/", authenticateJWT, async (req, res) => {
  res.send(await User.find({}, "name username admin"));
});

router.get("/:username", authenticateJWT, async (req, res, next) => {
  const user = await User.findOne({ username: req.params.username });
  user ? res.send(user) : res.status(404).send({ message: "User not found." });
});

router.patch(
  "/:username",
  authenticateJWT,
  canUpdateUser,
  json(),
  async (req, res, next) => {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { username: req.params.username },
        { $set: req.body },
        { new: true }
      );

      let response = {
        status: "success",
        message: "User updated successfully!"
      };
      if (req.user.username === req.params.username) {
        response = { ...response, ...getJWT(updatedUser) };
      }

      res.status(202).json(response);
    } catch (err) {
      return next(err);
    }
  }
);

router.post("/", json(), async (req, res, next) => {
  new User(req.body).save(err => {
    if (err) return next(err);
    res
      .status(201)
      .send({ message: "User created successfully.", ...getJWT(req.body) });
  });
});

module.exports = router;
