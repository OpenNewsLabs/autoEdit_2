var $ = require('jquery');
var _ = require('underscore');
var helpers = require('../helpers');

// Setup an object for caching our template functions
var templates = {};

/**
 * Find a template
 * @param {String} templateName Name of template load
 * @return {Function} template Template render function
 */
function getTemplate(templateName) {
  if (!templates[templateName]) {
    templates[templateName] = _.template($('#' + templateName).html());
  }

  return templates[templateName];
}

/**
 * Find a template and render it with provided data
 * @param {String} templateName Name of template to render
 * @param {Object} [templateData] Data to make availabe to the template
 * @return {String} html tasty html
 */
function render(templateName, templateData) {
  templateData = templateData || {}; // templateData is optional
  // Get the template function, pass the provided data and extra helper functions
  return getTemplate(templateName)(_.defaults(templateData, helpers, {
    _: _, $: $, // make underscore and jquery available in the templates
    render: render // make this render function available in the template
  }));
}

module.exports.getTemplate = getTemplate;
module.exports.render = render;
