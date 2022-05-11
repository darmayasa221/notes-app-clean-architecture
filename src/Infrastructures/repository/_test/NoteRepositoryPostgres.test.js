const pool = require('../../database/postgres/pool');
const NotesTableTestHelper = require('../../../../tests/NotesTableTestHelper');
const AddNoteUser = require('../../../Domains/notes/entitis/AddNoteUser');
const AddedNoteUser = require('../../../Domains/notes/entitis/AddedNoteUser');
const NoteRepositoryPostgres = require('../NoteRepositoryPostgres');
const NewNoteUser = require('../../../Domains/notes/entitis/NewNoteUser');
const InvariantError = require('../../../Commons/exceptions/InvariantError');

describe('UserRepositoryPostgres', () => {
  afterEach(async () => {
    await NotesTableTestHelper.cleanTable();
  });
  afterAll(async () => {
    await pool.end();
  });
  describe('AddNote Function', () => {
    it('should persist add note', async () => {
      // Arrange
      const addNoteUser = new AddNoteUser({
        title: 'test',
        tags: ['note tags'],
        body: 'note body test',
      });

      const fakeIdGenerator = () => '123';

      const noteRepositoryPostgres = new NoteRepositoryPostgres(pool, fakeIdGenerator);

      // Acction
      await noteRepositoryPostgres.addNote(addNoteUser);

      // Assert
      const note = await NotesTableTestHelper.findNoteById('note-123');
      const { created_at: createdAt } = note;
      expect(note).toEqual(new AddedNoteUser({
        body: 'note body test',
        created_at: createdAt,
        id: 'note-123',
        tags: ['note tags'],
        title: 'test',
        updated_at: '-',
      }));
    });
    it('should return addedNoteUser correctly', async () => {
      // Arrange
      const addNoteUser = new AddNoteUser({
        title: 'test',
        tags: ['note tags'],
        body: 'note body test',

      });

      const fakeIdGenerator = () => '123';
      const noteRepositoryPostgres = new NoteRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const addedNoteUser = await noteRepositoryPostgres.addNote(addNoteUser);

      // Assert
      const note = await NotesTableTestHelper.findNoteById('note-123');
      expect(addedNoteUser).toStrictEqual(new AddedNoteUser({
        id: 'note-123',
        title: 'test',
        tags: ['note tags'],
        body: 'note body test',
        created_at: note.created_at,
        updated_at: '-',
      }));
    });
  });
  describe('editNote', () => {
    it('should persist edit note', async () => {
      // Arrange
      const addNoteUser = new AddNoteUser({
        title: 'test',
        tags: ['note tags'],
        body: 'note body test',
      });
      const paramId = 'note-123';
      const newNoteUser = new NewNoteUser({
        title: 'test',
        tags: ['note tags'],
        body: 'note body test',
      });
      const fakeIdGenerator = () => '123';
      const noteRepositoryPostgres = new NoteRepositoryPostgres(pool, fakeIdGenerator);
      await noteRepositoryPostgres.addNote(addNoteUser);
      // Action
      await noteRepositoryPostgres.editNote(paramId, newNoteUser);
      const note = await NotesTableTestHelper.findNoteById('note-123');
      // Assert
      expect(note).toStrictEqual({
        id: 'note-123',
        title: 'test',
        tags: ['note tags'],
        body: 'note body test',
        created_at: note.created_at,
        updated_at: note.updated_at,
      });
    });
  });
  describe('deleteNote', () => {
    it('should delete note from database', async () => {
      // Arrange
      const addNoteUser = new AddNoteUser({
        title: 'test',
        tags: ['note tags'],
        body: 'note body test',
      });
      const paramId = 'note-123';
      const fakeIdGenerator = () => '123';

      const noteRepositoryPostgres = new NoteRepositoryPostgres(pool, fakeIdGenerator);
      await noteRepositoryPostgres.addNote(addNoteUser);
      await noteRepositoryPostgres.deleteNote(paramId);
      const note = await NotesTableTestHelper.findNoteById(paramId);

      expect(note).toEqual(undefined);
    });
  });
  describe('verifyAvailableNoteId', () => {
    it('it should throw Invariant error if id not available', async () => {
      // Arrange
      const noteRepository = new NoteRepositoryPostgres(pool);
      const paramId = '123';

      // action and arrange
      await expect(noteRepository.verifyAvailableNoteId(paramId)).rejects.toThrow(InvariantError);
    });
    it('should not throw Invariant error if id available', async () => {
      const paramId = 'note-123';
      const addNoteUser = new AddNoteUser({
        title: 'test',
        tags: ['note tags'],
        body: 'note body test',
      });

      const fakeIdGenerator = () => '123';

      const noteRepositoryPostgres = new NoteRepositoryPostgres(pool, fakeIdGenerator);
      await noteRepositoryPostgres.addNote(addNoteUser);
      await expect(noteRepositoryPostgres.verifyAvailableNoteId(paramId))
        .resolves.not.toThrow(InvariantError);
    });
  });
});
