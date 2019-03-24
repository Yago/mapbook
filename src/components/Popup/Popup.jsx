/** @jsx jsx */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { jsx } from '@emotion/core'; // eslint-disable-line

import L from 'leaflet';
import { Popup as LeafletPopup } from 'react-leaflet';

import styles from './Popup.styles';

const Popup = ({ point }) => (
  <LeafletPopup
    autoPan={true}
    minWidth={window.innerWidth - 50}
    maxHeight={window.innerHeight - 200}
    minHeight={window.innerHeight - 200}
    offset={[0, window.innerHeight / 2]}
    pane="fixedPane"
    css={styles}
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
  </LeafletPopup>
);

Popup.propTypes = {
  point: PropTypes.object.isRequired,
};
Popup.defaultProps = {};

export default Popup;
