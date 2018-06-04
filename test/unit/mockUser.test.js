require('server/app');
const mockUser = require(__root + 'test/fixtures/mockUser');

describe('mockUser', () => {
  test('it returns a random facebook user by default', () => {
    const defaultResponse = mockUser();
    expect(typeof defaultResponse.id).toBe('number');
    expect(defaultResponse.provider).toEqual('facebook');
  });

  test('it returns a fixed facebook user', () => {
    const facebookFixed = mockUser('facebook', 'fixed');
    expect(facebookFixed.id).toEqual('11111');
    expect(facebookFixed.provider).toEqual('facebook');
  });

  test('it returns a random facebook user (explicit)', () => {
    const facebookRandom = mockUser('facebook', 'random');
    expect(typeof facebookRandom.id).toBe('number');
    expect(facebookRandom.provider).toEqual('facebook');
  });

  test('it returns a fixed googleuser', () => {
    const googleFixed = mockUser('google', 'fixed');
    expect(googleFixed.id).toEqual('22222');
    expect(googleFixed.provider).toEqual('google');
  });

  test('it returns a random google user', () => {
    const googleRandom = mockUser('google', 'random');
    expect(typeof googleRandom.id).toBe('number');
    expect(googleRandom.provider).toEqual('google');
  });

});

