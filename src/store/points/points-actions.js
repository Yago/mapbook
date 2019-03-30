import mapboxgl from 'mapbox-gl';
import localforage from 'localforage';
import { OpenLocationCode } from 'open-location-code';

import { airtableFetch } from '../../utils/airtable';

export const SET_POINTS = 'SET_POINTS';
export const TOGGLE_ACTIVE = 'TOGGLE_ACTIVE';

const createMarker = (point, category) => {
  const el = document.createElement('div');
  el.className = 'marker';
  el.innerHTML = category ? category.marker : '';

  const openLocation = new OpenLocationCode();
  const plusCode = openLocation.encode(
    point.fields.latitude,
    point.fields.longitude,
  );

  return new mapboxgl.Marker(el)
    .setLngLat([point.fields.longitude, point.fields.latitude])
    .setPopup(
      new mapboxgl.Popup({ offset: 25 }).setHTML(`
      <div class="mapboxgl-popup-content-inner">
        ${point.fields.title ? `<h2>${point.fields.title}</h2>` : ''}
        <pre>${plusCode}</pre>
        ${point.fields.description || ''}
        ${
          point.fields.images && point.fields.images.length > 0
            ? point.fields.images.map(
                img => `<img src="${img.thumbnails.large.url}" />`,
              )
            : ''
        }
      </div>
    `),
    );
};

export const setPoints = payload => ({
  type: SET_POINTS,
  payload,
});

export const fetchPoints = categories => {
  return dispatch => {
    localforage.getItem('points', (err, value) => {
      const payload = JSON.parse(value).map(item => {
        const point = { ...item, marker: null };
        const category = categories.collection.find(
          i => i.id === point.fields.category[0],
        );
        point.marker = createMarker(point, category);
        return point;
      });

      if (!err && payload !== null && payload.length > 0)
        dispatch(setPoints(payload));
    });

    airtableFetch('Points').then(data => {
      const payload = data
        .filter(i => i.fields.latitude !== undefined)
        .sort((a, b) => b.fields.latitude - a.fields.latitude)
        .map(point => {
          const category = categories.collection.find(
            i => i.id === point.fields.category[0],
          );
          point.marker = null;

          // create the marker
          const marker = createMarker(point, category);

          return {
            ...point,
            marker,
            active: category.active,
          };
        });

      localforage.setItem('points', JSON.stringify(payload));
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
