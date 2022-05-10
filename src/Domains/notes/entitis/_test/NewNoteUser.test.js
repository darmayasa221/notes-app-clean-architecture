const NewNoteUser = require('../NewNoteUser');

describe('A NewNoteUser Entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      title: 'title',
      body: 'body',
    };
    // Acction and Assert
    expect(() => new NewNoteUser(payload)).toThrowError('NEW_NOTE_USER.NOT_CONTAIN_NEEDED_PROPERTY');
  });
  it('should throw error when payload did not meet data type specificaton', () => {
    // Arrange
    const payload = {
      title: 123,
      tags: ['notes'],
      body: 'note test',
    };
    // Acctiong and Assert
    expect(() => new NewNoteUser(payload)).toThrowError('NEW_NOTE_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
  it('should create object correctly', () => {
    // Arrange
    const payload = {
      title: 'note-123',
      tags: ['notes'],
      body: 'note test',
    };
    // Action
    const {
      title,
      tags,
      body,
      updatedAt,
    } = new NewNoteUser(payload);
    // Assert

    expect(title).toEqual(payload.title);
    expect(tags).toEqual(payload.tags);
    expect(body).toEqual(payload.body);
    expect(updatedAt).not.toEqual(payload.updatedAt);
  });
});
