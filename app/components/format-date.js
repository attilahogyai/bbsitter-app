export default Ember.Component.extend({
	layout: Em.Handlebars.compile('{{formatted}}'),
	date: null,
	format: null,

	formatted: function() {
	  var date = this.get('date');
	  var format = this.get('format');

	  return date ? date.format(format) : null;
	}.property('date', 'format')
});