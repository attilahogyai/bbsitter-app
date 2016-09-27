import ProfileRoute from "appkit/routes/profile";
import App from "appkit/app";
import Foundation from "appkit/utils/foundation";
export default ProfileRoute.extend(Foundation,{
  model: function() {
  	var xprtdetailPr=this.getXprtDetail();
    var userPr=this.store.find('user',0);
    return Ember.RSVP.all([userPr,xprtdetailPr]);
  },
    setupController: function(controller, model) {
    	// force fill profession form
    	if(model[1]===null && model[0].get('profession')==App.profession){
    		this.send('infoAlert',{text: App.locX('/xprt_data/create_alert')});
    		this.transitionTo('profile.xprt');
    	}
	    controller.set('instance',model[0]);
	    controller.set('xprtDetail',model[1]);
  }
});
