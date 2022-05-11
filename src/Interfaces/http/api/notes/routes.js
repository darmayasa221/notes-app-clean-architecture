const routes = (handler) => ([
  {
    method: 'POST',
    path: '/notes',
    handler: handler.addNoteHandler,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: handler.editNoteByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: handler.deleteNoteByIdHandler,
  },
]);

module.exports = routes;
