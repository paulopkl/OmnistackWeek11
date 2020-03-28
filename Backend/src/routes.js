const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate'); // Validators

const UserController = require('./controllers/userController');
const IncidentController = require('./controllers/IncidentController');
const ProfileControler = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const router = express.Router();

router.post('/sessions', SessionController.Create);
////////
router.get('/users', UserController.Index);
////////
router.post('/users', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatssap: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), UserController.Create);
////////
router.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), ProfileControler.Index);
////////
router.post('/incidents', IncidentController.Create);
////////
router.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), IncidentController.Index);
////////
router.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), IncidentController.Delete);

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