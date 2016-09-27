export default Ember.ObjectController.extend({
  app:window.App,
  xprtDetailId: Ember.computed.alias('app.authManager.session.xprtDetailId'),
  isXprt:function(){
  	return this.get('xprtDetailId')!==null && this.get('xprtDetailId')!==undefined;
  }.property('xprtDetailId')
});
