import testImg from './testImg.jpg';

/**
 * Object containing data for a location
 * @typedef {Object} Place
 * @property {string} location
 * @property {string} description
 * @property {string} image
 */
export const /** !Array<Place> */ MOCK_DATA = [
    {
      location: 'Mission Peak',
      description: 'Description of location if we want to include it here.',
      image: testImg,
    },
    {
      location: 'Duplicate 1',
      description: 'Description of location if we want to include it here.',
      image: testImg,
    },
    {
      location: 'Duplicate 2',
      description: 'Description of location if we want to include it here.',
      image: testImg,
    },
  ];
