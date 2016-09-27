import App from "appkit/app";
import Foundation from "appkit/utils/foundation";
export default Ember.Route.extend(Foundation,{
  modalName:null,
  init: function(){
    return this._super();
  },
  triggerAlert:function(headerText,contentText,callback){

    var alertWindow=Em.$('#errorAlert');
    var textBlock=Em.$(alertWindow).find(">p");
    var headerBlock=Em.$(alertWindow).find(">h2");
    Em.$(textBlock).html(contentText);
    Em.$(headerBlock).html(headerText);
    var okButton=Em.$(alertWindow).find("input.ok");
    if(callback){
      Em.$(okButton).one('click',function(){
        callback(alertWindow);
      });
    }else{
      Em.$(okButton).one('click',function(){
        alertWindow.foundation('reveal', 'close');
        return false;
      });
    }
    alertWindow.foundation('reveal', 'open');

  },
  actions:{
    openModal: function(modalName,controllerName) {
      if(!controllerName){
        controllerName=modalName;
      }
      var controller=null;
      if ((typeof controllerName)==='string'){
        controller=this.controllerFor(controllerName);
      }else{
        controller=controllerName;
      }
      
      if(controller && controller.reset){
        controller.reset();
      }
      this.render(modalName, {
        into: 'application',
        outlet: 'application-popup-outlet',
        controller: controller
      });
      var c=this;
      Ember.run.schedule('afterRender', function (){
        var subrouteWindow=Em.$('#application-popup');
        modalName=modalName.replace('/','-');
        c.set('modalName',modalName);
        subrouteWindow.attr('class','reveal-modal app-modal '+modalName);
        subrouteWindow.foundation('reveal', 'open');          
        c.initFoundation();
      });
      return false;
    },
    closeModal: function() {
      var subrouteWindow=Em.$('#application-popup');
      subrouteWindow.foundation('reveal', 'close');
      var modalName=this.get('modalName');
      this.disconnectOutlet({
        outlet: 'application-popup-outlet',
        parentView: 'application'
      });
      this.set('modalName',null);

      if(window.backLink==='current'){
        window.backLink=null;
        // do nothing the reveal was close above
      }else if(window.backLink){
        if(window.backLink.backController.get('changed')!==undefined){
          window.backLink.backController.incrementProperty('changed');
        }
        if(window.backLink.backData!==undefined){
          try{
            this.transitionTo(window.backLink.backPath,window.backLink.backData);
          }catch(err){
            Ember.Logger.info("route to "+window.backLink.backPath+" with data failed, try without");
            this.transitionTo(window.backLink.backPath);
          }
        }else{
          this.transitionTo(window.backLink.backPath);
        }
        window.backLink=null;
      }else {
        this.transitionTo('index');
      }
      return false;
    },
    jumpToSignup:function(){
      this.send('openModal','user/signup');
    },
    jumpToSignin:function(){
      this.send('openModal','user/signin');
    },
    authStateChanged: function(data){
      //token=App.AuthManager.token;
    },
    error: function(reason, transition){
      if(reason.status===401 || reason.status===403){
        this.transitionTo('signin');
      }else{
        Ember.onerror(reason);
      }
    },
    errorAlert: function(event){
      var header=App.locX("/alert/error");
      this.triggerAlert(header,event.text);
    },
    infoAlert: function(event,callback){
      var header=App.locX("/alert/info");
      this.triggerAlert(header,event.text,callback);
    },
    confirmAlert: function(event){
      var alertWindow=Em.$('#confirmAlert');
      var textBlock=Em.$(alertWindow).find(">p");
      Em.$(textBlock).html(event.text);
      var yesButton=Em.$(alertWindow).find("input.yes");
      var cancelButton=Em.$(alertWindow).find("input.cancel");
      
      yesButton.one('click', function(){
        alertWindow.foundation('reveal', 'close');
        if(event.yes) {
          event.yes();
        }
        return false;
      });
      
      cancelButton.one('click', function(){
        alertWindow.foundation('reveal', 'close');
        if(event.cancel) {
          event.cancel();
        }
        return false;
      });
      alertWindow.foundation('reveal', 'open');
    },
    refresh:function(){
      this.refresh();
    }

  }
});
