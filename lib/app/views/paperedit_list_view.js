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
    // this.listenTo(paperedits, 'destroy', this.render);
    // this.listenTo(paperedits, 'add',     this.render);
  },

  render: function() {
    console.debug('Render paperedit list view');
    // if there are  paperedits it shows
    if (!this.collection.isEmpty()) {
      this.$el.empty();
      console.debug("build PapereditsList");
      this.collection.each(this.addOne, this);
      return this;
      // if there are no paperedits it shows helpfull message to create a new one
    } else {
      // this.$el.append
      // TODO: there seems to be a bug on this line, object is not a function.
      this.$el.html(render('homePage'));
      return this;
    }
  },

  addOne: function(papereditItem) {
    console.debug(papereditItem.attributes);
    var papereditView = new PapereditListElementView({model: papereditItem});
    this.$el.append(papereditView.render().el);
  }
});
