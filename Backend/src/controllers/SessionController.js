const connection = require('../database/connection');

module.exports = {
    async Create(requisicao, resposta) {
        const { id } = requisicao.body;

        const usuario = await connection('users').where('id', id).select('name').first();

        if(!usuario) {
            return resposta.status(400).json({ error: "Nenhum usuário com esse ID" });
        } 

        return resposta.json(usuario);
    }
};
