import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the courseDetailPage state domain
 */

const selectCourseDetailPageDomain = state =>
  state.courseDetailPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CourseDetailPage
 */

const makeSelectCourseDetailPage = () =>
  createSelector(
    selectCourseDetailPageDomain,
    substate => substate,
  );

export default makeSelectCourseDetailPage;
export { selectCourseDetailPageDomain };
