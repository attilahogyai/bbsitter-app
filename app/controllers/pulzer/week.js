import ApplicationController from "appkit/controllers/application";
import App from "appkit/app";
import PulzerIndex from "appkit/controllers/pulzer/index";

export default PulzerIndex.extend({
	coverDays:7,
	dayRoute:false,
	weekRoute:true,
	weekList: function(){
        if(this.get('actDate')){
            var events=this.store.find('event',{week:this.get('actDate').format('YYYYMMDD')});
			App.Loader.listenTo(events);
			return events;
        }else{
            return null;
        }
	}.property('actDate','changed'),
});