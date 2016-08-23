import Ember from 'ember';

const { Service } = Ember;

export default Service.extend({
  newGame: false,

  actions: {
    toggleDialog(dialogName) {
      this.toggleProperty(dialogName);
    }
  }
});
