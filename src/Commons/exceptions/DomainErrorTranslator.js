const InvariantError = require('./InvariantError');

const DomainErrorTranslator = {
  translate(error) {
    return DomainErrorTranslator._directories[error.message] || error;
  },
};

DomainErrorTranslator._directories = {
  'ADD_NOTE_USER.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('can\'t make new note because not contain needed property'),
  'ADD_NOTE_USER.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('can\'t make new note because type of data did\'t not meet'),
  'NEW_NOTE_USER.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('can\'t edit note because not contain needed property'),
  'NEW_NOTE_USER.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('can\'t make edit note because type of data did\'t not meet'),
  'EDIT_NOTE_USE_CASE.ID_NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('can\'t make note because type of params id did\'t not meet'),
};

module.exports = DomainErrorTranslator;
