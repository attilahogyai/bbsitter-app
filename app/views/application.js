import Foundation from "appkit/utils/foundation";
var ApplicationView=Em.View.extend(Foundation,{
	changeSizeListeners: Ember.Object.create(),
	didInsertElement: function(){
		this.initFoundation();
		
		this.viewportSizeChanged();
		var target = document.querySelector('body');
		/*
 		target.addEventListener("onresize",function(event){
 			window.console.log('change 1 size');
 			this.displayViewportHeight();
 		},false);
 		 		target.onresize=function(event){
 			window.console.log('change 1 size');
 			this.displayViewportHeight();
 		};
 		*/
 		if(this.get('changeSizeListeners')){
 			this.get('changeSizeListeners').destroy();
 		}
 		this.set('changeSizeListeners',Ember.Object.create());
 		var e=this;
 		Em.changeSize=function(event){
 			e.viewportSizeChanged();

 			for (var property in e.get('changeSizeListeners')) {
			    if (e.get('changeSizeListeners').hasOwnProperty(property)) {
			    	var listenersArray=e.get('changeSizeListeners').get(property);
			    	if(listenersArray===undefined) { continue; }
					for(var i=0;i<listenersArray.length;i++){
						Ember.run(listenersArray[i]);
 					}
			    }
			}
 		};
 		Em.addChangeSizeListener=function(listener,owner){
 			var listeners=e.get('changeSizeListeners'); 
 			if(listeners.get(owner.toString())===undefined){
 				listeners.set(owner.toString(),[]);
 				listeners.set(owner.toString(),[]);
 			}
 			listeners.get(owner.toString()).push(listener);	
 			e.set('changeSizeListeners',listeners);
 		};
 		Em.removeChangeSizeListeners=function(owner){
 			if(this.get('changeSizeListeners')){
 				this.get('changeSizeListeners').destroy();
 			}
 		};
		 
		// later, you can stop observing
		//observer.disconnect();
		/*
		Em.$( "#main" ).bind('onpropertychange',function (e){
			e.preventDefault();
    		window.console.log('a div with  has changed it\'s height, the function below should do something about this...');  
    		
		});  
*/
	},
	viewportSizeChanged:function(){
		var fullHeight=Em.$( "body" ).height();
		var headerSize=0;
		var navs=Em.$( "nav" );
		navs.map(function(item){
			var n=Em.$(navs[item]);
			if(n.css('display')!=='none'){
				headerSize=headerSize+n.outerHeight();
			}
		});
		var footerHeight=Em.$( "#footer" ).outerHeight();

		var mainHeight=fullHeight - footerHeight - headerSize;
		Em.$( "#main" ).css('min-height',mainHeight);
		//window.console.log('full height:'+fullHeight+'/ headerSize:'+headerSize+' footerheight:'+footerHeight+' mainheight:'+mainHeight);
	}
});
export default ApplicationView;