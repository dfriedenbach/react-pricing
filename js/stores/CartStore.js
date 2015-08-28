var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var FluxCartConstants = require('../constants/FluxCartConstants');
var _ = require('underscore');

var _products = {};
var _cartVisible = false;

var addItem = function (sku, update) {
  update.quantity = sku in _products ? _products[sku].quantity + 1 : 1;
  _products[sku] = _.extend({}, _products[sku], update);
};

var removeItem = function (sku) {
  delete _products[sku];
};

var setCartVisible = function(cartVisible) {
  _cartVisible = cartVisible;
};

var CartStore = _.extend({}, EventEmitter.prototype, {

  getCartItems: function() {
    return _products;
  },

  getCartCount: function() {
    return Object.keys(_products).length;
  },

  getCartTotal: function() {
    var total = 0;
    for (var product in _products) {
      total += _products[product].price * _products[product].quantity;
    }
    return total.toFixed(2);
  },

  getCartVisible: function() {
    return _cartVisible;
  },

  emitChange: function() {
    this.emit('change');
  },

  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }

});

AppDispatcher.register(function (payload) {
  var action = payload.action;
  var text;

  if (action.actionType === FluxCartConstants.CART_ADD) {
    addItem(action.sku, action.update);
  } else if (action.actionType === FluxCartConstants.CART_REMOVE) {
    removeItem(action.sku);
  } else if (action.actionType === FluxCartConstants.CART_VISIBLE) {
    setCartVisible(action.cartVisible);
  } else {
    return true;
  }

  CartStore.emitChange();
  return true;
});

module.exports = CartStore;
