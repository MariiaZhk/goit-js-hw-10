import axios from 'axios';
const api_key =
  'live_nMiOxnF1zI1tHrZlk0ld74zLXbLcA4yF5Or8U7njx2VrgqabDhs5qSFnS3THsVWG';

axios.defaults.headers.common['x-api-key'] = api_key;
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
  return axios
    .get('/breeds')
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`/images/search?breed_ids=${breedId}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
}
