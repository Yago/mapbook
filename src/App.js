import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MapGL from './components/MapGL';
import { actions as categoriesActions } from './store/categories';
import { actions as pointsActions } from './store/points';

const App = ({ categories, fetchCategories, points, fetchPoints }) => {
  // Get initial categories collection
  useEffect(() => {
    if (categories.collection.length <= 0) fetchCategories();
  }, []);

  // Get initial points collection using categories collection
  useEffect(() => {
    if (points.collection.length <= 0 && categories.collection.length > 0) {
      fetchPoints(categories);
    }
  }, [categories]);

  return <MapGL />;
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
