const connection = require('../database/connection');

module.exports = {
    async Index(requisicao, resposta) {
        const user_id = requisicao.headers.authorization;
        const incidentes = await connection('incidents').where('user_id', user_id).select('*');
        return resposta.json(incidentes);
    }
};
