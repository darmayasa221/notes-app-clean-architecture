const InvariantError = require('./InvariantError');

const DomainErrorTranslator = {
  translate(error) {
    return DomainErrorTranslator._directories[error.message] || error;
  },
};

DomainErrorTranslator._directories = {
  'ADD_NOTE_USER.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('can\'t make new note because not contain needed property'),
  'ADD_NOTE_USER.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('can\'t make new note because type of data did\'t not meet'),
};

module.exports = DomainErrorTranslator;
