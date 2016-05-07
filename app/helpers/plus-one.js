import Ember from 'ember';

export function plusOne([ int ]/*, hash*/) {
  return int + 1;
}

export default Ember.Helper.helper(plusOne);
