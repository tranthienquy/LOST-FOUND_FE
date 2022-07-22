import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the unAuthorizedPage state domain
 */

const selectUnAuthorizedPageDomain = state =>
  state.unAuthorizedPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by UnAuthorizedPage
 */

const makeSelectUnAuthorizedPage = () =>
  createSelector(
    selectUnAuthorizedPageDomain,
    substate => substate,
  );

export default makeSelectUnAuthorizedPage;
export { selectUnAuthorizedPageDomain };
