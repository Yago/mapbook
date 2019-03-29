/** @jsx jsx */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { jsx, css } from '@emotion/core'; // eslint-disable-line
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import Avatar from '@material-ui/core/Avatar';

import styles, { avatarCSS } from './LayerDial.styles';
import mapConfig from '../../config/map.config.json';
import { actions as interactionsActions } from '../../store/interactions';

import basemap from '../../assets/basemap.png';
import swisstopo from '../../assets/swisstopo.png';
import satelite from '../../assets/satelite.png';

const images = {
  basemap,
  swisstopo,
  satelite,
};

const LayerDial = ({ interactions, setLayer }) => {
  const layers = Object.keys(mapConfig.styles);

  return (
    <SpeedDial
      css={styles}
      ariaLabel="SpeedDial openIcon example"
      ButtonProps={{ color: 'secondary' }}
      hidden={false}
      icon={<span className="fas fa-layer-group" />}
      direction="left"
      open={interactions.isDialOpen}
    >
      {layers.length > 0 &&
        layers.reverse().map(layer => {
          const actionCSS = css`
            background: #304ffe !important;
          `;

          return (
            <SpeedDialAction
              key={layer}
              css={layer === interactions.currentLayer && actionCSS}
              ButtonProps={{ size: 'large' }}
              tooltipTitle={layer}
              tooltipPlacement="top"
              icon={<Avatar css={avatarCSS} src={images[layer]} />}
              onClick={() => setLayer(layer)}
            />
          );
        })}
    </SpeedDial>
  );
};

LayerDial.propTypes = {};
LayerDial.defaultProps = {};

const mapState = ({ interactions }) => ({
  interactions,
});

const mapDispatch = dispatch => {
  const { setLayer } = interactionsActions;
  return bindActionCreators({ setLayer }, dispatch);
};

export default connect(
  mapState,
  mapDispatch,
)(LayerDial);
