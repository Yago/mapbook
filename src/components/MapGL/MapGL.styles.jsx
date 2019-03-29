import { css } from '@emotion/core';

export default css`
  @import url('https://fonts.googleapis.com/css?family=Noto+Sans:400,400i,700');

  .marker [class*='fa'] {
    position: absolute;
    left: 50%;
    top: 16%;
    transform: translateX(-50%);
    font-size: 13px;
  }

  .mapboxgl-popup {
    position: absolute;
    z-index: 9999;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: white;
    transform: none !important;
  }

  .mapboxgl-popup-content {
    height: 100vh;
    overflow-y: auto;
    border: none;
    border-radius: 0;
    box-shadow: none;
    font-size: 16px;
    font-family: 'Noto Sans', Helvetica, Arial, sans-serif;

    h2,
    h3,
    img,
    p {
      margin-bottom: 1.8rem;
    }

    p {
      line-height: 1.6em;
    }

    img {
      display: inline-block;
      width: 100%;
      height: auto;
    }
  }

  .mapboxgl-popup-content-inner {
    max-width: 850px;
    margin: 0 auto;
  }

  .mapboxgl-popup-tip {
    display: none;
  }

  .mapboxgl-popup-close-button {
    position: fixed;
    right: 0;
    width: 35px;
    padding-right: 28px;
    font-size: 2rem;
    color: white;

    &:focus {
      border: none;
      box-shadow: none;
      outline: none;
      background: transparent !important;
    }

    &:after {
      content: ' ';
      position: absolute;
      z-index: -1;
      top: -2px;
      right: 0;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 70px 70px 0;
      border-color: transparent #304ffe transparent transparent;
    }
  }

  .mapboxgl-ctrl-attrib {
    display: none;
  }
`;
