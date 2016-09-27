import App from "appkit/app";
var ApplicationAdapter=DS.RESTAdapter.reopen({
	namespace:"api",
	ajaxOptions: function(url, type, hash){
		if(url.indexOf('?')==-1){
			url+='?l='+App.getLang().toUpperCase();
		}else{
			url+='&l='+App.getLang().toUpperCase();
		}
		var retv=this._super(url,type,hash);

		retv.beforeSend = function (xhr) {
			if(window.App.authManager.token){
     			xhr.setRequestHeader("Authorization", "Bearer "+window.App.authManager.token);
     		}
        };
        return retv;
  	},
	ajax: function(url, type, options) {
		var retv=this._super(url,type,options);
		retv.catch(function(response){
			if(response.status=="401"){
				App.reload();
			}
		});
    	return retv;
  	},
});
export default ApplicationAdapter;