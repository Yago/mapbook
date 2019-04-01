import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import lightGreen from '@material-ui/core/colors/lightGreen';
import '@fortawesome/fontawesome-free/css/all.css';

import MapGL from './components/MapGL';
import CategoryDial from './components/CategoryDial';
import LayerDial from './components/LayerDial';
import { actions as categoriesActions } from './store/categories';
import { actions as pointsActions } from './store/points';

const muiTheme = createMuiTheme({
  palette: {
    primary: { main: '#304ffe' },
    secondary: lightGreen,
  },
});

const App = ({ categories, fetchCategories, points, fetchPoints }) => {
  // Get initial categories collection
  useEffect(() => {
    if (categories.collection.length <= 0) fetchCategories();
  }, []);

  // Get initial points geojson using categories collection
  useEffect(() => {
    if (
      points.geojson.features === undefined &&
      categories.collection.length > 0
    ) {
      fetchPoints(categories);
    }
  }, [categories]);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <LayerDial />
      <CategoryDial />
      <MapGL />
    </MuiThemeProvider>
  );
};

App.propTypes = {
  categories: PropTypes.object.isRequired,
  fetchCategories: PropTypes.func.isRequired,
  points: PropTypes.object.isRequired,
  fetchPoints: PropTypes.func.isRequired,
};
App.defaultProps = {};

const mapState = ({ categories, points }) => ({ categories, points });

const mapDispatch = dispatch => {
  const { fetchCategories } = categoriesActions;
  const { fetchPoints } = pointsActions;
  return bindActionCreators({ fetchCategories, fetchPoints }, dispatch);
};

export default connect(
  mapState,
  mapDispatch,
)(App);
