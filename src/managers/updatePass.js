const bcrypt = require('bcrypt');

const updatePass = async (req, res) => {
    const { email, token, newPassword } = req.body;

    try {
        const result = await query('SELECT * FROM recuperacao_senha WHERE email = $1 AND token_recuperacao_senha = $2 AND token_expiracao > NOW()', [email, token]);
        if (result.rows.length === 0) {
            throw new Error('Token inválido ou expirado');
        }

        const userId = result.rows[0].id;
        const encryptedNewPassword = await bcrypt.hash(newPassword, 10);

        await query('UPDATE usuarios SET senha = $1 WHERE id = $2', [encryptedNewPassword, userId]);
        await query('UPDATE recuperacao_senha SET token_recuperacao_senha = NULL, token_expiracao = NULL WHERE email = $1 AND token_recuperacao_senha = $2 ', [email, token]);

        res.status(200).send('Senha atualizada com sucesso');
    } catch (err) {
        res.status(400).send(err.message);
    }
};

module.exports = {
    updatePass
}