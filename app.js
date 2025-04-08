const express = require("express");
const bodyParser = require("body-parser");
const sequelizeInstance = require("./db/SequelizeConfig");
const app = express();
app.use(bodyParser.json());
const cors = require("cors");



app.use(
  cors({
    origin: ["http://192.168.10.68:3000", "http://localhost:3000", "http://192.168.10.68:3001", "http://localhost:3001", "http://192.168.10.28", "http://190.151.63.107"],
  })
);


const usuarioRoutes = require("./routes/usuarioRoutes");
const empresaRoutes = require("./routes/empresaRoutes");
const archivoRoutes = require("./routes/archivosRoutes");


app.use("/api/usuarios", usuarioRoutes);
app.use("/api/empresas", empresaRoutes);
app.use("/api/files", archivoRoutes);

const IP = process.env.HOST_IP;
const PORT = process.env.PORT;

// Sincronizar los modelos y luego iniciar el servidor
sequelizeInstance.sync().then(() => {
  app.listen(PORT, IP, () => {
    console.log(`Server is running on http://${IP}:${PORT}`);
  });
});
