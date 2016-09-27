import Foundation from 'appkit/utils/foundation';
export default Ember.Mixin.create(Foundation,{
	getReveal:function(popupId){
		var subrouteWindow=null;
		if(popupId){
			subrouteWindow=Em.$(popupId);	
		}else{
			subrouteWindow=Em.$('#subroute-popup');	
		}
		return subrouteWindow;
	},
	initFoundation: function(popupId){
		this._super();
		var subrouteWindow=this.getReveal(popupId);
		if(subrouteWindow!==null && subrouteWindow.length===1){
				subrouteWindow.removeClass('open');
	    	subrouteWindow.foundation('reveal', 'open');
	    	window.Em.lastSubrouteRevealView=subrouteWindow;
	    	window.Em.lastSubrouteRevealViewId="subroute-popup";
		}else{
			Ember.Logger.debug('reveal not found to open:'+popupId);
		}
	},
	closeReveal:function(popupId){
		var subrouteWindow=this.getReveal(popupId);
		if(subrouteWindow!==null && subrouteWindow.length===1){
			subrouteWindow.foundation('reveal', 'close');
    	}else{
    		Ember.Logger.debug('reveal not found to close:'+popupId);	
    	}
	}
});