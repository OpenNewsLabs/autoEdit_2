var $ = require('jquery');
var _ = require('underscore');
var helpers = require('../helpers');
var underscored = require('underscore.string').underscored;

// Preload all templates from lib/apps/templates (using require-globify)
var templates = require('../templates/*.html.ejs', {mode: 'hash', resolve: ['reduce']});

/**
 * Find a template
 * @param {String} templateName Name of template load
 * @return {Function} template Template render function
 */
function getTemplate(templateName) {
  var name = underscored(templateName); // convert myTemplateName to my_template_name
  if (!templates[name]) {
    // Load templates from index.html if not preloaded
    templates[name] = _.template($('#' + templateName).html());
  }

  return templates[name];
}

/**
 * Find a template and render it with provided data
 * @param {String} templateName Name of template to render
 * @param {Object} [templateData] Data to make availabe to the template
 * @return {String} html tasty html
 */
function render(templateName, templateData) {
  templateData = _.clone(templateData || {}); // templateData is optional
  // Get the template function, pass the provided data and extra helper functions
  return getTemplate(templateName)(_.defaults(templateData, helpers, {
    _: _, $: $, // make underscore and jquery available in the templates
    render: render // make this render function available in the template
  }));
}

module.exports.getTemplate = getTemplate;
module.exports.render = render;
