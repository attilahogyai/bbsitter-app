import FoundationReveal from "appkit/utils/foundation-reveal";
export default Ember.View.extend(FoundationReveal,{  
    didInsertElement: function(){
    	this.initFoundation('#application-popup');
    },
    willClearRender:function(){
    	this.closeReveal('#application-popup');
    }
});
