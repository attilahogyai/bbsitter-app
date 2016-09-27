import ApplicationController from "appkit/controllers/application";
import App from "appkit/app";
import CommentMixin from "appkit/mixin/comment-controller";
export default Ember.ObjectController.extend(CommentMixin,{
	queryParams:['folder'],
	folder:'in',

  toggle:false,

	messagesList:null,	
	xprt:null,
  isOutbox:function(){
    return this.get('folder')==='out';
  }.property('folder'),
  actions:{
    switchToggle:function(message){
      message.set('toggle',!message.get('toggle'));
    }
  }
});