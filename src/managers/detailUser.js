const detailUser = async (req, res) => {
    try {
        return res.json(req.loggedUser);

    } catch (error) {
        return res.status(500).json({ mensagem: 'É necessário um token válido.' });
    }
}

module.exports = {
    detailUser
}