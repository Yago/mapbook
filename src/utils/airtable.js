import axios from 'axios';
import mapConfig from '../config/map.config.json';

export const airtableFetch = (
  id,
  name,
  offset = null,
  data = [],
  resolver = null,
) => {
  const key = mapConfig.airtable.key;

  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: `https://api.airtable.com/v0/${id}/${name}?${
        offset ? `&offset=${offset}` : ''
      }`,
      headers: {
        Authorization: `Bearer ${key}`,
      },
    })
      .then(res => {
        const newData = [...data, ...res.data.records];
        if (res.data.offset) {
          airtableFetch(
            id,
            name,
            res.data.offset,
            newData,
            resolver || resolve,
          );
        } else {
          if (resolver) resolver(newData);
          resolve(newData);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};
