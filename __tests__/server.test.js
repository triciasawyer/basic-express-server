'use strict';

const { app } = require('../src/server');
const supertest = require('supertest');
const mockRequest = supertest(app);

describe('Server', () => {
  it('handles the root path', async () => {
    const response = await mockRequest.get('/');

    expect(response.status).toBe(200);
    expect(response.text).toBeTruthy;
    expect(response.text).toEqual('proof of life');
  });


  test('handles person get requests', async () => {
    const response = await mockRequest.get('/person?name=Tricia');
    expect(response.status).toEqual(200);
    expect(response.test).toEqual('"Tricia"');
  });


  test('handles not found', async () => {
    let response = await mockRequest.get('/foo');
    expect(response.status).toEqual(404);

    response = await mockRequest.post('/');
  });


  test('validate name parameter', async () => {
    let response = await mockRequest.get('/person');
    expect(response.status).toEqual(500);

    response = await mockRequest.get('/person?name=something');
    expect(response.status).toEqual(200);
  });

});
