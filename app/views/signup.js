import Foundation from "appkit/utils/foundation";
export default Ember.View.extend(Foundation,{  
    didInsertElement: function(){
    	this.initFoundation();
    }
});
