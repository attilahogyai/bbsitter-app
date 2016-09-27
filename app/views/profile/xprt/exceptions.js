import App from "appkit/app";
import FoundationReveal from "appkit/utils/foundation-reveal";
var ExceptionView=Em.View.extend(FoundationReveal,{
	didInsertElement: function(){
		this.initFoundation();
	}
});

export default ExceptionView;