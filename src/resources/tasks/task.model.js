const uuid = require('uuid');

class Task {
  constructor({
    id = uuid(),
    title = 'TITLE',
    order = 0,
    description = 'string',
    userId,
    boardId,
    columnId
  }) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

module.exports = Task;