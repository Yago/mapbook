/** @jsx jsx */
import React, { useRef, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { jsx } from '@emotion/core'; // eslint-disable-line
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@fortawesome/fontawesome-free/css/all.css';

import styles from './MapGL.styles';
import mapConfig from './map.config.json';
import { actions as categoriesActions } from '../../store/categories';
import { actions as pointsActions } from '../../store/points';

const MapGL = ({
  categories,
  toggleCategoriesActive,
  points,
  togglePointActive,
}) => {
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

  // Start toggle active workflow for categories and points
  const toggleMarkers = category => {
    toggleCategoriesActive(category);
    togglePointActive(category);
  };

  return (
    <div css={styles}>
      <div id="map" className="map" />
      <div className="menu">
        <button onClick={() => switchBaseMap('default')}>Default</button>
        <button onClick={() => switchBaseMap('swiss')}>Swiss topo</button>
        <hr />
        {categories.collection.length > 0 &&
          categories.collection.map(item => (
            <label key={item.id}>
              <input
                type="checkbox"
                checked={item.active}
                onChange={e => toggleMarkers(item)}
              />
              {item.fields.name}
            </label>
          ))}
      </div>
    </div>
  );
};

MapGL.propTypes = {
  categories: PropTypes.object.isRequired,
  toggleCategoriesActive: PropTypes.func.isRequired,
  points: PropTypes.object.isRequired,
  togglePointActive: PropTypes.func.isRequired,
};
MapGL.defaultProps = {};

const mapState = ({ categories, points }) => ({ categories, points });

const mapDispatch = dispatch => {
  const { toggleCategoriesActive } = categoriesActions;
  const { togglePointActive } = pointsActions;
  return bindActionCreators(
    { toggleCategoriesActive, togglePointActive },
    dispatch,
  );
};

export default connect(
  mapState,
  mapDispatch,
)(MapGL);
