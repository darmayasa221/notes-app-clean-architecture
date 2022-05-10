const DomainErrorTranslator = require('../DomainErrorTranslator');
const InvariantError = require('../InvariantError');

describe('DomainErrorTranslator', () => {
  it('should translate error correctly', () => {
    expect(DomainErrorTranslator.translate(new Error('ADD_NOTE_USER.NOT_CONTAIN_NEEDED_PROPERTY')))
      .toStrictEqual(new InvariantError('can\'t make new note because not contain needed property'));
    expect(DomainErrorTranslator.translate(new Error('ADD_NOTE_USER.NOT_MEET_DATA_TYPE_SPECIFICATION')))
      .toStrictEqual(new InvariantError('can\'t make new note because type of data did\'t not meet'));
  });
  it('should return original error when error message is not needed to translate', () => {
    // Arrange
    const error = new Error('some_error_message');

    // Action
    const translateError = DomainErrorTranslator.translate(error);

    // Assert
    expect(translateError).toStrictEqual(error);
  });
});
