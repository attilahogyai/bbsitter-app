import App from 'appkit/app';

function locX(value,option1,option2,option3,option4) {
    return App.locX(value,option1,option2,option3);
}
export default Ember.Handlebars.makeBoundHelper(locX);
