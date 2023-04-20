const { query } = require('../config/dataBase');
const bcrypt = require('bcrypt');

const userRegister = async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha)
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios!' });

    try {
        const result = await query(`SELECT * FROM usuarios WHERE email = $1`, [email]);
        if (result.rowCount > 0)
            return res.status(400).json({ mensagem: "E-mail já existe!" });

        const encryptedPassword = await bcrypt.hash(senha, 10);
        const registerParameters = [nome, email, encryptedPassword];
        const register = await query(`
            INSERT INTO usuarios (nome,email,senha)
            VALUES ($1,$2,$3) returning *`, registerParameters
        );

        const registeredAccount = register.rows[0];
        const { senha: _, ...userData } = registeredAccount;
        return res.status(200).json(userData);

    } catch (error) {
        return res.status(500).json({ mensagem: `Erro interno do registro: ${error.message}` });
    }
}

module.exports = {
    userRegister
}