require('server/app');
const createMockUser = require(__root + 'test/fixtures/createMockUser');

describe('Helper: createMockUser', () => {
  test('it returns a random facebook user by default', () => {
    const defaultResponse = createMockUser();
    expect(typeof defaultResponse.id).toBe('string');
    expect(defaultResponse.provider).toEqual('facebook');
  });

  test('it returns a fixed facebook user', () => {
    const facebookFixed = createMockUser('facebook', 'fixed');
    expect(facebookFixed.id).toEqual('11111');
    expect(facebookFixed.provider).toEqual('facebook');
  });

  test('it returns a random facebook user (explicit)', () => {
    const facebookRandom = createMockUser('facebook', 'random');
    expect(typeof facebookRandom.id).toBe('string');
    expect(facebookRandom.provider).toEqual('facebook');
  });

  test('it returns a fixed googleuser', () => {
    const googleFixed = createMockUser('google', 'fixed');
    expect(googleFixed.id).toEqual('22222');
    expect(googleFixed.provider).toEqual('google');
  });

  test('it returns a random google user', () => {
    const googleRandom = createMockUser('google', 'random');
    expect(typeof googleRandom.id).toBe('string');
    expect(googleRandom.provider).toEqual('google');
  });

});

