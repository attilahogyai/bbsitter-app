import Foundation from "appkit/utils/foundation";
export default Ember.View.extend(Foundation,{  
	dragDropFile: DropletView.extend({multiple:null}),
    didInsertElement: function(){
    	this.initFoundation();
    }
});
