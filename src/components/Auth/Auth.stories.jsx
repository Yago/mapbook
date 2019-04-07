import React from 'react';
import { storiesOf } from '@storybook/react';

import Auth from './Auth';

storiesOf('Auth')
  .add('Default', () => (
    <Auth />
  ));
