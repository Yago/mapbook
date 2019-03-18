/** @jsx jsx */
import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { jsx } from '@emotion/core'; // eslint-disable-line

import L from 'leaflet';
import {
  Map as LeafletMap,
  TileLayer,
  Marker,
  Popup,
  Pane,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-fa-markers/L.Icon.FontAwesome.js';
import 'leaflet-fa-markers/L.Icon.FontAwesome.css';
import '@fortawesome/fontawesome-free/css/all.css';
import shadow from '../../assets/shadow.png';

import styles, { popupStyles } from './Map.styles';

// const popup = L.popup();

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
  const icon = L.icon.fontAwesome({
    iconClasses: 'fas fa-hiking',
    markerColor: '#4cd964',
    iconColor: '#FFF',
    markerPath:
      'M16,0 C7.12871978,0 0,7.12592722 0,16 C0,24.8712802 16,46.5436775 16,46.5436775 C16,46.5436775 32,24.8712802 32,16 C32,7.12592722 24.8712802,0 16,0 Z',
  });

  return (
    <LeafletMap
      center={[46.03294, 7.30789]}
      zoom={15}
      crs={L.CRS.EPSG3857}
      css={styles}
      continuousWorld={true}
      worldCopyJump={false}
      zoomSnap={true}
      zoomControl={false}
    >
      <TileLayer
        url="https://wmts20.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg"
        detectRetina={true}
        maxZoom={18}
      />
      <TileLayer
        url="https://wmts20.geo.admin.ch/1.0.0/ch.swisstopo.swisstlm3d-wanderwege/default/current/3857/{z}/{x}/{y}.png"
        detectRetina={true}
      />
      <Pane name="fixedPane" />
      <Marker position={[46.03294, 7.30789]} icon={icon}>
        <Popup
          autoPan={true}
          minWidth={window.innerWidth - 50}
          maxHeight={window.innerHeight - 200}
          minHeight={window.innerHeight - 200}
          offset={[0, window.innerHeight / 2]}
          // autoPanPaddingBottomRight={0}
          keepInView
          pane="fixedPane"
          className="popup-fixed"
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dulce
            amarum, leve asperum, prope longe, stare movere, quadratum rotundum.
            Quid ergo aliud intellegetur nisi uti ne quae pars naturae
            neglegatur? Quae quo sunt excelsiores, eo dant clariora indicia
            naturae. Ergo id est convenienter naturae vivere, a natura
            discedere. Nulla profecto est, quin suam vim retineat a primo ad
            extremum. Duo Reges: constructio interrete.
          </p>
        </Popup>
      </Marker>
    </LeafletMap>
  );
};

Map.propTypes = {};
Map.defaultProps = {};

export default Map;
