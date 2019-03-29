import { combineReducers } from 'redux';

import { reducers as categories } from './categories/index';
import { reducers as interactions } from './interactions/index';
import { reducers as points } from './points/index';

const rootReducer = combineReducers({
  categories,
  interactions,
  points,
});

export default rootReducer;
