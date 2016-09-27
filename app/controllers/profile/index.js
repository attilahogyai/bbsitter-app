import FormController from "appkit/controllers/form";
import App from "appkit/app";
export default FormController.extend(DropletController,{
  lastJqXhr: null,
  lastRequest: null,
  mimeTypes: ['image/jpeg', 'image/jpg', 'image/png'],
  extensions: ['jpeg', 'jpg', 'gif', 'png'],
  dropletUrl: '/api/uploadprofileimage',
  requestHeaders:{"Authorization": "Bearer "+window.App.authManager.token},
  app:window.App,
  popup:true,
  xprtDetail:null,
  session:Ember.computed.alias('app.authManager.session'),

  password:null,
  newPassword:null,
  newPasswordAgain:null,
  locX_password_again:App.locX('/general/password_again'),

  processing:false,
  confirmText:function(){

    if(!this.get("processing")){
      return App.locX('/profile/upload_confirm'); 
    }else{
      return App.locX('/button/pending'); 
    }
  }.property('processing'),

  

  openBabySetup:Ember.computed.empty('app.authManager.session.prevLogin'),
  showBabyButton:function(){
    if(this.get('xprtDetail')===null || this.get('xprtDetail')===undefined){
      return true;
    }
    return false;
  }.property('xprtDetail'),
  saveSuccess:function(){
    FormController.prototype.saveSuccess.apply(this);
    this.get('session').set('username',this.get('instance.name'));
    this.get('session').save().then(function(){
      Ember.Logger.info('session updated');
    }).catch(function(status){
      Ember.Logger.error('session save error');
      Ember.Logger.error(status);
    });
  },
  _addFile: function(file, valid) {
        // Extract the file's extension which allows us to style accordingly.
        var className = 'extension-%@'.fmt(file.name.match(/\.(.+)$/i)[1]).toLowerCase();
        // Create the record with its default parameters, and then add it to the collection.
        var record = { file: file, valid: valid, uploaded: false, deleted: false, className: className };
        this.get('files').clear();
        this.get('files').pushObject(record);
        return record;
  },
  confirm:function(){
    return this.get('files').get('length')>0;
  }.property('files.length'),
  didUploadFiles:function(){
    // trigger filapath change
    this.set('files', []);
    this.set("processing",false);
    this.get('session').set('modifyDt',moment());
  },
  actions:{
    setupBabySitter:function(){
      this.send('infoAlert',{text: App.locX('/xprt_data/create_alert')});
      this.transitionTo('profile.xprt');
    },
    uploadFile:function(){
      if(!this.get('processing')){
        this.set("processing",true);
        this.send('uploadAllFiles');
      }
    },
    changePassword:function(){
      var reset=App.getData('/changepassword',true,'POST',true,false,{
        password:this.get('password'),
        new_password:this.get('newPassword')
      },null,null);

      var c=this;
      reset.then(function(){
        c.send('infoAlert',{text: App.locX('/profile/password_changed')});
        c.set('password',null);
        c.set('newPassword',null);
        c.set('newPasswordAgain',null);
        Em.$("#passwordAgain").val('');
      },function(){
        c.send('infoAlert',{text: App.locX('/profile/password_change_error')});
      });
    }
  }

});

