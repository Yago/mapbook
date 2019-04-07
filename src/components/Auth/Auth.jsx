/** @jsx jsx */
// eslint-disable-next-line
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { jsx } from '@emotion/core'; // eslint-disable-line
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {
  FirebaseAuthProvider,
  IfFirebaseAuthed,
  IfFirebaseUnAuthed,
} from '@react-firebase/auth';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import authConfig from '../../config/auth.config.json';
import styles from './Auth.styles';

const firebaseConfig = authConfig.firebase;

const Auth = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <FirebaseAuthProvider {...firebaseConfig} firebase={firebase}>
      <div css={styles}>
        <IfFirebaseUnAuthed>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            margin="normal"
            fullWidth
            variant="outlined"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            margin="normal"
            fullWidth
            variant="outlined"
          />
          <br />
          <Button
            variant="contained"
            color="primary"
            margin="normal"
            fullWidth
            onClick={() => {
              firebase.auth().signInWithEmailAndPassword(email, password);
            }}
          >
            Sign In
          </Button>
        </IfFirebaseUnAuthed>
        <IfFirebaseAuthed>
          {() => {
            return children;
          }}
        </IfFirebaseAuthed>
      </div>
    </FirebaseAuthProvider>
  );
};

Auth.propTypes = {
  children: PropTypes.element.isRequired,
};
Auth.defaultProps = {};

export default Auth;
