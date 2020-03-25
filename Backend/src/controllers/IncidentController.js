const connection = require('../database/connection');

module.exports = {

    async ListeCasoEspecifico(requisicao, resposta) {
        return
    },

    async Delete(requisicao, resposta) {
        const { id } = requisicao.params;
        const user_id = requisicao.headers.authorization;
        const MesmoID = await connection('incidents').where('id', id).select('user_id').first();

        if(MesmoID.user_id !== user_id) { // Se o user_id da tabela foi Diferente do Id da requisição Faça:
            return resposta.status(401).json({ error: "Você não tem permissão para fazer isso." }); // Retorna erro de Permissão.
        }

        await connection('incidents').where('id', id).delete();

        return resposta.status(204).send();
    },
    
    async Index(requisicao, resposta) {
        const { page = 1 } = requisicao.query; // Se ele não existir é igual á 1

        const count = await connection('incidents').count()

        console.log(count[0]);

        resposta.header('X-Total-Registers', count[0]['count(*)']);

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

        return resposta.json(incidente);
    },

    async Create(requisicao, resposta) {
        const { title, description, value } = requisicao.body;
        // requisicao.headers; // Dados da autenticação
        const user_id = requisicao.headers.authorization; // Passado no header da requisição POST
        const [id] = await connection('incidents').insert({ title, description, value, user_id }); // Desestruturou o id
        return resposta.json({ id }); // Retorna o id no formato JSON  
    }
};
