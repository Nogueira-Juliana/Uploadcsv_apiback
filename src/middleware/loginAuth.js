const { query } = require('../config/dataBase');
const jwt = require('jsonwebtoken');

const loginAuth = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ mensagem: 'Acesso não autorizado' });

    const token = authorization.split(" ")[1];

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET)
        const { rowCount, rows } = await query(`SELECT * FROM usuarios WHERE id = $1`, [id]);
        if (!rowCount) {
            return res.status(401).json({ mensagem: 'Acesso inválido.' });
        }

        const user = rows[0];

        const { password: _, ...userData } = user;

        req.loggedUser = userData;
        return next();


    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor na verificação' });
    }
}

module.exports = {
    loginAuth
}