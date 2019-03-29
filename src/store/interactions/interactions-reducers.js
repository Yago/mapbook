import p from 'immer';
import { TOGGLE_DIAL } from './interactions-actions';

import initialState from './interactions-initial-state';

export default p((state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DIAL:
      state.isDialOpen = !state.isDialOpen;
      break;

    default:
      break;
  }

  return state;
});
