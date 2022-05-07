const pool = require('../../database/postgres/pool');
const NotesTableTestHelper = require('../../../../tests/NotesTableTestHelper');
const AddNoteUser = require('../../../Domains/notes/entitis/AddNoteUser');
const AddedNoteUser = require('../../../Domains/notes/entitis/AddedNoteUser');
const NoteRepositoryPostgres = require('../NoteRepositoryPostgres');

describe('UserRepositoryPostgres', () => {
  afterEach(async () => {
    await NotesTableTestHelper.cleanTable();
  });
  afterAll(async () => {
    await pool.end();
  });
  describe('AddNote Function', () => {
    it('should persist register user', async () => {
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
});
