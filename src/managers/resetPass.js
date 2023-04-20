const { query } = require("../config/dataBase");
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const resetPass = async (req, res) => {
    const { email } = req.body;

    if (!email) return res.status(400).json({ mensagem: 'Campo obrigatorio' });

    try {
        const userExists = await query(`SELECT * FROM usuarios WHERE email = $1`, [email]);
        if (!userExists) return res.status(401).json({ message: 'Email não cadastrado.' });

        const { token, expirationDate } = generatePasswordResetToken(60);
        const resetPasswordLink = `https://site.com/resetpass/${token}`;

        await query('UPDATE recuperacao_senha SET token_recuperacao_senha = $1, token_expiracao = $2 WHERE email = $3', [token, expirationDate, email]);

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'email@gmail.com',
                pass: 'senha',
            },
        });

        const mailOptions = {
            from: 'email@gmail.com',
            to: email,
            subject: 'Recuperação de senha',
            html: `Olá ${user.rows[0].name},<br><br> Você solicitou a recuperação de senha.
             Por favor, clique no link abaixo para redefinir a sua senha:<br><br><a href="${resetPasswordLink}">${resetPasswordLink}</a>
             <br><br>
             Se você não solicitou a recuperação de senha, por favor ignore este e-mail.
             <br><br>Atenciosamente,<br>Equipe Site`,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`E-mail enviado para ${email}: ${info.messageId}`);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: `Erro encontrado: ${error.message}` });
    }
}

function generatePasswordResetToken(expirationTimeInMinutes) {
    const token = crypto.randomBytes(20).toString('hex');
    const expirationDate = new Date(Date.now() + expirationTimeInMinutes * 60000);
    return {
        token: token,
        expires: expirationDate,
    };
}

module.exports = {
    resetPass
}