const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema(
  {
    title: String,
    columns: [{ title: String, order: Number }]
  },
  { collection: 'boards' },
  { versionKey: false }
);

const Board = mongoose.model('Board', boardSchema);

const toResponse = board => {
  const { id, title, columns } = board;
  return { id, title, columns };
};

module.exports = { Board, toResponse };
