/** @jsx jsx */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { jsx } from '@emotion/core'; // eslint-disable-line

import L from 'leaflet';
import {
  Map as LeafletMap,
  TileLayer,
  Marker,
  Popup,
  Pane,
  LayersControl,
  LayerGroup,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-fa-markers/L.Icon.FontAwesome.js';
import 'leaflet-fa-markers/L.Icon.FontAwesome.css';
import '@fortawesome/fontawesome-free/css/all.css';

import styles, { popupStyles } from './Map.styles';

import { airtableFetch } from '../../utils/airtable';

const swissLayers = [
  'ch.swisstopo.swisstlm3d-wanderwege',
  // 'ch.bafu.wrz-wildruhezonen_portal',
  // 'ch.bafu.bundesinventare-auen',
  // 'ch.bafu.bundesinventare-hochmoore',
  // 'ch.bafu.bundesinventare-flachmoore_regional',
  // 'ch.bafu.bundesinventare-flachmoore',
  // 'ch.bafu.bundesinventare-jagdbanngebiete',
  // 'ch.bafu.schutzgebiete-schweizerischer_nationalpark',
];

const Map = ({}) => {
  const [points, setPoints] = useState([]);
  if (points.length <= 0) {
    airtableFetch('Points').then(data =>
      setPoints(data.filter(i => i.fields.latitude !== undefined)),
    );
  }

  const [categories, setCategories] = useState([]);
  if (categories.length <= 0) {
    airtableFetch('Categories').then(data =>
      setCategories(
        data
          .filter(i => i.fields.name !== undefined)
          .map(cat => {
            const icon = L.icon.fontAwesome({
              iconClasses: cat.fields.icon,
              markerColor: cat.fields.background,
              iconColor: cat.fields.color,
              markerPath:
                'M16,0 C7.12871978,0 0,7.12592722 0,16 C0,24.8712802 16,46.5436775 16,46.5436775 C16,46.5436775 32,24.8712802 32,16 C32,7.12592722 24.8712802,0 16,0 Z',
            });

            return {
              ...cat,
              icon,
            };
          }),
      ),
    );
  }

  return (
    <LeafletMap
      center={[46.57591, 7.84956]}
      zoom={8}
      crs={L.CRS.EPSG3857}
      css={styles}
      continuousWorld={true}
      worldCopyJump={false}
      zoomSnap={true}
      zoomControl={false}
    >
      <Pane name="fixedPane" />
      <LayersControl position="bottomright" collapsed={true}>
        <LayersControl.BaseLayer name="Swiss color map" checked>
          <TileLayer
            url="https://wmts20.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg"
            detectRetina={true}
            maxZoom={18}
          />
        </LayersControl.BaseLayer>
        <LayersControl.Overlay name="🗺️ Swiss hiking paths">
          <TileLayer
            url="https://wmts20.geo.admin.ch/1.0.0/ch.swisstopo.swisstlm3d-wanderwege/default/current/3857/{z}/{x}/{y}.png"
            detectRetina={true}
          />
        </LayersControl.Overlay>
        {categories.length > 0 &&
          points.length > 0 &&
          categories.map(category => (
            <LayersControl.Overlay
              key={category.id}
              name={category.fields.name}
              checked={category.fields.checked}
            >
              <LayerGroup>
                {points
                  .filter(i => i.fields.category[0] === category.id)
                  .sort((a, b) => b.fields.latitude - a.fields.latitude)
                  .map(point => (
                    <Marker
                      key={point.id}
                      position={[point.fields.latitude, point.fields.longitude]}
                      icon={
                        categories.find(i => i.id === point.fields.category[0])
                          .icon
                      }
                    >
                      <Popup
                        autoPan={true}
                        minWidth={window.innerWidth - 50}
                        maxHeight={window.innerHeight - 200}
                        minHeight={window.innerHeight - 200}
                        offset={[0, window.innerHeight / 2]}
                        pane="fixedPane"
                        className="popup-fixed"
                      >
                        {point.fields.title && <h3>{point.fields.title}</h3>}
                        {point.fields.description && (
                          <div
                            className="popup-desc"
                            dangerouslySetInnerHTML={{
                              __html: point.fields.description,
                            }}
                          />
                        )}
                        {point.fields.images &&
                          point.fields.images.length > 0 &&
                          point.fields.images.map(img => (
                            <img key={img.id} src={img.thumbnails.large.url} />
                          ))}
                      </Popup>
                    </Marker>
                  ))}
              </LayerGroup>
            </LayersControl.Overlay>
          ))}
      </LayersControl>
    </LeafletMap>
  );
};

Map.propTypes = {};
Map.defaultProps = {};

export default Map;
