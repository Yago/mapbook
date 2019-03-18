import axios from 'axios';

export const airtableFetch = (
  type,
  offset = null,
  data = [],
  resolver = null,
) => {
  const key = process.env.REACT_APP_AIRTABLE_KEY;
  const table = process.env.REACT_APP_AIRTABLE_TABLE;

  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: `https://api.airtable.com/v0/${table}/${type}?${
        offset ? `&offset=${offset}` : ''
      }`,
      headers: {
        Authorization: `Bearer ${key}`,
      },
    })
      .then(res => {
        const newData = [...data, ...res.data.records];
        if (res.data.offset) {
          airtableFetch(type, res.data.offset, newData, resolver || resolve);
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
