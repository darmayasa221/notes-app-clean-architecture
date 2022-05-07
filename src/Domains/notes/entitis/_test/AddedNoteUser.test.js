const AddedNoteUser = require('../AddedNoteUser');

describe('A AddedNoteUser Entitis', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      title: 'test',
      tags: 'ada',
    };
    // Action and Assert
    expect(() => new AddedNoteUser(payload)).toThrowError('ADDED_NOTE_USER.NOT_CONTAIN_NEEDED_PROPERTY');
  });
  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: '123',
      title: 'note-123',
      body: 'note test',
      tags: 123,
      created_at: new Date().toISOString(),
      updated_at: '-',
    };
    // Action and Assert
    expect(() => new AddedNoteUser(payload)).toThrowError('ADDED_NOTE_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
  it('Should create object correctly', () => {
    // Arrange
    const payload = {
      id: '123',
      title: 'note-123',
      body: 'note test',
      tags: ['notes'],
      created_at: new Date().toISOString(),
      updated_at: '-',
    };
    // Action
    const {
      id,
      title,
      tags,
      body,
      created_at,
      updated_at,
    } = new AddedNoteUser(payload);
    // Assert
    expect(id).toEqual(payload.id);
    expect(title).toEqual(payload.title);
    expect(tags).toEqual(payload.tags);
    expect(body).toEqual(payload.body);
    expect(created_at).toEqual(payload.created_at);
    expect(updated_at).toEqual(payload.updated_at);
  });
});
