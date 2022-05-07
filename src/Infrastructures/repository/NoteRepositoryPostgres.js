const AddedNoteUser = require('../../Domains/notes/entitis/AddedNoteUser');
const NoteRepository = require('../../Domains/notes/NoteRepository');

class NoteRepositoryPostgres extends NoteRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addNote(payload) {
    const { title, body, tags } = payload;

    const id = `note-${this._idGenerator()}`;
    const created_at = new Date().toISOString();
    const updated_at = '-';

    const query = {
      text: `INSERT INTO notes
      VALUES 
      ($1, $2, $3, $4, $5 ,$6) RETURNING *`,
      values: [id, title, tags, body, created_at, updated_at],
    };

    const { rows } = await this._pool.query(query);
    return new AddedNoteUser(rows[0]);
  }
}

module.exports = NoteRepositoryPostgres;
