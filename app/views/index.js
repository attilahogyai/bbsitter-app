import Foundation from "appkit/utils/foundation";
import App from "appkit/app";

export default Ember.View.extend(Foundation,{  
    didInsertElement: function(){
    	this.initFoundation();
    }
});
