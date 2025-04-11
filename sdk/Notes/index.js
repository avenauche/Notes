const sdk = require('./src/sdk.js');


module.exports = {
  initialize: sdk.init,
  getNotes: sdk.getNotes,
  getNote: sdk.getNote,
  createNote: sdk.createNote,
  updateNote: sdk.updateNote,
  deleteNote: sdk.deleteNote
};