const jwt = require("jsonwebtoken");
const Sesion = require("../models/Sesion");
require("dotenv").config();

const protectRoute = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).send("Es necesario un token de acceso.");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;

    next();
  } catch (error) {
    console.log("Error de token:", error.message);

    if (error.name === "TokenExpiredError") {
      // Si el token expiró, eliminar la sesión de la base de datos
      const decoded = jwt.decode(token);
      if (decoded && decoded.id_sesion) {
        await Sesion.update(
          { fecha_fin: new Date() },
          { where: { id_sesion : decoded.id_sesion, fecha_fin: null } }
      );
      }
    }

    return res.status(401).send("Token inválido o expirado.");
  }
};

module.exports = protectRoute;
