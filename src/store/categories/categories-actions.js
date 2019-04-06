import localforage from 'localforage';
import { airtableFetch } from '../../utils/airtable';
import mapConfig from '../../config/map.config.json';

export const SET_CATEGORIES = 'SET_CATEGORIES';
export const TOGGLE_ACTIVE_CATEGORIES = 'TOGGLE_ACTIVE_CATEGORIES';

export const setCategories = payload => ({
  type: SET_CATEGORIES,
  payload,
});

export const fetchCategories = isOpen => {
  return dispatch => {
    // Fetch from IndexedDB
    localforage.getItem('categories', (err, value) => {
      const payload = JSON.parse(value);
      if (!err && payload !== null && payload.length > 0)
        dispatch(setCategories(payload));
    });

    // Fetch from Airtable
    const { table_key, table_name } = mapConfig.airtable.categories;
    airtableFetch(table_key, table_name).then(data => {
      const payload = data
        .filter(i => i.fields.name !== undefined)
        .map(i => {
          const item = { ...i };
          item.active =
            item.fields.checked || !item.fields.checked === undefined;
          return item;
        });
      localforage.setItem('categories', JSON.stringify(payload));
      dispatch(setCategories(payload));
    });
  };
};

export const toggleCategoriesActive = category => ({
  type: TOGGLE_ACTIVE_CATEGORIES,
  payload: category,
});

export default {
  SET_CATEGORIES,
  TOGGLE_ACTIVE_CATEGORIES,
  setCategories,
  fetchCategories,
  toggleCategoriesActive,
};
