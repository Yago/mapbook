/** @jsx jsx */
import React from 'react';
import PropTypes from 'prop-types';
import { jsx } from '@emotion/core'; // eslint-disable-line
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { FirebaseAuthProvider, IfFirebaseAuthed } from '@react-firebase/auth';
import Button from '@material-ui/core/Button';

import authConfig from '../../config/auth.config.json';
import styles from './Auth.styles';

const firebaseConfig = authConfig.firebase;

const Auth = ({ children }) => {
  return (
    <FirebaseAuthProvider {...firebaseConfig} firebase={firebase}>
      <div css={styles}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => {
            const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(googleAuthProvider);
          }}
        >
          Sign In with Google
        </Button>
        <IfFirebaseAuthed>
          {() => {
            return children;
          }}
        </IfFirebaseAuthed>
      </div>
    </FirebaseAuthProvider>
  );
};

Auth.propTypes = {};
Auth.defaultProps = {};

export default Auth;
