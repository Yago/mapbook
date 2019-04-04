import p from 'immer';
import { SET_POINTS, TOGGLE_ACTIVE_POINTS } from './points-actions';

import initialState from './points-initial-state';

export default p((state = initialState, action) => {
  switch (action.type) {
    case SET_POINTS:
      state.collection = action.payload;
      state.geojson.features = action.payload.filter(
        item => item.properties.active,
      );
      break;

    case TOGGLE_ACTIVE_POINTS:
      state.collection = state.collection.map(item => {
        if (item.properties.category === action.payload.id) {
          item.properties.active = !action.payload.active;
        }
        return item;
      });
      state.geojson.features = state.collection.filter(
        feature => feature.properties.active,
      );
      break;

    default:
      break;
  }

  return state;
});
