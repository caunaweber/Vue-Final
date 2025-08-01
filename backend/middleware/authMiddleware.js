const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Acesso negado! Nenhum token fornecido.' });
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({ message: 'Token em formato inválido.' });
    }

    const token = parts[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
        
        req.userId = decoded.id;
        req.username = decoded.username;

        next(); //
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido ou expirado.' });
    }
};