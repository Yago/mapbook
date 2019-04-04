/** @jsx jsx */
import { useRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { jsx } from '@emotion/core'; // eslint-disable-line
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

import styles from './MapGL.styles';
import mapConfig from '../../config/map.config.json';
import popupContent from '../../utils/popup-content';

const MapGL = ({ categories, interactions, points }) => {
  const map = useRef(null);
  const [currentLayer, setCurrentLayer] = useState('');
  mapboxgl.accessToken = 'undefined';

  // Initiate Map
  useEffect(() => {
    setCurrentLayer(interactions.currentLayer);

    // Init map instance
    map.current = new mapboxgl.Map({
      container: 'map',
      style: mapConfig.styles[interactions.currentLayer],
      center: [6.82713, 46.57167],
      zoom: 9,
    });

    // Add native controls
    const nav = new mapboxgl.NavigationControl({ showZoom: false });
    map.current.addControl(nav, 'top-right');
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      }),
    );

    // Inject cluster image
    if (!map.current.hasImage('cluster-img')) {
      map.current.loadImage('/cluster.png', (err, image) => {
        if (err) throw err;
        map.current.addImage('cluster-img', image);
      });
    }

    // Define cluster click event -> zoom
    map.current.on('click', 'clusters', function(e) {
      const features = map.current.queryRenderedFeatures(e.point, {
        layers: ['clusters'],
      });
      const clusterId = features[0].properties.cluster_id;
      map.current
        .getSource('points')
        .getClusterExpansionZoom(clusterId, (err, zoom) => {
          if (err) return;

          map.current.easeTo({
            center: features[0].geometry.coordinates,
            zoom: zoom,
          });
        });
    });

    // Define point click event -> open popup
    map.current.on('click', 'unclustered-points', e => {
      const point = e.features[0];

      new mapboxgl.Popup()
        .setLngLat(point.geometry.coordinates.slice())
        .setHTML(popupContent(point))
        .addTo(map.current);
    });

    // Set proper hover cursor
    map.current.on('mouseenter', 'clusters', () => {
      map.current.getCanvas().style.cursor = 'pointer';
    });
    map.current.on('mouseleave', 'clusters', () => {
      map.current.getCanvas().style.cursor = '';
    });
    map.current.on('mouseenter', 'unclustered-points', () => {
      map.current.getCanvas().style.cursor = 'pointer';
    });
    map.current.on('mouseleave', 'unclustered-points', () => {
      map.current.getCanvas().style.cursor = '';
    });

    // map.current.on('load', () => map.current.resize());
  }, []);

  // Inject categories marker images
  useEffect(() => {
    if (categories.collection.length > 0) {
      categories.collection.forEach(category => {
        const marker = category.fields.marker;
        const name = `marker-${category.fields.slug}`;
        if (marker && marker.length > 0) {
          map.current.loadImage(marker[0].url, (err, image) => {
            if (err) throw err;
            if (map.current.hasImage(name) !== true) {
              map.current.addImage(name, image);
            }
          });
        }
      });
    }
  }, [categories]);

  // Update Map layers when points.geojson updates
  useEffect(() => {
    if (map.current.loaded()) {
      if (map.current.getSource('points') === undefined) {
        map.current.addSource('points', {
          type: 'geojson',
          data: points.geojson,
          cluster: true,
          clusterMaxZoom: 14,
          clusterRadius: 50,
        });
      } else {
        map.current.getSource('points').setData(points.geojson);
      }

      if (points.geojson.features.length <= 0) {
        map.current.removeLayer('unclustered-points');
        map.current.removeLayer('clusters');
      } else if (map.current.getLayer('clusters') === undefined) {
        map.current.addLayer(mapConfig['unclustered-points']);
        map.current.addLayer(mapConfig.clusters);
      }
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
  interactions: PropTypes.object.isRequired,
  points: PropTypes.object.isRequired,
};
MapGL.defaultProps = {};

const mapState = ({ categories, interactions, points }) => ({
  categories,
  interactions,
  points,
});

export default connect(mapState)(MapGL);
