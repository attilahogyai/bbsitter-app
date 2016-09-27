import IndexController from "appkit/controllers/index";
import App from "appkit/app";
export default IndexController.extend({
  //cityText: Ember.computed.alias('app.authManager.city'),
  app:window.App,
  searchResult:null,
  resultCountText:function(){
    if(this.get('searchResult')!==null){
        Ember.run.later(this, function(){App.equalize("#searchResults", "div.id-panel-lens",false);} ,200);
      return App.locX('/landing/result_count',this.get('searchResult').get('length'));
    }else{
      return '';
    }
  }.property('searchResult')
});
