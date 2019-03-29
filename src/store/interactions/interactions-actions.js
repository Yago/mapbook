export const TOGGLE_DIAL = 'TOGGLE_DIAL';
export const SET_LAYER = 'SET_LAYER';

export const toggleDial = () => ({
  type: TOGGLE_DIAL,
});

export const setLayer = layer => ({
  type: SET_LAYER,
  payload: layer,
});

export default {
  TOGGLE_DIAL,
  toggleDial,
  setLayer,
};
