import PulzerEditRoute from "appkit/routes/pulzer/edit";
export default PulzerEditRoute.extend({
	controllerName: 'pulzer/edit',
    renderTemplate: function(controller, model) {
    	this.send('openModal','pulzer/edit',controller);
    	/*
		this.render('pulzer/edit', { 
			into: 'application', outlet: 'application-popup-outlet', controller: controller 
		});    	
*/
    }
});