'use strict'
import React from 'react';
import ReactDOM from 'react-dom';
import Unsplash, { toJson } from 'unsplash-js';

import reducers from './reducers/reducers.js';
import App from './containers/App.js';
import { createStore } from 'redux';
import photos from 'unsplash-js/lib/methods/photos';

async function start() {
  let ACCESS_KEY = 'ZCIBsZRg5TsQkvbdBnXI8aFlVS1SGp5_OH0NQBwgTKU',
    SECRET_KEY = 'LqoLZdhKvJLr9XhHpyZaOK6W4N3zYL_uf59rP1JHD-A',
    BEARER_TOKEN = '';

  const unsplash = new Unsplash({
    accessKey: ACCESS_KEY,
    secret: SECRET_KEY,
    callbackUrl: 'https://mech-maks.github.io/unsplash-service/'
  });

  BEARER_TOKEN = localStorage.getItem('bearerToken');

  if (!BEARER_TOKEN) {
    const authenticationUrl = unsplash.auth.getAuthenticationUrl([
      "public",
      "write_likes"
    ]);

    const queryStr = window.location.toString();

    if (!queryStr.split('?code=')[1]) {
      location.assign(authenticationUrl);
    } else {
      unsplash.auth.userAuthentication(queryStr.split('?code=')[1])
        .then(toJson)
        .then(json => {
          //console.log(unsplash.auth.userAuthentication(query.code))
          unsplash.auth.setBearerToken(json.access_token);
          localStorage.setItem('bearerToken', json.access_token);
        })
        .catch(err => console.log('Auth err', err));
    }
  } else {
    const response = unsplash.auth.setBearerToken(BEARER_TOKEN);
  }

  let photos = [];

  try {
    photos = await unsplash.photos.getRandomPhoto({
      query: 'cats',
      count: 2,
      height: 400
    }).then(toJson)
      .then(photos => {
        console.log(1);
        return photos;
      });
  } catch {
    alert('что-то пошло не так');
    photos = [];
  }

  let initialScale = {
    photos: photos,
    unsplash: unsplash,
    photoSearchWord: '',
    currentSearch: 'cats'
  };

  const store = createStore(reducers, initialScale);

  ReactDOM.render(
    <App store={store} />,
    document.querySelector('.app')
  )

}

start();