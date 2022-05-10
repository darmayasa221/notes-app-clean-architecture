class NoteRepository {
  async verifyAvailableNoteId(id) {
    throw new Error('NOTE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async addNote(payload) {
    throw new Error('NOTE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async editNote(param, payload) {
    throw new Error('NOTE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async deleteNote(id) {
    throw new Error('NOTE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = NoteRepository;
