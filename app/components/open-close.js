import App from "appkit/app";
export default Ember.Component.extend({
  // ezzel müxik http://jsfiddle.net/6Evrq/
  status:false,
  initValue:false,
  opentextCode:'/general/open',
  init:function(){
  	this.set('status',this.get('initValue'));
    this._super();
  },
  opentext:function(){
    return App.locX(this.get('opentextCode'));
  }.property('opentextCode'),
  actions:{
    toggle:function(){
    	this.set('status',!this.get('status'));
    }
  }
});