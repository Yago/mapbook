import p from 'immer';
import { SET_CATEGORIES, TOGGLE_ACTIVE } from './categories-actions';

import initialState from './categories-initial-state';

export default p((state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      state.collection = action.payload;
      break;

    case TOGGLE_ACTIVE:
      state.collection = state.collection.map(item => {
        if (item.id === action.payload.id) item.active = !action.payload.active;
        return item;
      });
      break;

    default:
      break;
  }

  return state;
});
