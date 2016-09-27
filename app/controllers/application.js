export default Ember.ObjectController.extend({
    queryParams: ['signin','signup'],
    signin:null,
    signup:null,
    signinObserver:function(){
        if(this.get('signin')!==null){
            this.send('jumpToSignin');
        }
        if(this.get('signup')!==null){
            this.send('jumpToSignup');
        }
    }.observes('signin','signup').on('init'),


    prevRouteName:null,
    tmpCurrRouteName:null,
    needs: ['application'],
    applicationController: Ember.computed.alias("controllers.application"),
    app:window.App,

    currentRouteNameObserver:function(){
        if(this.get("currentRouteName")===undefined || 
            this.get("currentRouteName")===null ||
             this.get("currentRouteName")==="loading"){
            return;
        }
        var curr=this.get("tmpCurrRouteName");
        if(curr!==this.get("currentRouteName")){
            this.set("prevRouteName",curr);
            window.Em.prevRouteName=curr;
        }
        this.set("tmpCurrRouteName",this.get("currentRouteName"));
        window.Em.currRouteName=this.get("currentRouteName");
    }.observes("currentRouteName").on("init"),
    //menuTitle:"Bébiszitter (kereső/bérlés/időre)?",
    cite: "Connecting experts",
    content: {},
    loadProcessing: false,
    saveProcessing: false,

    username:Ember.computed.readOnly('app.authManager.session.username'),
    userid:Ember.computed.readOnly('app.authManager.session.userid'),
    session:Ember.computed.readOnly('app.authManager.session'),

    profileImg:function(){
        return "background-image:url(/api/profileimage?u="+this.get('userid')+"&v="+this.get('session.version')+");float:left";
    }.property('session.version'),

    loading:function(){
    	return this.get('loadProcessing') || this.get('saveProcessing');
    }.property('loadProcessing','saveProcessing'),
    todayS:moment().format('YYYYMMDD'),
    token: function(){
        return window.App.authManager.token;
    }.property('app.authManager.token'),

    isAdmin: function(){
        return window.App.authManager.isAdmin();
    }.property('token'),
    isAuthenticated: function(){
        return window.App.authManager.isAuthenticated();
    }.property('token'),
    actions:{
        signout: function(){
            window.App.authManager.signOut();
            this.store.unloadAll('user');
            this.store.unloadAll('useracc');
            this.store.unloadAll('xprtDetail');
            this.store.unloadAll('event');
            this.set('token',null);
            Ember.run.schedule('afterRender',function(){
                var n = window.location.href.indexOf("#");
                window.location.href=window.location.href.substring(0,n);
            });
        }


    }
});
