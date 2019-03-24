import React from 'react';
import { storiesOf } from '@storybook/react';

import MapGL from './MapGL';

storiesOf('MapGL')
  .add('Default', () => (
    <MapGL />
  ));
