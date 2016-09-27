import Resolver from 'ember/resolver';
import B64 from 'appkit/utils/base64';
import AuthManager from 'appkit/utils/authmanager';
import MomentSetup from 'appkit/utils/moment-customs';
import Loader from 'appkit/utils/loader';

if(window.App){
	throw Error('import App called!');
}
var authManager = new AuthManager();
var Base64=B64;
var l=new Loader();
Ember.LOG_BINDINGS=false;
var momentSetup=new MomentSetup();	
momentSetup.setup();

var App = Ember.Application.extend({
	LOG_ACTIVE_GENERATION: true,
	LOG_MODULE_RESOLVER: true,
	LOG_TRANSITIONS: true,
	LOG_TRANSITIONS_INTERNAL: true,
	LOG_VIEW_LOOKUPS: true,
	LOG_BINDINGS: false,

	modulePrefix: 'appkit', // TODO: loaded via config
	Resolver: Resolver['default'],

	authManager : authManager,
	loader: l,
	momentSetup : momentSetup,
	moment: moment()	
});
App.authManager = authManager;

App.momentSetup = momentSetup;

App.Base64=B64;
App.lastLang=null;
App.Loader=l;

App.moment=moment();

App.profession=79;

App.getData = App.authManager.getData;

App.lastLang='hu';
App.getLang=function(){
	var lang=App.lastLang;
	if(lang===null){
		lang = navigator.language || navigator.userLanguage;  
		if(!Ember.isEmpty(lang)){
			var l=lang.split('-');
			moment.lang(l[0]);
			App.moment.lang(l[0]);
			lang=l[0];
		}
	}
	App.lastLang=lang;
	return lang;
};
App.getLang();

App.locX=function(key, params){
	return Ember.String.loc(key+"/"+App.getLang(), params);
};
App.locDatePattern=function(key, params){
	return Ember.String.loc(key+"/"+App.getLang(), params);
};

App.TranslateableAttributes=Ember.Mixin.create({
	didInsertElement: function() {
		var result = this._super.apply(this, arguments);
		var translateArray=this.get('translate') || [];
		for(var i=0;i<translateArray.length;i++){
			var v=this.get(translateArray[i]);
			if(v){
				this.$().attr(translateArray[i], App.locX(v));
			}
		}
	}
});

App.extractError=function(status){
	if(status.responseJSON && status.responseJSON.indexOf('/')>-1){
    	return App.locX(status.responseJSON);
    }else if(status.statusText){
    	return status.statusText;
    }else{
    	return App.locX("/event/save_error_"+status.status);
    }
};

App.enLangData = moment.langData('en');
App.locHour=function(hour,minute){
	var currentLangData = moment.langData();
	App.moment.hour(hour).minute(minute);
	if(currentLangData.getSHourFormat){
		return currentLangData.getSHourFormat(App.moment);
	}else{
		return App.enLangData.getSHourFormat(App.moment);
	}
};

// attributes
App.TimeTransform = DS.Transform.extend({
	deserialize: function(serialized) {
		return serialized;
	},
	serialize: function(deserialized) {
		return deserialized;
	}
});
App.DatetimeTransform = DS.Transform.extend({
	deserialize: function(serialized) {
		if(Ember.isEmpty(serialized)) {
			return;
		}
		Ember.assert("Value type is not string", serialized.indexOf);
		return moment(serialized,'YYYY-MM-DDTHH:mm:ss.SSSZZ');
	},
	serialize: function(deserialized) {
		if(Ember.isEmpty(deserialized)) {
			return;
		}
		Ember.assert("Value type is not moment", deserialized.format);
		return deserialized.format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
	}
});
App.RawTransform = DS.Transform.extend({
	deserialize: function(serialized) {
		return serialized;
	},
	serialize: function(deserialized) {
		return deserialized;
	}
});



DS.Model.reopen({
	getF: function(name,type){
		if(this.get('format') && this.get('format')[name]){
			var methodName=Ember.String.camelize('format_'+type);
			if(this[methodName]){
				return this[methodName](this.get(name),this.get('format')[name]);
			}
		}
		return this.get(name);
	},
	setF: function(name,value,type){
		if(this.get('format') && this.get('format')[name]){
			var methodName=Ember.String.camelize('parse_'+type);
			if(this[methodName]){
				value=this[methodName](value,this.get('format')[name]);
			}
		}
		this.set( name,value);
	},
	formatDatetime: function(value, formatString){
		if(!value) { return; }
		Ember.assert("Value type is not moment", value.format);
		return value.format(formatString);
	},
	parseDatetime: function(value, formatString){
		if(!value) { return; }
		Ember.assert("Value type is not string", value.indexOf);
		return moment(value,formatString);
	},
});

Ember.ObjectController.reopen({
	setupOnRevealCloseHistoryBack:function(){
		var c=this;
		var setupRoute=window.Em.currRouteName;
		Em.$(document).one('closed.fndtn.reveal', '[data-reveal]', function () {
			if(setupRoute===window.Em.currRouteName){
				c.transitionToRoute(window.Em.prevRouteName);
			}else{
				Ember.Logger.info('skip reveal close, was set for :'+setupRoute);
			}
		});
	},
	setupOnRevealCloseReopenCurrent:function(){

		var prevView=null;
		Em.$(document).one('close.fndtn.reveal', '[data-reveal]', function () {
   			if(prevView===null){ // create new listener for open the old opened one
   				//window.Em.lastSubrouteRevealView.foundation('reveal', 'open');    			
   				prevView=Em.$('#'+window.Em.lastSubrouteRevealViewId);
   				prevView.foundation('reveal', 'open');
   			}
   		});

	}
});


