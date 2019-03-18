import { css } from '@emotion/core';

export default css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  .leaflet-fixed-pane {
    position: fixed !important;
    z-index: 999999;
  }

  .popup-fixed {
    position: fixed;
    /* top: 0 !important; */
    /* bottom: 0 !important; */
    /* left: 0 !important; */
    /* right: 0 !important; */
    /* width: 100vw; */
    /* height: 100vh; */
    /* transform: none !important; */
    margin: 0;
    border-radius: 0;

    .leaflet-popup-tip-container {
      display: none;
    }
    .leaflet-popup-content-wrapper {
      border-radius: 0;
    }

    .leaflet-popup-scrolled {
      border: none !important;
    }

    .leaflet-popup-content {
      max-width: 600px;
      width: 100%;
      height: auto;
      min-height: 95vh;
    }

    .leaflet-popup-close-button {
      top: 5px;
      right: 5px;
      width: 20px;
      height: 20px;
      font-size: 20px;
    }
  }
`;
