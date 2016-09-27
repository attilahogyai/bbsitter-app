import ApplicationController from "appkit/controllers/application";
import App from "appkit/app";

export default Ember.ObjectController.extend({
  changed:0,
  App:window.App,
  dayRoute:true,
  weekRoute:false,
  needs: ['pulzer/new','application'],
  newController: Ember.computed.alias("controllers.pulzer/new"),
  applicationController: Ember.computed.alias("controllers.application"),
  coverDays:1,
  slider: null,
  actDate: null,
  prevDate: null,
  nextDate: null,
  nextRenderDate: null,
  calendarSetup:null,

  actDateS: function(){
    return this.get('actDate').format('YYYYMMDD');
  }.property('actDate'),
  currentPath: function(){
    return this.get('applicationController.currentPath');
  }.property('controllers.application.currentPath'),
  eventList: function(){
    if(this.get('actDate')){
      var events=this.store.find('event',{date:this.get('actDate').format('YYYYMMDD')});
      App.Loader.listenTo(events);
      return events;
    }else{
      return null;
    }
  }.property('actDate','changed'),
  init: function(){
    if(this.get('actDate')===null){
      this.set('actDate',moment());
    }
    this._super();
  },
  actions:{
    
    jumpToNext: function(event){
      //this.set('nextRenderDate',moment(this.get('actDate').add('days', 1)));
      this.set('actDate',moment(this.get('actDate').add('days', this.get('coverDays'))));
      //Em.$.('sandbox').insertAfter()
      //if(this.get('slider')) this.get('slider').goToNextSlide();
    },
    jumpToPrev: function(event){
      this.set('actDate',moment(this.get('actDate').subtract('days', this.get('coverDays'))));
      //if(this.get('slider')) this.get('slider').goToPrevSlide();
    }

  }
});