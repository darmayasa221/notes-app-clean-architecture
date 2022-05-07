const AddNoteUser = require('../../Domains/notes/entitis/AddNoteUser');

class AddNoteUseCase {
  constructor({ noteRepository }) {
    this._noteRepository = noteRepository;
  }

  async execute(payload) {
    const addNoteUser = new AddNoteUser(payload);
    const note = await this._noteRepository.addNote(addNoteUser);
    return note;
  }
}
module.exports = AddNoteUseCase;
