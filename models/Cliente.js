const {DataTypes} = require('sequelize');
const sequelizeInstance = require('../db/SequelizeConfig');
const Empresa = require('./Empresa')

const Cliente = sequelizeInstance.define('cliente', {
    id_usuario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    nombre_usuario: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    contraseña: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    nombre_completo: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    tipo_acceso: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    id_empresa:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {model: Empresa, key: 'id_empresa'}
    },
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    ruta_acceso: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    nombre_carpeta: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    creado_por: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    });

Empresa.hasMany(Cliente, {foreignKey: "id_empresa"});

module.exports = Cliente