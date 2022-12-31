const item = require('./item');

const Schema = require('mongoose').Schema;

const itemSchema = new Schema({
  name: { type: String, required: true },
  image: String,
  // *************One category for many items (one to many relationship model satisfies requirement for MVP)
  //********* Also user to many orders is another one to many relationship */
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  price: { type: Number, required: true, default: 0 }
}, {
  timestamps: true
});

module.exports = itemSchema;