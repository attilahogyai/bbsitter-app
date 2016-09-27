import BaseController from "appkit/controllers/base";
export default BaseController.extend({
	actDate: null,
	xprtDetail: null,
	actDateS: function(){
		if(this.get('actDate')==null){
			this.set('actDate',moment());
		}
		return this.get('actDate').format('YYYYMMDD');
	}.property('actDate')
});