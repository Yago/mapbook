import mapboxgl from 'mapbox-gl';
import { airtableFetch } from '../../utils/airtable';

export const SET_POINTS = 'SET_POINTS';
export const TOGGLE_ACTIVE = 'TOGGLE_ACTIVE';

export const setPoints = payload => ({
  type: SET_POINTS,
  payload,
});

export const fetchPoints = categories => {
  return dispatch => {
    airtableFetch('Points').then(data => {
      const payload = data
        .filter(i => i.fields.latitude !== undefined)
        .sort((a, b) => b.fields.latitude - a.fields.latitude)
        .map(point => {
          const category = categories.collection.find(
            i => i.id === point.fields.category[0],
          );

          const el = document.createElement('div');
          el.className = 'marker';
          el.innerHTML = category ? category.marker : '';

          // create the marker
          const marker = new mapboxgl.Marker(el)
            .setLngLat([point.fields.longitude, point.fields.latitude])
            .setPopup(
              new mapboxgl.Popup({ offset: 25 }).setText(`Sup ? ${point.id}`),
            );

          return {
            ...point,
            marker,
            active: category.active,
          };
        });

      dispatch(setPoints(payload));
    });
  };
};

export const togglePointActive = category => ({
  type: TOGGLE_ACTIVE,
  payload: category,
});

export default {
  SET_POINTS,
  setPoints,
  fetchPoints,
  togglePointActive,
};
