const { query } = require("../config/dataBase");
const fs = require('fs');
const csv = require('csv-parser');


async function somarSaldos(documento, valor, data_upload, loggedUser) {
    try {
        const result = await query(`SELECT * FROM transacoes_usuario WHERE 
        documento = $1 AND data_lancamento = $2`, [documento, data_upload]);

        if (result.rows.length === 0) {
            await query(`INSERT INTO transacoes_usuario (documento, saldo, data_lancamento, usuario_id) 
            VALUES ($1, $2, $3, $4)`, [documento, valor, data_upload, loggedUser]);
        } else {
            const saldoAtual = Number(result.rows[0].saldo);

            const saldoTotal = saldoAtual + valor;

            await query(`UPDATE transacoes_usuario SET 
            saldo = $1 WHERE id = $2`, [saldoTotal, result.rows[0].id]);
        }

    } catch (error) {
        console.log(error)
    }
}

const addData = async (filePath, loggedUser, res) => {
    const data_upload = new Date().toISOString().slice(0, 10);

    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', async (row) => {
            const documento = row.documento;

            const valor = parseFloat(row.valor);

            await somarSaldos(documento, valor, data_upload, loggedUser);
        })
        .on('end', () => {
            return
        });

}

module.exports = {
    addData
}