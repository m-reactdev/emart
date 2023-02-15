const express = require("express");
const {
  registerUser,
  registerUserWithGoogle,
  loginUser,
  updateUser,
} = require("../controllers/UserControllers");

const router = express.Router();

router.post("/user-create", registerUser);

router.post("/google-signup", registerUserWithGoogle);

router.post("/login-user", loginUser);

router.put("/update-user", updateUser);

module.exports = router;
