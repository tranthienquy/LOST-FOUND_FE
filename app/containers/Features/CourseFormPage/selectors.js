import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the courseFormPage state domain
 */

const selectCourseFormPageDomain = state =>
  state.courseFormPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CourseFormPage
 */

const makeSelectCourseFormPage = () =>
  createSelector(
    selectCourseFormPageDomain,
    substate => substate,
  );

export default makeSelectCourseFormPage;
export { selectCourseFormPageDomain };
