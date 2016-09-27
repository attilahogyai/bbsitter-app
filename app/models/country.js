var CountryModel=DS.Model.extend({
	//countryCode: DS.attr('string'),
	countryName: DS.attr('string')
});
export default CountryModel;
Ember.Inflector.inflector.uncountable('country');