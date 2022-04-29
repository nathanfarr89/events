const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  title: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  releaseDate: { type: String },
  platform: { type: String }
});

mongoose.model('game', GameSchema);
