const creareServer = require('../createServer');
const pool = require('../../database/postgres/pool');
const NotesTableTestHelper = require('../../../../tests/NotesTableTestHelper');
const container = require('../../container');

describe('HTTP Server', () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await NotesTableTestHelper.cleanTable();
  });
  describe('when POST /notes', () => {
    it('should return 201', async () => {
      // Arrange
      const requestPayload = {
        title: 'note test',
        tags: ['its note'],
        body: 'test',
      };

      const server = await creareServer(container);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/notes',
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);

      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('succes');
      expect(responseJson.data.notes).toBeDefined();
    });
  });
});
