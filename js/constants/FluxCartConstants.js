var keyMirror = require('react/lib/keyMirror');

// define action constants
module.exports = keyMirror({
  CART_ADD: null,
  CART_REMOVE: null,
  CART_VISIBLE: null, // shows or hides cart
  SET_SELECTED: null, // selects a product option
  RECEIVE_DATA: null  // loads mock data
});
