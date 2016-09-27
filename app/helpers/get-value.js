export default Ember.Handlebars.makeBoundHelper(function(name) {
  return this.get(name);
});


