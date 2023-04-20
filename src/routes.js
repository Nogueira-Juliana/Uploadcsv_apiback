const express = require('express');
const multer = require('multer');
const routes = express();

const { loginAuth } = require('./middleware/loginAuth');
const { detailUser } = require('./managers/detailUser');
const { detailTransactions } = require('./managers/detailTransactions');
const { logIn } = require('./managers/logIn');
const { userRegister } = require('./managers/userRegister');
const { addData } = require('./managers/addData');
const { resetPass } = require('./managers/resetPass');
const { updatePass } = require('./managers/updatePass');

const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: async function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage });


routes.post('/register', userRegister);
routes.post('/resetpass', resetPass);
routes.post('/updatepass', updatePass);
routes.post('/login', logIn);

routes.use(loginAuth);

routes.get('/user', detailUser);
routes.get('/transactions', detailTransactions);

routes.post('/upload', upload.single('file'), (req, res) => {
    const loggedUser = req.loggedUser.id;
    const filePath = req.file.path;
    addData(filePath, loggedUser);
    res.status(200).json({ mensagem: 'Upload recebido e Dados atualizados com sucesso!' });
});

module.exports = {
    routes
}