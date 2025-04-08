const express = require("express");
const {
  crearEmpresa,
  getEmpresas,
} = require("../controllers/empresaController");
const protectRoute = require("../middlewares/protectRoute");
const router = express.Router();

router.post("/crear", protectRoute, crearEmpresa);
router.get("/", getEmpresas);

module.exports = router;
