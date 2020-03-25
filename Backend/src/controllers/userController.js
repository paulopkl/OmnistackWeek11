const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {

    async Index(req, res) {
        const usuarios = await connection('users').select('*');
        return res.json(usuarios);
    },

    async Create(requisicao, resposta) {
        const { name, email, whatssap, city, uf } = requisicao.body; // Corpo da requisição
        const id = crypto.randomBytes(4).toString('HEX');
        await connection('users').insert({ id, name, email, whatssap, city, uf }); // O await faz o node esperar esse código carregar
        return resposta.json({ id });

        // const html = '<h1 style="font-family: cursive;">Hello World</h1>';
        // return resposta.send(html)
    }
}