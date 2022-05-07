const AddNoteUseCase = require('../../../../Applications/use_case/AddNoteUseCase');

class NotesHandler {
  constructor(container) {
    this._container = container;

    this.addNoteHandler = this.addNoteHandler.bind(this);
  }

  async addNoteHandler({ payload }, h) {
    const addNoteUseCase = this._container.getInstance(AddNoteUseCase.name);
    const addedNoteUser = await addNoteUseCase.execute(payload);

    const response = h.response({
      status: 'succes',
      data: {
        notes: addedNoteUser,
      },
    });
    response.code(201);
    return response;
  }
}

module.exports = NotesHandler;
