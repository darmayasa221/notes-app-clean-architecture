class AddNoteUser {
  constructor(payload) {
    this._verifyPayload(payload);
    const {
      title,
      body,
      tags,
    } = payload;

    this.title = title;
    this.body = body;
    this.tags = tags;
  }

  _verifyPayload({
    title,
    body,
    tags,
  }) {
    if (!title || !body || !tags) {
      throw new Error('ADD_NOTE_USER.NOT_CONTAIN_NEEDED_PROPERTY');
    }
    if (typeof title !== 'string' || typeof body !== 'string' || typeof tags !== 'string') {
      throw new Error('ADD_NOTE_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddNoteUser;
