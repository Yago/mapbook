import { css } from '@emotion/core';

export default css`
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
    margin-top: 30px;

    img {
      display: inline-block;
      width: 100%;
      height: auto;
      margin-top: 10px;
    }
  }

  .leaflet-popup-close-button {
    top: 5px;
    right: 5px;
    width: 20px;
    height: 20px;
    font-size: 20px;
  }

  .popup-desc {
    font-family: 'Merriweather', Georgia, serif;
    margin-bottom: 20px;
  }
`;
