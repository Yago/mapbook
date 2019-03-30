/** @jsx jsx */
import React, { useRef, useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { jsx } from '@emotion/core'; // eslint-disable-line
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

import styles from './MapGL.styles';
import mapConfig from '../../config/map.config.json';

const MapGL = ({ categories, interactions, points }) => {
  const map = useRef(null);
  const [currentLayer, setCurrentLayer] = useState('');
  mapboxgl.accessToken = 'undefined';

  // Initiate Map
  useEffect(() => {
    setCurrentLayer(interactions.currentLayer);
    map.current = new mapboxgl.Map({
      container: 'map',
      style: mapConfig.styles[interactions.currentLayer],
      center: [6.82713, 46.57167],
      zoom: 9,
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

    map.current.on('load', () => map.current.resize());
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
  useEffect(() => {
    if (interactions.currentLayer !== currentLayer) {
      map.current.setStyle(mapConfig.styles[interactions.currentLayer]);
      setCurrentLayer(interactions.currentLayer);
    }
  }, [interactions]);

  return (
    <div css={styles}>
      <div
        id="map"
        className="map"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}
      />
    </div>
  );
};

MapGL.propTypes = {
  categories: PropTypes.object.isRequired,
  points: PropTypes.object.isRequired,
};
MapGL.defaultProps = {};

const mapState = ({ categories, interactions, points }) => ({
  categories,
  interactions,
  points,
});

export default connect(mapState)(MapGL);
