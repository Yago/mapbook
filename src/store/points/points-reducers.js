import p from 'immer';
import { SET_POINTS, TOGGLE_ACTIVE } from './points-actions';

import initialState from './points-initial-state';

export default p((state = initialState, action) => {
  switch (action.type) {
    case SET_POINTS:
      state.geojson = action.payload;
      break;

    case TOGGLE_ACTIVE:
      state.geojson = state.geojson.map(item => {
        if (item.fields.category[0] === action.payload.id) {
          item.active = !action.payload.active;
        }
        return item;
      });
      break;

    default:
      break;
  }

  return state;
});
