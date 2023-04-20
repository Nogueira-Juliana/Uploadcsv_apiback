const { query } = require("../config/dataBase");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const logIn = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) return res.status(400).json({ mensagem: 'Todos os campos são obrigatorios' });

    try {
        const result = await query(`SELECT * FROM usuarios WHERE email = $1`, [email]);
        if (!result) return res.status(401).json({ message: 'Usuário não cadastrado.' });

        const foundUser = result.rows[0];
        if (!foundUser) return res.status(401).json({ message: 'Credenciais inválidas!' });

        const match = await bcrypt.compare(senha, foundUser.senha);
        if (!match) return res.status(401).json({ message: 'Credenciais inválidas!' });

        const token = jwt.sign({ id: foundUser.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        const idUser = foundUser.id;

        return res.status(200).json({ token });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: `Erro encontrado: ${error.message}` });
    }
}

module.exports = {
    logIn
}