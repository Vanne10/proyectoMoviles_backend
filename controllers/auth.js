const { response } = require("express");
const { validationResult } = require("express-validator");
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");

const crearUsuario = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        //Buscar en la BD si el correo existe
        const existeEmail = await Usuario.findOne({ email: email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El Email ya esta registrado'
            });
        }

        //Crear una instancia del modelo
        const usuario = new Usuario(req.body);

        //Encriptar
        //Generamos un salt
        const salt = bcrypt.genSaltSync();
        //Encriptar
        usuario.password = bcrypt.hashSync(password, salt);


        //Guardamos en la base de datos
        await usuario.save();

        res.json({
            ok: true,
            usuario
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error en el servidor"
        });
    }
}

module.exports = {
    crearUsuario
}