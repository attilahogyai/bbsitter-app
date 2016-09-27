import AuthenticatedRoute from "appkit/routes/authenticated";
import EventListRouteMixin from "appkit/mixin/event-edit-route-actions";
export default AuthenticatedRoute.extend(EventListRouteMixin,{
	setupController: function(controller, model, transition) {
		controller.incrementProperty('changed');
	}	
});
