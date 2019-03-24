/** @jsx jsx */
import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { jsx } from '@emotion/core'; // eslint-disable-line
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@fortawesome/fontawesome-free/css/all.css';

import styles from './MapGL.styles';
import mapConfig from './map-config.json';
import marker from './map-components/marker';
import { airtableFetch } from '../../utils/airtable';

const MapGL = ({}) => {
  const map = useRef(null);
  mapboxgl.accessToken = 'undefined';

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: 'map',
      style: mapConfig.styles['default'],
      center: [7.84956, 46.57591],
      zoom: 8,
    });
  }, []);

  const [categories, setCategories] = useState([]);
  if (categories.length <= 0) {
    airtableFetch('Categories').then(data => {
      const res = data
        .filter(i => i.fields.name !== undefined)
        .map(cat => {
          cat.marker = marker(
            cat.fields.color,
            cat.fields.background,
            cat.fields.icon,
          );

          cat.points = [];

          return cat;
        });
      setCategories(res);
    });
  }

  const [points, setPoints] = useState([]);
  useEffect(() => {
    if (points.length <= 0 && categories.length > 0) {
      airtableFetch('Points').then(data => {
        const res = data
          .filter(i => i.fields.latitude !== undefined)
          .sort((a, b) => b.fields.latitude - a.fields.latitude)
          .map(point => {
            const cat = categories.find(i => i.id === point.fields.category[0]);

            const el = document.createElement('div');
            el.className = 'marker';
            el.innerHTML = cat ? cat.marker : '';

            // create the marker
            const marker = new mapboxgl.Marker(el)
              .setLngLat([point.fields.longitude, point.fields.latitude])
              .setPopup(
                new mapboxgl.Popup({ offset: 25 }).setText(`Sup ? ${point.id}`),
              );

            return {
              ...point,
              marker,
              active: cat ? cat.fields.checked : false,
            };
          });

        setPoints(res);
      });
    }
  }, [categories]);

  useEffect(() => {
    if (points.length > 0) {
      points.forEach(point => {
        if (point.active) point.marker.addTo(map.current);
      });
    }
  }, [points]);

  const switchBaseMap = id => {
    map.current.setStyle(mapConfig.styles[id]);
  };

  const toggleMarkers = id => {
    points.forEach(point => {
      if (point.fields.category[0] === id) point.active = !point.active;
      if (point.active) {
        point.marker.addTo(map.current);
      } else {
        point.marker.remove();
      }
    });
  };

  return (
    <div css={styles}>
      <div id="map" className="map" />
      <div className="menu">
        <button onClick={() => switchBaseMap('default')}>Default</button>
        <button onClick={() => switchBaseMap('swiss')}>Swiss topo</button>
        <hr />
        {categories.length > 0 &&
          categories.map(cat => (
            <button key={cat.id} onClick={() => toggleMarkers(cat.id)}>
              {cat.fields.name}
            </button>
          ))}
      </div>
    </div>
  );
};

MapGL.propTypes = {};
MapGL.defaultProps = {};

export default MapGL;
