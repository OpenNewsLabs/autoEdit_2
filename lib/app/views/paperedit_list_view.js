'use strict';
var $ = require('jquery');
var Backbone = require('backbone');
var PapereditListElementView = require('./paperedit_list_element_view');
var render = require('./utils').render;

/**
 * Backbone view for paperedits list
 * @class PapereditsListView
 * @constructor
 * @extends Backbone.View
 */
module.exports = Backbone.View.extend({
  tagName: 'div',
  className: 'container',
  initialize: function() {
    var paperedits = this.collection;
    // this.listenTo(paperedits, 'sync',   this.render);
    this.listenTo(paperedits, 'destroy', this.render);
    // this.listenTo(paperedits, 'add',     this.render);
  },
  
  render: function() {
    this.$el.empty();
    this.$el.append("<ol class='breadcrumb'><li class='active'>Paperedits</li></ol>");
    if (!this.collection.isEmpty()) {
       // if there are  paperedits it shows
      this.collection.each(this.addOne, this);
      return this; 
    } else {
      // else, if there are no paperedits it shows helpfull message to create a new one
      this.$el.html(render('homePage'));
      return this;
    }
  },

  addOne: function(papereditItem) {
    var papereditView = new PapereditListElementView({model: papereditItem});
    this.$el.append(papereditView.render().el);
  }
});
