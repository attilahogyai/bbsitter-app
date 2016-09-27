/*
var helper = Ember.Handlebars.registerHelper('each-2', function(context, options) {
  var ret = "";
  for(var i=0, j=context.length; i<j; i++) {
    ret = ret + options.fn(context[i]);
  }
  return ret;
});
*/
export default Ember.Handlebars.makeBoundHelper(function(name) {
  var ret = "";
  for(var i=0, j=this.context.length; i<j; i++) {
    ret = ret + this.options.fn(this.context[i]);
  }
  return ret;
});


/*
export default helper;
*/


