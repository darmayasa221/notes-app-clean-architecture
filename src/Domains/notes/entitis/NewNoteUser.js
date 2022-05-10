class NewNoteUser {
  constructor(payload) {
    this._verifyPayload(payload);

    const {
      title,
      tags,
      body,
    } = payload;

    this.title = title;
    this.tags = tags;
    this.body = body;
    this.updatedAt = new Date().toISOString();
  }

  _verifyPayload({
    title,
    tags,
    body,
  }) {
    if (
      !title
      || !tags
      || !body
    ) {
      throw new Error('NEW_NOTE_USER.NOT_CONTAIN_NEEDED_PROPERTY');
    }
    if (
      typeof title !== 'string'
      || !Array.isArray(tags)
      || typeof body !== 'string'
    ) {
      throw new Error('NEW_NOTE_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = NewNoteUser;
