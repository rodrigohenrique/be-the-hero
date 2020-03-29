const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeAll(async () => {
        await connection.migrate.rollback();
    });

    beforeEach(async () => {
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    let ongId = null;

    const ong = {
        name: "Abrigo João de Deus",
        email: "emiliadossantos45@yahoo.com.br",
        whatsapp: "+559132413195",
        city: "Belém",
        uf: "PA"
    };

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send(ong);
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
        ongId = response.body.id;
    });

    it('should be able to list all ONG\'s', async () => {
        const response = await request(app)
            .get('/ongs')
            .send();
        expect(response.body).toEqual([{...ong, ... { id: ongId }}]);
    });
});