import bcrypt from 'bcrypt';

import * as dbHandler from '../db-handler';
import { User } from '../../src/models/user';

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => await dbHandler.connect());
/**
 * Clear all test data after every test.
 */
afterEach(async () => await dbHandler.clearDatabase());
/**
 * Remove and close the db and server.
 */
afterAll(async () => await dbHandler.closeDatabase());

describe('User model', () => {
  it('should create and save user`s password as a hash', async () => {
    const user = await User.create({
      email: 'test',
      password: 'test',
    });
    const salt: string = await bcrypt.genSalt(10);
    const hash: string = await bcrypt.hash(user.password, salt);

    const compare = await bcrypt.compare(hash, user.password);

    const password = await user.isValidPassword(user.password);

    expect(password).toEqual(compare);
  });
});
