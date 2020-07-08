import testImg from './testImg.jpg';

/**
 * Object containing data for a location
 * @typedef {Object} Place
 * @property {string} name
 * @property {string} description
 * @property {string} image
 * @property {number} lat
 * @property {number} lng
 */
export const /** !Array<Place> */ MOCK_DATA = [
    {
      name: 'Eiffel Tower',
      description: 'Description of location if we want to include it here.',
      image: testImg,
      lat: 48.858405,
      lng: 2.294449,
    },
    {
      name: 'Louvre',
      description: 'Description of location if we want to include it here.',
      image: testImg,
      lat: 48.860611,
      lng: 2.337698,
    },
    {
      name: "Musee D'Orsay",
      description: 'Description of location if we want to include it here.',
      image: testImg,
      lat: 48.85991,
      lng: 2.326364,
    },
    {
      name: 'Arc de Triomphe',
      description: 'Description of location if we want to include it here.',
      image: testImg,
      lat: 48.873771,
      lng: 2.295049,
    },
    {
      name: 'Luxembourg Palace',
      description: 'Description of location if we want to include it here.',
      image: testImg,
      lat: 48.848203,
      lng: 2.337298,
    },
  ];
