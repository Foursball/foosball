import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  modelNameFromPayloadKey(payloadKey) {
    if (payloadKey === 'players') {
      return this._super('foosballers');
    } else {
     return this._super('foosballer');
    }
  }
});
