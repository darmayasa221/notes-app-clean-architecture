const routes = (handler) => ([
  {
    method: 'POST',
    path: '/notes',
    handler: handler.addNoteHandler,
  },
]);

module.exports = routes;
