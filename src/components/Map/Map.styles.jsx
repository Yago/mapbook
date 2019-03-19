import { css } from '@emotion/core';

export default css`
  @import url('https://fonts.googleapis.com/css?family=Merriweather:400,400i,700|Noto+Sans');

  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  font-family: 'Noto Sans', Helvetica, Arial, sans-serif;
  font-size: 0.9rem;

  .leaflet-fixed-pane {
    z-index: 800;
  }

  .marker-icon-svg svg {
    filter: drop-shadow(3px 3px 4px rgba(0, 0, 0, 0.5));
  }

  .leaflet-fa-markers .feature-icon {
    font-size: 18px;
    left: 50%;
    top: 15px;
    transform: translateX(-50%);
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
  }

  .popup-desc {
    font-family: 'Merriweather', Georgia, serif;
    margin-bottom: 20px;
  }

  .leaflet-control-layers-expanded {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 25vw;
    max-width: 300px;
    min-height: calc(100vh - 35px);
    border-radius: 0;

    label input {
      position: absolute;
      z-index: -1;
      opacity: 0;
    }

    label span {
      display: block;
      width: 90%;
      margin-bottom: 5px;
      padding: 10px 15px;
      cursor: pointer;
      transition: background 0.2s;
      &:before {
        content: '⬜';
      }
    }

    label input[type='radio'] + span:before {
      content: '⚪';
    }

    label input:checked + span {
      background: #e0fadd;
      &:before {
        content: '✅';
      }
    }

    label input[type='radio']:checked + span:before {
      content: '🌏';
    }

    @media (max-width: 700px) {
      width: calc(100vw - 130px);
      max-width: calc(100vw - 130px);
    }
  }
`;
