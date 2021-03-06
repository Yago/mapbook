/** @jsx jsx */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { jsx, css } from '@emotion/core'; // eslint-disable-line
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

import { actions as categoriesActions } from '../../store/categories';
import { actions as interactionsActions } from '../../store/interactions';
import { actions as pointsActions } from '../../store/points';
import styles from './CategoryDial.styles';

const CategoryDial = ({
  categories,
  toggleCategoriesActive,
  points,
  togglePointActive,
  interactions,
  toggleDial,
}) => {
  // Start toggle active workflow for categories and points
  const toggleMarkers = category => {
    toggleCategoriesActive(category);
    togglePointActive(category);
  };

  return (
    <SpeedDial
      css={styles}
      onClick={() => toggleDial()}
      ariaLabel="SpeedDial openIcon example"
      ButtonProps={{ color: 'primary' }}
      hidden={false}
      direction="up"
      open={interactions.isDialOpen}
      icon={
        interactions.isDialOpen ? (
          <span className="fas fa-times" />
        ) : (
          <span className="fas fa-layer-group" />
        )
      }
    >
      {categories.collection.length > 0 &&
        categories.collection.map(item => {
          const defaultCSS = css`
            background: #212121 !important;
            [class^='fa'] {
              color: #fafafa;
            }
          `;

          const activeCSS = css`
            background: ${item.fields.background} !important;
            [class^='fa'] {
              color: ${item.fields.color};
            }
          `;

          return (
            <SpeedDialAction
              key={item.id}
              css={item.active ? activeCSS : defaultCSS}
              tooltipTitle={item.fields.name}
              icon={<span className={item.fields.icon} />}
              onClick={() => toggleMarkers(item)}
            />
          );
        })}
    </SpeedDial>
  );
};

CategoryDial.propTypes = {
  categories: PropTypes.object.isRequired,
  points: PropTypes.object.isRequired,
  interactions: PropTypes.object.isRequired,
  toggleCategoriesActive: PropTypes.func.isRequired,
  togglePointActive: PropTypes.func.isRequired,
  toggleDial: PropTypes.func.isRequired,
};
CategoryDial.defaultProps = {};

const mapState = ({ categories, points, interactions }) => ({
  categories,
  points,
  interactions,
});

const mapDispatch = dispatch => {
  const { toggleCategoriesActive } = categoriesActions;
  const { togglePointActive } = pointsActions;
  const { toggleDial } = interactionsActions;
  return bindActionCreators(
    { toggleCategoriesActive, togglePointActive, toggleDial },
    dispatch,
  );
};

export default connect(
  mapState,
  mapDispatch,
)(CategoryDial);
