import { css } from '@emotion/core';

export default css`
  position: fixed;
  bottom: 5px;
  right: 5px;
  z-index: 9;

  > button {
    opacity: 0;
  }

  [class^='MuiAvatar'] {
    width: 50px;
    height: 50px;
  }
`;
