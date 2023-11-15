import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import '../node_modules/slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './styles.css';

const refs = {
  selectBreedEl: document.querySelector('.breed-select'),
  loaderEl: document.querySelector('.loader'),
  errorEl: document.querySelector('.error'),
  containerCatInfoEl: document.querySelector('.cat-info'),
};

refs.loaderEl.classList.replace('loader', 'is-hidden');
refs.errorEl.classList.add('is-hidden');
refs.containerCatInfoEl.classList.add('is-hidden');

refs.selectBreedEl.addEventListener('change', onSelectBreedElChange);

let breedsIdArr = [];

fetchBreeds()
  .then(data => {
    data.forEach(element => {
      breedsIdArr.push({ text: element.name, value: element.id });
    });
    new SlimSelect({
      select: refs.selectBreedEl,
      data: breedsIdArr,
    });
  })
  .catch(onFetchError);

function onSelectBreedElChange(event) {
  refs.loaderEl.classList.replace('is-hidden', 'loader');
  refs.selectBreedEl.classList.add('is-hidden');
  refs.containerCatInfoEl.classList.add('is-hidden');

  const breedId = event.currentTarget.value;

  fetchCatByBreed(breedId)
    .then(breedsIdArr => {
      refs.loaderEl.classList.replace('loader', 'is-hidden');
      refs.selectBreedEl.classList.remove('is-hidden');

      const { url, breeds } = breedsIdArr[0];

      refs.containerCatInfoEl.innerHTML = `<div class="img-container"><img src="${url}" alt="${breeds[0].name}" width="400"/></div><div class="description-container"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><strong>Temperament:</strong> ${breeds[0].temperament}</p></div>`;

      refs.containerCatInfoEl.classList.remove('is-hidden');
    })
    .catch(onFetchError);
}

function onFetchError(error) {
  refs.selectBreedEl.classList.remove('is-hidden');
  refs.loaderEl.classList.replace('loader', 'is-hidden');

  Notify.failure(
    'Oops! Something went wrong! Try reloading the page or select another cat breed!',
    {
      width: '500px',
      position: 'left-top',
      timeout: '3000',
      fontSize: '20px',
    }
  );
}
