const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('USER', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    })

    it('should be able to create a new USER', async () => {
        const response = await request(app)
        .post('/users')
        // .set('Authorization', )
        .send({
            name: "APAD2",
            email: "contato@contato.com",
            whatssap: "4700000899",
            city: "Rio do Sul",
            uf: "SC"
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});