var NationalHolidayModel=DS.Model.extend({
	country: DS.attr('string'),
	day: DS.attr('datetime'),
	name: DS.attr('string')

});
export default NationalHolidayModel;
Ember.Inflector.inflector.uncountable('nationalHoliday');