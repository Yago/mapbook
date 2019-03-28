/** @jsx jsx */
import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { jsx, css } from '@emotion/core'; // eslint-disable-line
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

import { actions as categoriesActions } from '../../store/categories';
import { actions as pointsActions } from '../../store/points';
import styles from './CategoryDial.styles';

const CategoryDial = ({
  categories,
  toggleCategoriesActive,
  points,
  togglePointActive,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Start toggle active workflow for categories and points
  const toggleMarkers = category => {
    toggleCategoriesActive(category);
    togglePointActive(category);
  };

  return (
    <SpeedDial
      css={styles}
      onClick={() => setIsOpen(!isOpen)}
      ariaLabel="SpeedDial openIcon example"
      ButtonProps={{ color: 'primary' }}
      hidden={false}
      direction="up"
      open={isOpen}
      icon={
        isOpen ? (
          <span className="fas fa-times" />
        ) : (
          <span className="fas fa-map-marked-alt" />
        )
      }
    >
      {categories.collection.length > 0 &&
        categories.collection.map(item => {
          const actionCSS = css`
            background: ${item.fields.background} !important;
            [class^='fa'] {
              color: ${item.fields.color};
            }
          `;

          return (
            <SpeedDialAction
              key={item.id}
              css={item.active && actionCSS}
              tooltipTitle={item.fields.name}
              icon={<span className={item.fields.icon} />}
              onClick={() => toggleMarkers(item)}
            />
          );
        })}
    </SpeedDial>
  );
};

CategoryDial.propTypes = {};
CategoryDial.defaultProps = {};

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
)(CategoryDial);
