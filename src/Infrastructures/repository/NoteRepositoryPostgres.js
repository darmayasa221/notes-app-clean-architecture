const InvariantError = require('../../Commons/exceptions/InvariantError');
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

  async editNote(id, payload) {
    const {
      title,
      body,
      tags,
      updatedAt,
    } = payload;

    const query = {
      text: `UPDATE notes
      SET title = $1, tags = $2, body = $3, "updated_at" = $4
      WHERE id = $5 `,
      values: [title, tags, body, updatedAt, id],
    };
    await this._pool.query(query);
  }

  async deleteNote(id) {
    const query = {
      text: `DELETE FROM notes
      WHERE id = $1`,
      values: [id],
    };

    await this._pool.query(query);
  }

  async verifyAvailableNoteId(id) {
    const query = {
      text: `SELECT * FROM notes
      WHERE id = $1`,
      values: [id],
    };
    const { rowCount } = await this._pool.query(query);
    if (!rowCount) {
      throw new InvariantError('can\'t find id notes at database');
    }
  }
}

module.exports = NoteRepositoryPostgres;
