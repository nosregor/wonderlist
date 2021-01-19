import * as dbHandler from '../db-handler';
import { User } from '../../src/models/user';
import * as userService from '../../src/services/user';

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

describe('...', () => {
  it('...', async () => {
    const user = await User.create({
      email: 'test',
      password: 'test',
    });
    const count = await User.countDocuments();
    expect(count).toEqual(1);
  });
});
