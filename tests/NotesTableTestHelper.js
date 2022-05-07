/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const NotesTableTestHelper = {
  async addNote(
    {
      id = 'note-123',
      title = 'note',
      tags = ['note1', 'note2'],
      body = 'test note body',
      created_at = new Date().toISOString(),
      updated_at = '-',
    },
  ) {
    const query = {
      text: `INSERT INTO notes
      VALUES($1, $2, $3, $4, $5, $6)`,
      values: [id, title, tags, body, created_at, updated_at],
    };

    await pool.query(query);
  },
  async findNotes() {
    const query = 'SELECT * FROM notes';

    const { rows } = await pool.query(query);

    return rows;
  },
  async findNoteById(id) {
    const query = {
      text: `SELECT * FROM notes
      WHERE id = $1`,
      values: [id],
    };

    const { rows } = await pool.query(query);

    return rows[0];
  },
  async editNoteById(id, {
    title,
    tags,
    body,
    updated_at,
  }) {
    const query = {
      text: `UPDATE notes 
      SET title = $1, tags = $2, body = $3, "updated_at" = $4
      WHERE id = $5`,
      values: [title, tags, body, updated_at, id],
    };

    await pool.query(query);
  },
  async deleteNoteById(id) {
    const query = {
      text: `DELETE FROM notes 
      WHERE id = $1`,
      values: [id],
    };

    await pool.query(query);
  },
  async cleanTable() {
    await pool.query('TRUNCATE TABLE notes');
  },
};

module.exports = NotesTableTestHelper;
