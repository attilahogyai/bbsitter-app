import BaseRoute from "appkit/routes/base";
export default BaseRoute.extend({

  beforeModel: function(transition){
    if(!this.isAuthenticated()){
      transition.abort();
      var loginController = this.controllerFor('user/signin');
      loginController.set('prevTransition',transition);
      this.transitionTo('index',{queryParams: {signin: 'true'}});
    }
  },
  setupAuth: function(promise){
    var c=this;
    promise.catch(function(error){
      if(error.status===403){
        var loginController = this.controllerFor('user/signin');
        //loginController.set('prevTransition',transition);                
        c.transitionTo('index',{queryParams: {signin: 'true'}});
      }else{
        console.log('promise.error:'+error);
      }
    });
  },
  isAuthenticated: function(){
    return window.App.authManager.isAuthenticated();
  },
  actions:{
    refreshRoute:function(){
      this.refresh();
    }
  }
});