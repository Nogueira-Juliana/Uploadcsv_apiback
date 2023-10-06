Esta aplicação foi desenvolvida utilizando Node.js como plataforma backend e PostgreSQL como banco de dados relacional. 

A API foi criada para interagir e fornecer recursos para a aplicação frontend, incluindo autenticação de usuários, recuperação de senha e operações de CRUD para manipulação de dados de usuários e saldos. Na aplicação Front-end é possível fazer o upload de um arquivo CSV, ocorre a captação pela API e a atualização do banco de dados com base no conteúdo do arquivo (no momento estes dados são persistidos em memória dentro da pasta "uploads").

Para utilizar a aplicação e os pacotes instalados, é necessário utilizar os comandos '(npm i)' - para instalar e '(npm run dev)' para iniciar o servidor. A pasta "bancodedados_teste" contém queries de criação para o banco de dados com as informações que interagem com a API. As senhas são criptografadas no momento do seu armazenamento com o auxílio do BCRYPT. Existe ainda um recurso em fase de implementação e no momento incompleto, que visa enviar um token para o email cadastrado em caso de esquecimento de senha, a partir disto, será apagada a senha do banco de dados do usuário e substituída pela nova fornecida dentro do prazo de expiração.

O Node.js foi escolhido como plataforma de backend por ser uma tecnologia muito poderosa e escalável, capaz de lidar com várias conexões simultâneas. Além disso, ele possui uma grande variedade de bibliotecas e frameworks disponíveis para auxiliar no desenvolvimento de aplicações web.

Já o PostgreSQL é um banco de dados relacional que oferece alta confiabilidade, escalabilidade e segurança. Ele é amplamente utilizado em aplicações empresariais e é conhecido por sua capacidade de lidar com grandes quantidades de dados.

Para o desenvolvimento da API, foi utilizado o framework Express, que é amplamente utilizado na comunidade Node.js. Ele fornece uma série de recursos para lidar com requisições HTTP e simplifica a implementação de rotas e middlewares.
Link do repositório da aplicação Front desenvolvida: https://github.com/Nogueira-Juliana/Upload_apifront


https://github.com/Nogueira-Juliana/Uploadcsv_apiback/assets/89023943/bca59cc3-af43-4b77-9ca0-922869431090




BIBLIOTECAS USADAS:
    "bcrypt": "^5.1.0",
    "cors": "^2.8.5",
    "csv-parser": "^3.0.0",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.0",
    "multer": "^1.4.5-lts.1",
    "nodemailer": "^6.9.1",
    "pg": "^8.10.0"



