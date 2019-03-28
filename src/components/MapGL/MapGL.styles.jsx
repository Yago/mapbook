import { css } from '@emotion/core';

export default css`
  .map {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .menu {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 200;
    background: white;
    padding: 2rem;
  }

  .marker [class*='fa'] {
    position: absolute;
    left: 50%;
    top: 16%;
    transform: translateX(-50%);
    font-size: 13px;
  }

  .mapboxgl-popup {
    position: fixed;
    z-index: 300;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: white;
    transform: none !important;
  }

  .mapboxgl-ctrl-attrib {
    display: none;
  }
`;
