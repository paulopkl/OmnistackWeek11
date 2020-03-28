const crypto = require('crypto');
const connection = require('../database/connection');
const generateUniqueId = require('../utils/generateUniqueId');

module.exports = {

    async Index(req, res) {

        try {
            const users = await connection('users').select('*');
            return res.json(users);
        } catch(error){
            console.error(error);
        }

        
    },

    async Create(request, response) {
        const { name, email, whatssap, city, uf } = request.body; // Corpo da requisição

        const id = generateUniqueId();

        try {
            await connection('users').insert({ id, name, email, whatssap, city, uf }); 
            // O await faz o node esperar esse código carregar
        } catch(error){
            console.error(error);
        }
        
        return response.json({ id });

        // const html = '<h1 style="font-family: cursive;">Hello World</h1>';
        // return response.send(html)
    }
}