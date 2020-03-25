const express = require('express');

const UserController = require('./controllers/userController');
const IncidentController = require('./controllers/IncidentController');
const ProfileControler = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const router = express.Router();

router.post('/sessions', SessionController.Create);

router.get('/users', UserController.Index);
router.post('/users',  UserController.Create);

router.get('/profile', ProfileControler.Index);

router.post('/incidents', IncidentController.Create);
router.get('/incidents', IncidentController.Index);
router.delete('/incidents/:id', IncidentController.Delete);

module.exports = router;

/* 
    Método GET: Buscar/Listar informações no back-end
    POST: Criar uma informação no back-end
    PUT: Alterar uma informação no back-end
    DELETE: Deletar uma informação no back-end
////
    Tipos de parâmetros:
    Query Params: Parâmetros nomeados e enviados na rota após o '?' servem para (Filtros, Paginação)
    Route Params: Parâmetros utilizados para identificar um unico recurso
    Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
////
    SQL: MySQL, SQLite, PostgreeSQL, Oracle, Microsoft, SQL Server
    NoSQL: MongoDB, CouchDB, etc..
////
    Driver: Select * from users
    Query Builder: table('users').select('*').where()
*/