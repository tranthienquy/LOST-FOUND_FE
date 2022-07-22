/*
 *
 * UnAuthorizedPage actions
 *
 */

import { DEFAULT_ACTION, END_OF_ACTION } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export const endOfAction = () => {
  return {
    type: END_OF_ACTION,
  };
};
