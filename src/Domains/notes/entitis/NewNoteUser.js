class NewNoteUser {
  constructor(payload) {
    this._verifyPayload(payload);

    const {
      id,
      title,
      tags,
      body,
      createdAt,
    } = payload;

    this.id = id;
    this.title = title;
    this.tags = tags;
    this.body = body;
    this.createdAt = createdAt;
    this.updatedAt = new Date().toISOString();
  }

  _verifyPayload({
    id,
    title,
    tags,
    body,
    createdAt,
  }) {
    if (
      !id
      || !title
      || !tags
      || !body
      || !createdAt
    ) {
      throw new Error('NEW_NOTE_USER.NOT_CONTAIN_NEEDED_PROPERTY');
    }
    if (
      typeof id !== 'string'
      || typeof title !== 'string'
      || !Array.isArray(tags)
      || typeof body !== 'string'
      || typeof createdAt !== 'string'
    ) {
      throw new Error('NEW_NOTE_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = NewNoteUser;
