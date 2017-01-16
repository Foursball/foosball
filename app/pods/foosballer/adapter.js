import ApplicationAdapter from 'foosball/pods/application/adapter';
import DS from 'ember-data';

export default ApplicationAdapter.extend(DS.BuildURLMixin, {
  buildURL() {
    let url = this._super(...arguments);

    return url.replace('foosballer', 'player');
  }
});
