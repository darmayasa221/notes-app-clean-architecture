const DetailNoteUser = require('../DetailNoteUser');

describe('DetailNoteUser Entities', () => {
  it('Should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      id: '123',
      title: 'note',
      body: 'test',
    };
    // Action and Assert
    expect(() => new DetailNoteUser(payload)).toThrowError('DETAIL_NOTE_USER.NOT_CONTAIN_NEEDED_PROPERTY');
  });
  it('Should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: '123',
      title: 'note-123',
      body: 'note test',
      tags: 123,
      createdAt: new Date().toISOString(),
      updatedAt: '-',
    };
    // Action and Assert
    expect(() => new DetailNoteUser(payload)).toThrowError('DETAIL_NOTE_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
  it('Should create object correctly', () => {
    // Arrange
    const payload = {
      id: '123',
      title: 'note-123',
      body: 'note test',
      tags: ['notes'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    // Action
    const {
      id,
      title,
      tags,
      body,
      createdAt,
      updatedAt,
    } = new DetailNoteUser(payload);
    // Assert
    expect(id).toEqual(payload.id);
    expect(title).toEqual(payload.title);
    expect(tags).toEqual(payload.tags);
    expect(body).toEqual(payload.body);
    expect(createdAt).toEqual(payload.createdAt);
    expect(updatedAt).toEqual(payload.updatedAt);
  });
});
