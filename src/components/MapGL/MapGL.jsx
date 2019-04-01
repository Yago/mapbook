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

    map.current.loadImage('/cluster.png', (err, image) => {
      if (err) throw err;
      map.current.addImage('cluster-img', image);
    });

    // map.current.on('load', () => map.current.resize());
  }, []);

  useEffect(() => {
    if (categories.collection.length > 0) {
      categories.collection.forEach(category => {
        const marker = category.fields.marker;
        const name = `marker-${category.fields.slug}`;
        if (marker && marker.length > 0 && !map.current.hasImage(name)) {
          map.current.loadImage(marker[0].url, (err, image) => {
            if (err) throw err;
            map.current.addImage(name, image);
          });
        }
      });
    }
  }, [categories]);

  // Update points on Map when active state change
  useEffect(() => {
    if (
      points.geojson.features &&
      points.geojson.features.length > 0 &&
      map.current.getLayer('clusters') === undefined
    ) {
      map.current.addSource('points', {
        type: 'geojson',
        data: points.geojson,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50,
      });

      map.current.addLayer({
        id: 'clusters',
        filter: ['has', 'point_count'],
        type: 'symbol',
        source: 'points',
        layout: {
          'icon-image': 'cluster-img',
          'icon-size': 0.4,
          'text-field': '{point_count_abbreviated}',
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12,
        },
        paint: {
          'text-color': '#fff',
        },
      });

      map.current.addLayer({
        id: 'unclustered-point',
        type: 'symbol',
        source: 'points',
        filter: ['!', ['has', 'point_count']],
        layout: {
          'icon-image': '{marker}',
          'icon-size': 0.33,
          'icon-anchor': 'bottom',
        },
      });

      // inspect a cluster on click
      map.current.on('click', 'clusters', function(e) {
        var features = map.current.queryRenderedFeatures(e.point, {
          layers: ['clusters'],
        });
        var clusterId = features[0].properties.cluster_id;
        map.current
          .getSource('points')
          .getClusterExpansionZoom(clusterId, function(err, zoom) {
            if (err) return;

            map.current.easeTo({
              center: features[0].geometry.coordinates,
              zoom: zoom,
            });
          });
      });

      map.current.on('mouseenter', 'clusters', function() {
        map.current.getCanvas().style.cursor = 'pointer';
      });
      map.current.on('mouseleave', 'clusters', function() {
        map.current.getCanvas().style.cursor = '';
      });

      // points.collection.forEach(point => {
      //   if (point.active) {
      //     point.marker.addTo(map.current);
      //   } else {
      //     point.marker.remove();
      //   }
      // });
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
