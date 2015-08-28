var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var FluxCartConstants = require('../constants/FluxCartConstants');
var _ = require('underscore');

var _product = {};
var _selected = null;

var loadProductData = function(data) {
  _product = data[0];
  _selected = data[0].variants[0];
};

var setSelected = function(index) {
  _selected = _product.variants[index];
};

var ProductStore = _.extend({}, EventEmitter.prototype, {

  getProduct: function() {
    return _product;
  },

  getSelected: function() {
    return _selected;
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

  if (action.actionType === FluxCartConstants.RECEIVE_DATA) {
    loadProductData(action.data);
  } else if (action.actionType === FluxCartConstants.SELECT_PRODUCT) {
    setSelected(action.data);
  } else {
    return true;
  }

  ProductStore.emitChange();
  return true;
});

module.exports = ProductStore;
