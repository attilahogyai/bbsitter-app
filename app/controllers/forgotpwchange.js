import App from "appkit/app";
export default Ember.ObjectController.extend({
	requestid:null,
	newPassword:null,
	email:null,
	locX_password_again:App.locX('/general/password_again')
});