const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
            return res.status(400).json({ message: 'Este username já está em uso.' });
        }
        res.status(500).json({ message: 'Erro ao registrar usuário.' });
    }
};

exports.login = async (req, res) => {
    const { username, senha } = req.body;

    try {
        const usuario = await Usuario.findOne({ where: { username } });
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        const senhaValida = bcrypt.compareSync(senha, usuario.senha);
        if (!senhaValida) {
            return res.status(401).json({ message: 'Senha inválida.' });
        }

        const token = jwt.sign(
            { id: usuario.id, username: usuario.username },
            process.env.JWT_SECRET || 'secret123',
            { expiresIn: '1h' }
        );

        res.status(200).json({ token: token });
    } catch (error) {
        res.status(500).json({ message: 'Erro interno no servidor.' });
    }
};