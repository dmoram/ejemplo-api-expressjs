const { DataTypes } = require("sequelize");
const sequelizeInstance = require("../db/SequelizeConfig");
const Empresa = require("../models/Empresa");

const crearEmpresa = async (req, res) => {
  const { nombre_empresa, habilitado, ruta } = req.body; 

  try {
    // Validación simple de los datos de entrada
    if (!nombre_empresa || habilitado === undefined) {
      return res.status(400).json({
        error: "Nombre de empresa y habilitado son campos requeridos",
      });
    }

    const nuevaEmpresa = await Empresa.create({
      nombre_empresa: nombre_empresa,
      habilitado: habilitado,
      ruta: ruta
    });

    // Respuesta exitosa con los datos de la nueva empresa
    res.status(201).json(nuevaEmpresa);
  } catch (error) {
    console.error("Error al crear la empresa:", error);
    res
      .status(500)
      .json({ error: "Ocurrió un error al intentar crear la empresa" });
  }
};

const getEmpresas = async (req, res) => {
  try {
    // Buscar todas las empresas en la base de datos, seleccionando solo id_empresa y nombre_empresa
    const empresas = await Empresa.findAll({
      attributes: ['id_empresa', 'nombre_empresa']
    });

    // Responder con la lista de empresas (solo id y nombre)
    res.status(200).json(empresas);
  } catch (error) {
    console.error("Error al obtener las empresas:", error);
    res.status(500).json({ error: "Ocurrió un error al intentar obtener las empresas" });
  }
};



module.exports = { crearEmpresa, getEmpresas, getTipoEstructuraById };
