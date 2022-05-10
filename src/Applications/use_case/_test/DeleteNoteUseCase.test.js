const DeleteNoteUseCase = require('../DeleteNoteUseCase');
const NoteRepository = require('../../../Domains/notes/NoteRepository');

describe('A DeleteNoteUseCase', () => {
  it('should throw error if id params not contain', async () => {
    // arrange
    const paramId = '';
    const deleteNoteUseCase = new DeleteNoteUseCase({});

    // action and assert
    await expect(deleteNoteUseCase.execute(paramId))
      .rejects
      .toThrowError('DELETE_NOTE_USE_CASE.NOT_CONTAIN_ID');
  });
  it('should throw error if id not string', async () => {
    // arrange
    const paramId = 123;
    const deleteNoteUseCase = new DeleteNoteUseCase({});

    // action and assert
    await expect(deleteNoteUseCase.execute(paramId))
      .rejects
      .toThrowError('DELETE_NOTE_USE_CASE.ID_NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
  it('should orchestrating the delete note action correctly ', async () => {
    // arrange
    const paramId = 'note-123';

    const mockNoteRepository = new NoteRepository();

    mockNoteRepository.verifyAvailableNoteId = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockNoteRepository.deleteNote = jest.fn()
      .mockImplementation(() => Promise.resolve());

    const deleteNoteUseCase = new DeleteNoteUseCase({
      noteRepository: mockNoteRepository,
    });
    // action
    await deleteNoteUseCase.execute(paramId);
    // assert
    expect(mockNoteRepository.verifyAvailableNoteId).toHaveBeenCalledWith(paramId);
    expect(mockNoteRepository.deleteNote).toHaveBeenCalledWith(paramId);
  });
});
