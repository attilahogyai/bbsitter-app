import App from "appkit/app";
var CityModel=DS.Model.extend({
	cityName: DS.attr('string'),
  stateCode: DS.attr('string'),
  countryCode: DS.attr('string')
});

CityModel.FIXTURES=[
  {
    id: 1,
    cityName: 'Budapest',
    stateCode: '',
    countryCode: 'HU'
  },
  {
    id: 2,
    cityName: 'Budaőrs',
    stateCode: '',
    countryCode: 'HU'
  },
  {
    id: 3,
    cityName: 'Pécs',
    stateCode: '',
    countryCode: 'HU'
  },
  {
    id: 4,
    cityName: 'Salgótarján',
    stateCode: '',
    countryCode: 'HU'
  },
  {
    id: 5,
    cityName: 'Debrecen',
    stateCode: '',
    countryCode: 'HU'
  },
  {
    id: 6,
    cityName: 'Dunaújváros',
    stateCode: '',
    countryCode: 'HU'
  },
  {
    id: 7,
    cityName: 'Berettyóújfalu',
    stateCode: '',
    countryCode: 'HU'
  },
  {
    id: 8,
    cityName: 'Berettyó',
    stateCode: '',
    countryCode: 'HU'
  },
  {
    id: 9,
    cityName: 'Magyarország',
    stateCode: '',
    countryCode: 'HU'
  },
  {
    id: 10,
    cityName: 'Bugyi',
    stateCode: '',
    countryCode: 'HU'
  },
  {
    id: 11,
    cityName: 'Budapest XI ker.',
    stateCode: '',
    countryCode: 'HU'
  },
  {
    id: 12,
    cityName: 'Budapest XII ker.',
    stateCode: '',
    countryCode: 'HU'
  },
  {
    id: 13,
    cityName: 'Budapest XIV ker.',
    stateCode: '',
    countryCode: 'HU'
  }


];

export default CityModel;
Ember.Inflector.inflector.uncountable('city');