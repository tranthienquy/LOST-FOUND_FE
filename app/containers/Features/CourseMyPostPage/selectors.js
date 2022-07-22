import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the courseMyPostPage state domain
 */

const selectCourseMyPostPageDomain = state => state.courseMyPostPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CourseMyPostPage
 */

const makeSelectCourseMyPostPage = () =>
  createSelector(
    selectCourseMyPostPageDomain,
    substate => substate,
  );

export default makeSelectCourseMyPostPage;
export { selectCourseMyPostPageDomain };
