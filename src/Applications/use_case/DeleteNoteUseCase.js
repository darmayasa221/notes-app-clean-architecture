class DeleteNoteUseCase {
  constructor({ noteRepository }) {
    this._noteRepository = noteRepository;
  }

  async execute(params) {
    this._verifyAvailableNoteId(params);
    this._noteRepository.verifyAvailableNoteId(params);
    this._noteRepository.deleteNote(params);
  }

  _verifyAvailableNoteId(id) {
    if (!id) {
      throw new Error('DELETE_NOTE_USE_CASE.NOT_CONTAIN_ID');
    }
    if (typeof id !== 'string') {
      throw new Error('DELETE_NOTE_USE_CASE.ID_NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = DeleteNoteUseCase;
