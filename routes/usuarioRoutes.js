const express = require("express");
const {
  loginUser,
  registerUser,
} = require("../controllers/usuarioController");
const protectRoute = require("../middlewares/protectRoute");
const checkAdmin = require("../middlewares/checkAdmin");
const router = express.Router();

router.post("/login", loginUser);
router.post("/registrar", protectRoute, checkAdmin, registerUser);

module.exports = router;
