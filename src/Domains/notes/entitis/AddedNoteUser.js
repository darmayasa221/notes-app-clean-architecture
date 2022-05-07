class AddedNoteUser {
  constructor(payload) {
    this._verifyPayload(payload);

    const {
      id,
      title,
      body,
      tags,
      created_at,
      updated_at,
    } = payload;

    this.id = id;
    this.title = title;
    this.body = body;
    this.tags = tags;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  _verifyPayload({
    id,
    title,
    body,
    tags,
    created_at,
    updated_at,
  }) {
    if (
      !id
      || !title
      || !body
      || !tags
      || !created_at
      || !updated_at) {
      throw new Error('ADDED_NOTE_USER.NOT_CONTAIN_NEEDED_PROPERTY');
    }
    if (
      typeof id !== 'string'
      || typeof title !== 'string'
      || typeof body !== 'string'
      || !Array.isArray(tags)
      || typeof created_at !== 'string'
      || typeof updated_at !== 'string'
    ) {
      throw new Error('ADDED_NOTE_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddedNoteUser;
