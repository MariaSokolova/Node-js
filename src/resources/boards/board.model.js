const uuid = require('uuid');

class Board {
  constructor({
    id = uuid(),
    title = 'TITLE',
    columns = [
      {
        id: uuid(),
        title: 'Columns title',
        order: 0
      }
    ]
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
    this.checkColumnsId();
  }

  checkColumnsId() {
    this.columns.forEach(column => {
      if (!column.id) {
        column.id = uuid();
      }
    });
  }
}

module.exports = Board;
