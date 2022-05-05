const AddNoteUser = require('../AddNoteUser');

describe('A AddNoteUser Entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      title: 'test',
      tags: 'ada',
    };
    // Action and Assert
    expect(() => new AddNoteUser(payload)).toThrowError('ADD_NOTE_USER.NOT_CONTAIN_NEEDED_PROPERTY');
  });
  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      title: 123,
      tags: 'test',
      body: 'test',
    };
    // Actiong and Assert
    expect(() => new AddNoteUser(payload)).toThrowError('ADD_NOTE_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
  it('should create note object correctly', () => {
    // Arrange
    const payload = {
      title: 'first note',
      body: 'note body',
      tags: 'notes tags',
    };
    // Acction
    const {
      title,
      body,
      tags,
    } = new AddNoteUser(payload);
    // Assert
    expect(title).toEqual(payload.title);
    expect(body).toEqual(payload.body);
    expect(tags).toEqual(payload.tags);
  });
});
