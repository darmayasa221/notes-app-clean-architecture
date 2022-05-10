const createServer = require('../createServer');
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

      const server = await createServer(container);

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
    it('should response 400 when request payload not contain needed property', async () => {
      // arrange
      const requestPayload = {
        title: 'note test',
        tags: ['its note'],
      };

      const server = await createServer(container);
      // action
      const response = await server.inject({
        method: 'POST',
        url: '/notes',
        payload: requestPayload,
      });
      // assert
      const responseJson = JSON.parse(response.payload);

      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('can\'t make new note because not contain needed property');
    });
    it('should respone 400 when request payload not meet data type specification', async () => {
    // Arrange
      const requestPayload = {
        title: 'note test',
        tags: 'its note',
        body: 'test',
      };

      const server = await createServer(container);
      // action
      const response = await server.inject({
        method: 'POST',
        url: '/notes',
        payload: requestPayload,
      });
      // assert
      const responseJson = JSON.parse(response.payload);

      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('can\'t make new note because type of data did\'t not meet');
    });
  });
  it('should handle server error', async () => {
    // Arrange
    const requestPayload = {
      title: 'note test',
      tags: 'its note',
      body: 'test',
    };

    const server = await createServer({});
    // action
    const response = await server.inject({
      method: 'POST',
      url: '/notes',
      payload: requestPayload,
    });

    // Assert
    const responseJson = JSON.parse(response.payload);
    expect(response.statusCode).toEqual(500);
    expect(responseJson.status).toEqual('error');
    expect(responseJson.message).toEqual('server error');
  });
});
