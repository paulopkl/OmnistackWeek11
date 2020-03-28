const connection = require('../database/connection');

module.exports = {
    async Index(request, response) {
        try {
            const user_id = request.headers.authorization;
            const incidentes = await connection('incidents').where('user_id', user_id).select('*');
            return response.json(incidentes);
        } catch(error){
            console.error(error);
        }
    }
};
