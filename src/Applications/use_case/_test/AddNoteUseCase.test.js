const AddNoteUser = require('../../../Domains/notes/entitis/AddNoteUser');
const AddedNoteUser = require('../../../Domains/notes/entitis/AddedNoteUser');
const NoteRepository = require('../../../Domains/notes/NoteRepository');
const AddNoteUseCase = require('../AddNoteUseCase');

describe('AddNoteUseCase', () => {
  it('Should orchestrating the add user action correctly', async () => {
    // Arrange
    const useCasePayload = {
      title: 'test Note',
      body: 'test note Body',
      tags: ['testnotre Tgas'],
    };

    const expectedAddedNoteUser = new AddedNoteUser({
      id: '123',
      title: useCasePayload.title,
      body: useCasePayload.body,
      tags: useCasePayload.tags,
      created_at: new Date().toISOString(),
      updated_at: '-',
    });

    /** creating dependency of use case */

    const mockNoteRepository = new NoteRepository();

    /** mocking neede function */

    mockNoteRepository.addNote = jest.fn()
      .mockImplementation(() => Promise.resolve(new AddedNoteUser({
        id: '123',
        title: useCasePayload.title,
        body: useCasePayload.body,
        tags: useCasePayload.tags,
        created_at: expectedAddedNoteUser.created_at,
        updated_at: '-',
      })));

    /** create use case instance */

    const getNoteUseCase = new AddNoteUseCase({
      noteRepository: mockNoteRepository,
    });

    // action

    const addedNoteUser = await getNoteUseCase.execute(useCasePayload);

    // assert

    expect(addedNoteUser).toStrictEqual(expectedAddedNoteUser);
    expect(mockNoteRepository.addNote).toBeCalledWith(new AddNoteUser({
      title: useCasePayload.title,
      body: useCasePayload.body,
      tags: useCasePayload.tags,
    }));
  });
});
