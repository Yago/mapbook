import { css } from '@emotion/core';

export default css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  .leaflet-fixed-pane {
    z-index: 800;
  }

  .marker-icon-svg svg {
    filter: drop-shadow(3px 3px 4px rgba(0, 0, 0, 0.5));
  }

  .popup-fixed {
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
