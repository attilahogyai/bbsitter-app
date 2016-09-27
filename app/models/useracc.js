var UserModel=DS.Model.extend({
	name: DS.attr('string'),
	email: DS.attr('string'),
	phone: DS.attr('string')
});
export default UserModel;
Ember.Inflector.inflector.uncountable('useracc');