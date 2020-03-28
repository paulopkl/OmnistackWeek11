const connection = require('../database/connection');

module.exports = {

    async ListeCasoEspecifico(request, response) {
        return
    },

    async Delete(request, response) {
        const { id } = request.params;
        const user_id = request.headers.authorization;
        const MesmoID = await connection('incidents').where('id', id).select('user_id').first();

        if(MesmoID.user_id !== user_id) { // Se o user_id da tabela foi Diferente do Id da requisição Faça:
            return response.status(401).json({ error: "Você não tem permissão para fazer isso." }); // Retorna erro de Permissão.
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    },
    
    async Index(request, response) {
        const { page = 1 } = request.query; // Se ele não existir é igual á 1

        const [count] = await connection('incidents').count();

        console.log(count["count(*)"]);

        const incidente = await connection('incidents')
            .join('users', 'users.id', '=', 'incidents.user_id') // Relacionar dados de duas tabelas
            .limit(5) // Busca limitada para apenas 5 incidentes
            .offset((page - 1) * 5) // Pular 5 registros por página, então começa a partir do zero
            .select([
                    'incidents.*', // Todos as colunas da tabela incidents
                    'users.name', 
                    'users.email', 
                    'users.whatssap', 
                    'users.city', 
                    'users.uf'
                ]); // Deste modo não pega o users.id para não subscrever o id de incidents

        response.header('X-Total-Count', count["count(*)"]);

        return response.json(incidente);
    },

    async Create(request, response) {
        const { title, description, value } = request.body;
        // request.headers; // Dados da autenticação
        const user_id = request.headers.authorization; // Passado no header da requisição POST
        const [id] = await connection('incidents').insert({ title, description, value, user_id }); // Desestruturou o id
        return response.json({ id }); // Retorna o id no formato JSON  
    }
};
