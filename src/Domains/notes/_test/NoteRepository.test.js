const NoteRepository = require('../NoteRepository');

describe('NoteRepository Interface', () => {
  it('should have an method object addNote, editNote, and deleteNote', () => {
    // Arrange
    const noteRepository = new NoteRepository();
    // Acction and Assert
    expect(noteRepository).toHaveProperty('addNote');
    expect(noteRepository).toHaveProperty('editNote');
    expect(noteRepository).toHaveProperty('deleteNote');
  });
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const noteRepository = new NoteRepository();
    // Action adn Assert
    await expect(noteRepository.addNote({})).rejects.toThrowError('NOTE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(noteRepository.editNote({})).rejects.toThrowError('NOTE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(noteRepository.deleteNote('')).rejects.toThrowError('NOTE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
