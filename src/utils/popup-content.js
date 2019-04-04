import { OpenLocationCode } from 'open-location-code';

export default point => {
  const openLocation = new OpenLocationCode();
  const plusCode = openLocation.encode(
    point.geometry.coordinates[1],
    point.geometry.coordinates[0],
  );
  const data = point.properties;

  return `
    <div class="mapboxgl-popup-content-inner">
      ${data.title ? `<h2>${data.title}</h2>` : ''}
      <pre>${plusCode}</pre>
      ${data.description || ''}
      ${
        data.images && data.images.length > 0
          ? data.images.map(img => `<img src="${img.thumbnails.large.url}" />`)
          : ''
      }
    </div>
  `;
};
