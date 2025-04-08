const Cliente = require("../models/Cliente"); // modelo cliente
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const saltRounds = 10;

// Login
const loginUser = async (req, res) => {
    const { nombre_usuario, contraseña, id_empresa } = req.body;

    try {
        const user = await Cliente.findOne({ where: { nombre_usuario, id_empresa, activo: true } });

        if (!user) {
            return res.status(401).send("Usuario o empresa no válidos");
        }

        const match = await bcrypt.compare(contraseña, user.contraseña);

        if (!match) {
            return res.status(401).send("Contraseña incorrecta");
        }

        const token = jwt.sign(
            {
                id_usuario: user.id_usuario,
                nombre_usuario: user.nombre_usuario,
                id_empresa: user.id_empresa,
                admin: user.admin,
            },
            process.env.JWT_KEY,
            { expiresIn: "1h" }
        );

        res.json({
            mensaje: "Login exitoso",
            token,
            id_usuario: user.id_usuario,
            nombre_completo: user.nombre_completo,
            tipo_acceso: user.tipo_acceso,
            admin: user.admin,
            nombre_carpeta: user.nombre_carpeta,
            ruta_acceso: user.ruta_acceso,
        });
    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).send("Error en el servidor");
    }
};

// Registro
const registerUser = async (req, res) => {
    const {
        nombre_usuario,
        contraseña,
        nombre_completo,
        tipo_acceso,
        admin,
        id_empresa,
        ruta_acceso,
        nombre_carpeta,
        creado_por,
    } = req.body;

    try {
        const existe = await Cliente.findOne({
            where: { nombre_usuario, id_empresa, activo: true },
        });

        if (existe) {
            return res.status(409).send("El usuario ya existe en esta empresa");
        }

        const hashedPassword = await bcrypt.hash(contraseña, saltRounds);

        await Cliente.create({
            nombre_usuario,
            contraseña: hashedPassword,
            nombre_completo,
            tipo_acceso,
            admin,
            id_empresa,
            activo: true,
            ruta_acceso,
            nombre_carpeta,
            creado_por,
        });

        res.status(201).send("Usuario registrado correctamente");
    } catch (error) {
        console.error("Error en registro:", error);
        res.status(500).send("Error al registrar usuario");
    }
};

module.exports = {
    loginUser,
    registerUser,
};
