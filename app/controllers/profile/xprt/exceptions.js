import ApplicationController from "appkit/controllers/application";
import App from "appkit/app";
import SaveSetup from "appkit/mixin/save-setup";
export default Ember.ObjectController.extend(SaveSetup,{
  xprtDetail:null,
  calendarSetup:null,
  exceptionDay:null,
  // inital calendarSetup properties
  useNationalHoliday: false,

  itemChanged:false,

  addEnabled:function(){
    if(this.get('exceptionDay')===null || !moment(this.get('exceptionDay'),'YYYY.MM.DD').isValid()){
      return false;
    }
    return true;
  }.property('exceptionDay'),
  saveEnabled:function(){
    if(!this.get('addEnabled') && this.get('itemChanged')){
      return true;
    }
    return false;
  }.property('itemChanged','addEnabled'),
  nationalHolidayList:function(){
    if(this.get('useNationalHoliday')){
      var promise=this.store.find('nationalHoliday',{countryCode:this.get('xprtDetail.country.id')});
      promise.then(function(){

      });
      return promise;
    }
    return null;
  }.property('useNationalHoliday'),
  holidayList:function(){
    return this.get('calendarSetup.holidays');
  }.property('calendarSetup','calendarSetup.holidays'),
  setupSaved:function(){
    this.set('itemChanged',false);
  },
  actions:{
    addDate:function(){
      if(!this.get('addEnabled')){
        return;
      }
      if(this.get('exceptionDay')!==null){
        this.get('calendarSetup.addHoliday').apply(this.get('calendarSetup'),[this.get('exceptionDay')]);        
        this.set('itemChanged',true);
        this.set('exceptionDay',null);
      }
    },
    removeDate:function(date){
      this.get('calendarSetup.holidays').removeObject(date);      
      this.set('itemChanged',true);
    }
  }
});

