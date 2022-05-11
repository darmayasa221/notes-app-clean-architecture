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
const EditNoteUseCase = require('../Applications/use_case/EditNoteUseCase');
const DeleteNoteUseCase = require('../Applications/use_case/DeleteNoteUseCase');

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
  {
    key: EditNoteUseCase.name,
    Class: EditNoteUseCase,
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
  {
    key: DeleteNoteUseCase.name,
    Class: DeleteNoteUseCase,
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
