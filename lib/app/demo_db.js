'use strict';
var $ = require('jquery');
var _ = require('underscore');

var DB = {};

DB.create = DB.update = DB.patch = DB.delete = function(model, success, error) {
  error("Can't make changes in demo mode");
};

var data = {};

/**
 * @function
 * @description Read functionality,Find all and fine One, mapped to REST GET
 * @param {object} method - Backbone RESTfull method request.
 * @param {object} model - Backbone model being handled.
 * @param {object} options - Sucess or failure callback.
 * @returns {object} sucess callback with backbone model
 */
DB.read = function(model, success, error) {
  var type;

  console.debug(model);

  // If a colleciton
  if (model.models) {
    type = model.model.modelType;
  } else {
    type = model.constructor.modelType;
  }

  var handleSuccess = function(ret) {
    if (model.models) {
      success(ret);
    } else {
      success(_.findWhere(ret, { id: model.id }));
    }
  };

  if (!data[type]) {
    // load json
    $.getJSON('demo_' + type + '.json')
      .done(function(newData) {
        data[type] = newData;
        handleSuccess(data[type]);
      })
      .fail(error);
  } else {
    handleSuccess(data[type]);
  }
};

/**
 * @function
 * @description API Object to override Backnone.sync
 * @param {object} method - Backbone RESTfull method request.
 * @param {object} model - Backbone model being handled.
 * @param {object} options - Sucess or failure callback.
 */
module.exports = function(method, model, options) {
  DB[method](model, options.success, options.error);
};
