import { airtableFetch } from '../../utils/airtable';
import createMarker from '../../utils/create-marker';

export const SET_CATEGORIES = 'SET_CATEGORIES';
export const TOGGLE_ACTIVE = 'TOGGLE_ACTIVE';

export const setCategories = payload => ({
  type: SET_CATEGORIES,
  payload,
});

export const fetchCategories = isOpen => {
  return dispatch => {
    airtableFetch('Categories').then(data => {
      const payload = data
        .filter(i => i.fields.name !== undefined)
        .map(i => {
          const item = { ...i };
          item.marker = createMarker(
            item.fields.color,
            item.fields.background,
            item.fields.icon,
          );

          item.active =
            item.fields.checked || !item.fields.checked === undefined;
          item.points = [];

          return item;
        });
      dispatch(setCategories(payload));
    });
  };
};

export const toggleCategoriesActive = category => ({
  type: TOGGLE_ACTIVE,
  payload: category,
});

export default {
  SET_CATEGORIES,
  TOGGLE_ACTIVE,
  setCategories,
  fetchCategories,
  toggleCategoriesActive,
};
