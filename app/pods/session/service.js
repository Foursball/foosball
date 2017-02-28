import Ember from 'ember';

const {
  Service,
  computed: { alias }
} = Ember;

export default Service.extend({
  currentUser: null,

  isAuthenticated: alias('currentUser.uid')
});
