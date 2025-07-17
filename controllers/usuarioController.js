const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');

exports.createUsuario = async (req, res) => {
    const { username, senha } = req.body;

    try {
        const senhaCriptografada = bcrypt.hashSync(senha, 10);

        const novoUsuario = await Usuario.create({
            username,
            senha: senhaCriptografada
        });

        novoUsuario.senha = undefined;
        res.status(201).json(novoUsuario);
    
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'Este e-mail já está em uso.' });
        }
        res.status(500).json({ message: 'Erro ao registrar usuário.' });
    }
};