/** @jsx jsx */
import React, { useRef, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { jsx } from '@emotion/core'; // eslint-disable-line
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

import styles from './MapGL.styles';
import mapConfig from './map.config.json';

const MapGL = ({ categories, points }) => {
  const map = useRef(null);
  mapboxgl.accessToken = 'undefined';

  // Initiate Map
  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: 'map',
      style: mapConfig.styles['default'],
      center: [7.84956, 46.57591],
      zoom: 8,
    });

    const nav = new mapboxgl.NavigationControl({
      showZoom: false,
    });
    map.current.addControl(nav, 'top-right');
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      }),
    );
  }, []);

  // Update markers on Map when active state change
  useEffect(() => {
    if (points.collection.length > 0) {
      points.collection.forEach(point => {
        if (point.active) {
          point.marker.addTo(map.current);
        } else {
          point.marker.remove();
        }
      });
    }
  }, [points]);

  // Switch base Map layer
  const switchBaseMap = id => {
    map.current.setStyle(mapConfig.styles[id]);
  };

  return (
    <div css={styles}>
      <div id="map" className="map" />
      {/* <div className="menu">
        <button onClick={() => switchBaseMap('default')}>Default</button>
        <button onClick={() => switchBaseMap('swiss')}>Swiss topo</button>
      </div> */}
    </div>
  );
};

MapGL.propTypes = {
  categories: PropTypes.object.isRequired,
  points: PropTypes.object.isRequired,
};
MapGL.defaultProps = {};

const mapState = ({ categories, points }) => ({ categories, points });

export default connect(mapState)(MapGL);
