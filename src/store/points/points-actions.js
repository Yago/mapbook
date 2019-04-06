import localforage from 'localforage';
import { airtableFetch } from '../../utils/airtable';
import mapConfig from '../../config/map.config.json';

export const SET_POINTS = 'SET_POINTS';
export const TOGGLE_ACTIVE_POINTS = 'TOGGLE_ACTIVE_POINTS';

export const setPoints = payload => ({
  type: SET_POINTS,
  payload,
});

export const fetchPoints = categories => {
  return dispatch => {
    // Fetch from IndexedDB
    localforage.getItem('points', (err, value) => {
      const payload = JSON.parse(value);

      if (!err && payload !== null && payload.length > 0) {
        dispatch(setPoints(payload));
      }
    });

    // Fetch from Airtable
    let airtablePromise = null;
    if (Array.isArray(mapConfig.airtable.points)) {
      const airtablePromises = mapConfig.airtable.points.map(point => {
        const { table_key, table_name } = point;
        return airtableFetch(table_key, table_name);
      });
      airtablePromise = Promise.all(airtablePromises);
    } else {
      const { table_key, table_name } = mapConfig.airtable.points;
      airtablePromise = airtableFetch(table_key, table_name);
    }

    airtablePromise.then(res => {
      const data = Array.isArray(res[0])
        ? res.reduce((acc, val) => [...acc, ...val], [])
        : res;

      const payload = data
        .filter(i => i.fields !== undefined && i.fields.latitude !== undefined)
        .sort((a, b) => b.fields.latitude - a.fields.latitude)
        .map(point => {
          const pointCategory =
            typeof point.fields.category === 'string'
              ? point.fields.category
              : point.fields.category[0];
          const category = categories.collection.find(
            i => i.id === pointCategory,
          );

          // Apply GEOJSON format to point
          return {
            type: 'Feature',
            properties: {
              title: point.fields.title,
              description: point.fields.description,
              images: point.fields.images,
              category: category.id,
              active: category.active,
              marker: `marker-${category.fields.slug}`,
            },
            geometry: {
              type: 'Point',
              coordinates: [point.fields.longitude, point.fields.latitude],
            },
          };
        });

      localforage.setItem('points', JSON.stringify(payload));
      dispatch(setPoints(payload));
    });
  };
};

export const togglePointActive = category => ({
  type: TOGGLE_ACTIVE_POINTS,
  payload: category,
});

export default {
  SET_POINTS,
  TOGGLE_ACTIVE_POINTS,
  setPoints,
  fetchPoints,
  togglePointActive,
};
