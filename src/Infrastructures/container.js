/* istanbul ignore file */

const { createContainer } = require('instances-container');

// external agency
const { nanoid } = require('nanoid');
const pool = require('./database/postgres/pool');

// service (repository, helper, manager, etc)
const NoteRepositoryPostgres = require('./repository/NoteRepositoryPostgres');

// use case
const AddNoteUseCase = require('../Applications/use_case/AddNoteUseCase');
const NoteRepository = require('../Domains/notes/NoteRepository');

// creating container

const container = createContainer();

// register services and repository

container.register([
  {
    key: NoteRepository.name,
    Class: NoteRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
]);

// register use case

container.register([
  {
    key: AddNoteUseCase.name,
    Class: AddNoteUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'noteRepository',
          internal: NoteRepository.name,
        },
      ],
    },
  },
]);

module.exports = container;
