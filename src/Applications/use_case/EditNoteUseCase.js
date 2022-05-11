const NewNoteUser = require('../../Domains/notes/entitis/NewNoteUser');

class EditNoteUseCase {
  constructor({ noteRepository }) {
    this._noteRepository = noteRepository;
  }

  async execute(id, payload) {
    this._verifyAvailableNoteId(id);
    await this._noteRepository.verifyAvailableNoteId(id);
    const newNoteUser = new NewNoteUser(payload);
    await this._noteRepository.editNote(id, newNoteUser);
  }

  _verifyAvailableNoteId(id) {
    if (typeof id !== 'string') {
      throw new Error('EDIT_NOTE_USE_CASE.ID_NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}
module.exports = EditNoteUseCase;
