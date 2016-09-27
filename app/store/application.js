import ApplicationAdapter from 'appkit/adapters/application';
var Store = DS.Store.extend({
    adapter: ApplicationAdapter,
    _owner: 'hoa'
});

export default Store;
