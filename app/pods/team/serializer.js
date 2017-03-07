import ApplicationSerializer from 'foosball/pods/application/serializer';

export default ApplicationSerializer.extend({
  //TODO: make use of the users
  normalize(model, hash, prop) {
    if (hash.users) {
      hash.player1 = hash.users[0].id;
      hash.player2 = hash.users[1].id;
    }

    return this._super(...arguments);
  },

  serialize(snapshot, options) {
    let json = this._super(...arguments);

    json.users = [{
      id: json.player1
    }, {
      id: json.player2
    }];

    delete json.player1;
    delete json.player2;

    return json;
  }
});
