import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function imagesApi({ query, page }) {
  try {
    const response = await axios.get('', {
      params: {
        key: '34461243-d0245d06d5a649c5dc9c3b27c',
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: '12',
        page: page,
      },
    });
    return response;
  } catch (error) {
  }
}