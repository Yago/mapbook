import { css } from '@emotion/core';

export default css`
  position: fixed;
  bottom: 5px;
  right: 5px;
  z-index: 9;

  > button {
    opacity: 0;
  }
`;

export const avatarCSS = css`
  width: 50px !important;
  height: 50px !important;
`;
