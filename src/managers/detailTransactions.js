const { query } = require("../config/dataBase");

const detailTransactions = async (req, res) => {

    try {
        const { id } = req.loggedUser;
        const { rows } = await query(`SELECT * FROM transacoes_usuario WHERE usuario_id= $1 `, [id]);
        return res.status(200).json(rows);


    } catch (error) {
        return res.status(500).json({ mensagem: "erro interno do servidor" });
    }
}
module.exports = {
    detailTransactions
}