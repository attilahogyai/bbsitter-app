import FoundationReveal from "appkit/utils/foundation-reveal";
export default Ember.View.extend(FoundationReveal,{  
    didInsertElement: function(){
    	this.initFoundation();
    },
    willClearRender:function(){
    	this.closeReveal();
    }
});
