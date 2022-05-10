const EditNoteUseCase = require('../EditNoteUseCase');
const NoteRepository = require('../../../Domains/notes/NoteRepository');
const NewNoteUser = require('../../../Domains/notes/entitis/NewNoteUser');

describe('A EditNoteUseCase', () => {
  it('should throw error if id not containt', async () => {
    // arrange
    const editNoteUseCase = new EditNoteUseCase({});

    // action and assert
    await expect(editNoteUseCase.execute('', {})).rejects.toThrowError('EDIT_NOTE_USE_CASE.ID_NOT_CONTAIN');
  });
  it('Should throw error if id not data meet spesification', async () => {
    // arrange
    const id = 123;
    const editNoteUseCase = new EditNoteUseCase({});

    // action and assert
    await expect(editNoteUseCase.execute(id, {})).rejects.toThrowError('EDIT_NOTE_USE_CASE.ID_NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
  it('should orchestrating the edit note correctly', async () => {
    // arrange
    const paramId = 'note-123';
    const payload = {
      title: 'test Note',
      body: 'test note Body',
      tags: ['testnotre Tgas'],
    };

    const mockNoteRepository = new NoteRepository();
    mockNoteRepository.verifyAvailableNoteId = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockNoteRepository.editNote = jest.fn()
      .mockImplementation(() => Promise.resolve());

    const editNoteUseCase = new EditNoteUseCase({
      noteRepository: mockNoteRepository,
    });
    // action
    await editNoteUseCase.execute(paramId, payload);

    // assert
    expect(mockNoteRepository.verifyAvailableNoteId).toHaveBeenCalledWith(paramId);
    expect(mockNoteRepository.editNote).toHaveBeenCalledWith(paramId, payload);
  });
});
