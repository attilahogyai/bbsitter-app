var SetupModel=DS.Model.extend({
	name: DS.attr('string'),
	settings: DS.attr('string'),
	useracc: DS.attr('string'),
	xprtDetail: DS.attr('number'),
});
export default SetupModel;
Ember.Inflector.inflector.uncountable('setup');