import localforage from 'localforage';

import { airtableFetch } from '../../utils/airtable';

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
    airtableFetch('Points').then(data => {
      const payload = data
        .filter(i => i.fields.latitude !== undefined)
        .sort((a, b) => b.fields.latitude - a.fields.latitude)
        .map(point => {
          const category = categories.collection.find(
            i => i.id === point.fields.category[0],
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
