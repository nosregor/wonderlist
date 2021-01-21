import * as dbHandler from '../db-handler';
import supertest from 'supertest';
import app from '../../src/server';

const request = supertest(app);

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => await dbHandler.connect());

/**
 * Remove and close the db and server.
 */
afterAll(async () => await dbHandler.closeDatabase());

describe('Authentication', () => {
  it('should be able to signup', async () => {
    const response = await request.post('/auth/signup').send({
      email: 'useremail@email.com',
      password: '123123',
    });

    expect(response.status).toBe(201);
  });

  it('should be able to login', async () => {
    const response = await request.post('/auth/login').send({
      email: 'useremail@email.com',
      password: '123123',
    });

    expect(response.status).toBe(200);
  });

  it('should not be able to login with invalid password', async () => {
    const response = await request.post('/auth/login').send({
      email: 'useremail@email.com',
      password: '999999',
    });

    expect(response.status).toBe(401);
    expect(response.name).toBe('');
    // expect(response.text).toContain('Invalid password or email');
  });
});
