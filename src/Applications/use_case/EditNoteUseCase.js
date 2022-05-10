class EditNoteUseCase {
  constructor({ noteRepository }) {
    this._noteRepository = noteRepository;
  }

  async execute(id, payload) {
    this._verifyAvailableNoteId(id);
    await this._noteRepository.verifyAvailableNoteId(id);
    await this._noteRepository.editNote(id, payload);
  }

  _verifyAvailableNoteId(id) {
    if (!id) {
      throw new Error('EDIT_NOTE_USE_CASE.ID_NOT_CONTAIN');
    }
    if (typeof id !== 'string') {
      throw new Error('EDIT_NOTE_USE_CASE.ID_NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}
module.exports = EditNoteUseCase;
