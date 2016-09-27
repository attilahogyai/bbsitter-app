import ApplicationController from "appkit/controllers/application";
import App from "appkit/app";

export default Ember.ObjectController.extend({
	queryParams:['direction'],
	direction:'next',

	xprtDetailRatingList:null,	
	xprt:null,
	showNext:function(){
		return this.get('direction')==='next';
	}.property('direction'),
	actions:{
		openRankPopup:function(xprt){
			window.backLink='current';
			this.set('xprt',xprt);
			this.send('openModal','modal/rankupdate',this);
		},
		rankSaved:function(){
			var c=this;
			Ember.run.later(function(){
				c.send('closeModal');		
				c.send('refreshRoute');
			},500);
		}
	}
});