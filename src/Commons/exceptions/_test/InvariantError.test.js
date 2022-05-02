const InvariantError = require('../InvariantError');

describe('InvariantError', () => {
  it('Should create an error correctly', () => {
    const invariantError = new InvariantError('an error');

    expect(invariantError.statusCode).toEqual(400);
    expect(invariantError.message).toEqual('an error');
    expect(invariantError.name).toEqual('InvariantError');
  });
});
