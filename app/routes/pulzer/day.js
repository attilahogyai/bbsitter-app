import AuthenticatedRoute from "appkit/routes/authenticated";
import App from "appkit/app";
import EventListRouteMixin from "appkit/mixin/event-edit-route-actions";
export default AuthenticatedRoute.extend(EventListRouteMixin,{
	app:window.App,
	session:Ember.computed.alias('app.authManager.session'),
	model:function(params,transition){
		return this.loadCalendarSetup(null,this.get('session.userid'),params);
	},
    setupController: function(controller, model) {
    	controller.set('calendarSetup',model.calendarSetup);
        var pulzerIndex = this.controllerFor('pulzer.index');
        var m = moment(model.actDate,'YYYYMMDD');
        pulzerIndex.set('actDate', m);
    }
});
