//********* Also user to many orders is another one to many relationship */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const itemSchema = require('./itemSchema');

const lineItemSchema = new Schema({
  qty: { type: Number, default: 1 },
  item: itemSchema
}, {
  timestamps: true,
  toJSON: { virtuals: true }
});


// Virtuals are document properties that do not persist or get stored in the MongoDB database, they only exist logically and are not written to the document’s collection.
// With the get method of virtual property, we can set the value of the virtual property from existing document field values, and it returns the virtual property value.Mongoose calls the get method every time we access the virtual property.//

// extPrice -- extended price result when the quantity invoiced is multiplied by the price per uni
lineItemSchema.virtual('extPrice').get(function () {
  // 'this' is bound to the lineItem subdoc
  return this.qty * this.item.price;
});

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  lineItems: [lineItemSchema],
  isPaid: { type: Boolean, default: false }
}, {
  timestamps: true,
  toJSON: { virtuals: true }
});


// returns the total of items together (like sum array)
// total starts at 0 -- add each items price to the total****
orderSchema.virtual('orderTotal').get(function () {
  return this.lineItems.reduce((total, item) => total + item.extPrice, 0);
});


// like orderTotal except adding quantity instead of price total
orderSchema.virtual('totalQty').get(function () {
  return this.lineItems.reduce((total, item) => total + item.qty, 0);
});

// returns part of our ID and set it to our orderID
orderSchema.virtual('orderId').get(function () {
  return this.id.slice(-6).toUpperCase();
});

// Static methods (Created our own method can be used like with did Fruit.create() on express fruits app)
// find the user first then 
// while isPaid = false it's our cart***
orderSchema.statics.getCart = function (userId) {
  // 'this' is the Order model
  // Remember, we were putting "this" because this is the order model and I.Our cart is just the order model.When the is paid, property is false.
  return this.findOneAndUpdate(
    // query
    { user: userId, isPaid: false },
    // update
    { user: userId },
    // upsert option will create the doc if
    // it doesn't exist
    // ***** if user doesn't have a cart -- it will create one (Upsert)
    { upsert: true, new: true }
  );
};


//
orderSchema.methods.addItemToCart = async function (itemId) {
  const cart = this;
  // Check if item already in cart
  const lineItem = cart.lineItems.find(lineItem => lineItem.item._id.equals(itemId));
  if (lineItem) {
    lineItem.qty += 1;
  } else {
    // if we don't have the item we will get the item and push it into the lineItem cart array
    const item = await mongoose.model('Item').findById(itemId);
    cart.lineItems.push({ item });
  }
  return cart.save();
};

// Instance method to set an item's qty in the cart (will add item if does not exist)
// This is the + / - symbols for adding quantity
orderSchema.methods.setItemQty = function (itemId, newQty) {
  // this keyword is bound to the cart (order doc)
  const cart = this;
  // Find the line item in the cart for the menu item
  const lineItem = cart.lineItems.find(lineItem => lineItem.item._id.equals(itemId));
  if (lineItem && newQty <= 0) {
    // Calling remove, removes itself from the cart.lineItems array
    lineItem.remove();
  } else if (lineItem) {
    // Set the new qty - positive value is assured thanks to prev if
    lineItem.qty = newQty;
  }
  // return the save() method's promise
  return cart.save();
};

module.exports = mongoose.model('Order', orderSchema);