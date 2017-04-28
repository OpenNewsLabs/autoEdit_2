'use strict';
var Backbone = require('backbone');
var render = require('./utils').render;

/**
 * Backbone view for single Paperedit model view to be used in view for
 * collection PapereditsListView
 * @class PapereditListElementView
 * @constructor
 * @extends Backbone.View
 */
module.exports = Backbone.View.extend({
  tagName: 'div',
  className: 'media',
  initialize: function() {

    this.listenTo(this.model, 'change', this.render);

  },
  events:{
    "click #papereditCard": "showPaperedit",
    "click button.editBtn": "editPaperedit",
    "click button.deleteBtn": "deletePaperedit"
  },
  showPaperedit: function(){
    //navigate to paperedit page
    Backbone.history.navigate("paperedit/"+this.model.cid, {trigger:true});
  },
  deletePaperedit: function(){
    if (confirm("You sure you want to delete this paperedit?")) {
      this.model.destroy({success: function(model, response) {
      }})
    } else {
      alert("Paperedit was not deleted")
    }
  },

  editPaperedit: function(){
    alert("Edit paperedit")
  },

  render: function(){
    var sectionTemplate = render('papereditElementIndex', this.model.attributes);
    this.$el.html(sectionTemplate);
    return this;
  }
});