App.initializer({
	name: 'Inject store',
	initialize: function(container, application) {
			//container.register('application:authManaher', App.AuthManager);
			//container.injection('application:authManaher', 'store', 'store:main');
			container.register('transform:time', App.TimeTransform);
			container.register('transform:datetime', App.DatetimeTransform);
			container.register('transform:raw', App.RawTransform);
		},
	});
App.initializer({
	after: 'store',    
	name: 'initObjects',
	initialize: function(container, application) {
		LiquidFire.map(function(){
			this.transition(
				this.fromRoute('index'),
				this.toRoute('detail'),
				this.use('toLeft')
				);
			this.transition(
				this.fromRoute('index'),
				this.toRoute('signin'),
				this.use('toLeft')
				);
			this.transition(
				this.fromRoute('detail'),
				this.toRoute('index'),
				this.use('toRight')
				);
			this.transition(
				this.hasClass('toggle'),
		    this.toModel(true),
		    this.use('toDown', {duration: 500}),
		    this.reverse('toUp', {duration: 500})
	    );			  
		});
		application.inject('component:address-setter','store','store:main');
		application.inject('component:rank-editor','store','store:main');

	}
});
App.reload=function(){
	Ember.run.schedule('afterRender',function(){
		window.localStorage.clear();
        var n = window.location.href.indexOf("#");
    	window.location.href=window.location.href.substring(0,n);
	});
};

App.initializer({
	name: 'session',
	after: 'initObjects',    
	initialize: function(container, application) {
		application.deferReadiness();
		var store=container.lookup('store:main');
		if(!application.authManager.isAuthenticated()){
			store.find('session').then(function(data){
				if(data && data.get('firstObject')){
					application.authManager.setup(data.get('firstObject'));	

					//** check force relogin
					var userPr=store.find('user',0);
					userPr.catch(function(result){
						if(result.status=="401" || result.status=="403"){
							App.reload();
						}
					});
					//** check expert 
					if(data.get('firstObject').get('xprtDetailId')!==null){ // if there is xprt id then check it on the server side
						var xprt=store.find('xprtDetail',data.get('firstObject').get('xprtDetailId'));
						xprt.then(function(xprtData){
							if(xprtData.get('length')===0){
								data.get('firstObject').destroyRecord();
								App.reload();
							}
						}).catch(function(error){
							data.get('firstObject').destroyRecord();
							App.reload();
						});

					}
				}
				application.advanceReadiness();
			}).catch(function(error){
				Ember.Logger.error(error);
				application.advanceReadiness();
			}
			); 
		}
	}
});



//Ember.ENV.LOG_ACTIVE_GENERATION=true;
//Ember.ENV.LOG_MODULE_RESOLVER=true;
//Ember.ENV.LOG_TRANSITIONS=true;
//Ember.ENV.LOG_TRANSITIONS_INTERNAL=true;
//Ember.ENV.LOG_VIEW_LOOKUPS=true;


Ember.RSVP.configure('onerror', function(error) {
	if (error instanceof Error) {
		Ember.Logger.assert(false, error);
		Ember.Logger.error(error.stack);
	}
});

// ember customization
Ember.TextField.reopen({
	translate:['placeholder'],
	attributeBindings: ['required']
});
Ember.TextField.reopen(App.TranslateableAttributes);


Ember.Checkbox.reopen({
	attributeBindings: ['required']
});


Ember.onerror = function(error) {
	if(error.status){
		Ember.Logger.error(error.status+":"+error.statusText);	
	}else{
		Ember.Logger.error(error+" : "+error.stack);
		Em.$.ajax({
			type: 'POST',
			url: '/api/error-notification',
			data: {
				stack: error+" : "+error.stack,
				otherInformation: error.message
			}
		});
	}
};


/*



""{
officialWorkdays:true,
				weekDays:[
						{
								period:[{from:8,to:16}]
						},
						{
								period:[{from:10,to:12},{from:14,to:16}]
						},
						{
								period:[{from:8,to:16}]
						},
						{
								period:[{from:8,to:16}]
						},
						{
								period:[{from:14,to:16}]
						},
						{
							period:[{from:14,to:16,even_week:true},
							{from:14,to:16,odd_week:true}]
						},
						{
						}
				],
				exception:{
						days: [{
								date: '2014.06.11',
								period:[{from:14,to:16}]
						},{date:'2014.06.12'},{date:'2014.06.13'}]

				}
}""


*/




// UTIL functions
App.convertToFormData=function (id,data){
	var text='', keys = Object.keys(data), i = keys.length;
	while (i--) {
		var key = keys[i];
		text+='--'+id+'\r\n';
		text+='Content-Disposition: form-data; name=\"'+key+'\"\r\n\r\n';
		text+=data[key]+'\r\n';
	}
	text+='--'+id+'--';
	return text;
}; 

App.equalize=function(id,child,recycle){
	var divs=Em.$(id);
	if(divs.length===0 && recycle){
		Ember.run.later(this, function(){App.equalize(id,child,recycle);} ,200);
	}else{
		var c=child || 'div';
		Em.$(id).equalize({equalize:"outerHeight",children:c});
	}
};



App.queryUrl = function(url,type,success,error,async,data,processdata,cache){
	type = type || 'GET';
	async = async || 'true';
	processdata = processdata || 'false';
	Em.$.ajaxSetup({async:async});
	return Em.$.ajax({
		type: type,
		data: data,
		url: url,
		processdata: processdata,
		cache: cache,
		success:success,
		error: error
	});
};

export default App;
