class DetailNoteUser {
  constructor(payload) {
    this._verifyPayload(payload);

    const {
      id,
      title,
      body,
      tags,
      createdAt,
      updatedAt,
    } = payload;
    this.id = id;
    this.title = title;
    this.body = body;
    this.tags = tags;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  _verifyPayload({
    id,
    title,
    body,
    tags,
    createdAt,
    updatedAt,
  }) {
    if (
      !id
      || !title
      || !body
      || !tags
      || !createdAt
      || !updatedAt) {
      throw new Error('DETAIL_NOTE_USER.NOT_CONTAIN_NEEDED_PROPERTY');
    }
    if (
      typeof id !== 'string'
      || typeof title !== 'string'
      || typeof body !== 'string'
      || typeof tags !== 'string'
      || typeof createdAt !== 'string'
      || typeof updatedAt !== 'string'
    ) {
      throw new Error('DETAIL_NOTE_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = DetailNoteUser;
