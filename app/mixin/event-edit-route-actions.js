/**
Mixin used to handle create and edit events in event list pages
**/
import App from "appkit/app";
export default Ember.Mixin.create({
	actions:{
		createEvent: function(xprt,host,day,hour,minute){
			window.backLink={
				backPath:this.get('routeName'),
				backData:this.modelFor(this.get('routeName')),
				//backData:this.get('controller.xprt.id'),
				backController:this.get('controller')
			};
			if(window.App.authManager.isAuthenticated()){
				if(this.get('routeName').indexOf('pulzer')>-1){
					this.transitionTo('pulzer.new',xprt,host,day.format('YYYYMMDD'),hour,minute);
				}else{
					this.transitionTo(this.get('routeName')+'.new',xprt,host,day.format('YYYYMMDD'),hour,minute);
				}
				
			}else{
				this.send('infoAlert',{text: App.locX("/event/registration_required")});	
			}
		},
		editEvent: function(event){
			window.backLink={
				backPath:this.get('routeName'),
				backData:this.modelFor(this.get('routeName')),
				backController:this.get('controller')
			};
			if(this.get('routeName').indexOf('pulzer')>-1){
				this.transitionTo('pulzer.edit',event);
			}else{
				this.transitionTo(this.get('routeName')+'.edit',event);
			}
		},
		deleteEvent: function(event){
			var c=this;
			var fyes=function(){
				event.destroyRecord().then(
					function(status) {
						// nothing to do
					}).catch(
					function(status) {
						c.send('errorAlert',{text: App.locX("/delete/error")});
						event.rollback();
					});
			};
			c.send('confirmAlert',{text: App.locX("/event/del_confirm"),yes:fyes});
		}
	}	
});
