const {DataTypes} = require('sequelize');
const sequelizeInstance = require('../db/SequelizeConfig');

const Empresa = sequelizeInstance.define('empresa', {
    id_empresa: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre_empresa: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    habilitado: {
        type: DataTypes.BOOLEAN,
        allowNull: false 
    },
    });

module.exports = Empresa