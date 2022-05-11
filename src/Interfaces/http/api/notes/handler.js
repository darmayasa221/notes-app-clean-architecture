const AddNoteUseCase = require('../../../../Applications/use_case/AddNoteUseCase');
const DeleteNoteUseCase = require('../../../../Applications/use_case/DeleteNoteUseCase');
const EditNoteUseCase = require('../../../../Applications/use_case/EditNoteUseCase');

class NotesHandler {
  constructor(container) {
    this._container = container;

    this.addNoteHandler = this.addNoteHandler.bind(this);
    this.editNoteByIdHandler = this.editNoteByIdHandler.bind(this);
    this.deleteNoteByIdHandler = this.deleteNoteByIdHandler.bind(this);
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

  async editNoteByIdHandler({ payload, params }) {
    const editNoteUseCase = this._container.getInstance(EditNoteUseCase.name);
    await editNoteUseCase.execute(params.id, payload);
    return {
      status: 'succes',
    };
  }

  async deleteNoteByIdHandler({ params }) {
    const deleteNoteUseCase = this._container.getInstance(DeleteNoteUseCase.name);
    await deleteNoteUseCase.execute(params.id);
    return {
      status: 'succes',
    };
  }
}

module.exports = NotesHandler;
