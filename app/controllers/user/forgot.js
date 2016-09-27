import ApplicationController from "appkit/controllers/application";
import App from "appkit/app";

export default ApplicationController.extend({
	email:null,
	actions:{
		sendResetPasswordEmail: function(status){
			var reset=App.getData('/forgot',true,'POST',true,false,{
				email:this.get('email'),
				l:App.getLang().toUpperCase(),
			},null,null);
			var c=this;
			reset.then(function(){
				c.send('infoAlert',{text: App.locX('/registration/password_reset')});
				c.transitionToRoute('index');
			},function(){
				c.send('infoAlert',{text: App.locX('/registration/password_reset_error')});
				c.transitionToRoute('index');
			});
			
		}		
	}
});

