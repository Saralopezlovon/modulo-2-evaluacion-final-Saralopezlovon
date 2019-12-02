"use strict";

const characterElement = document.querySelector(".js-character");
const btn = document.querySelector(".js-find");
const containerElement = document.querySelector(".js-container");
const containerFavElement = document.querySelector(".js-container-fav");

let shows = [];
let favoritesShows = [];

/*LocalStorage
function setLocalStorage() {
  localStorage.setItem("favoritesShows", JSON.stringify(favoritesShows));
}
function getLocalStorage() {
  const localStorageFavoritesShows = JSON.parse(
    localStorage.getItem("favoritesShows")
  );
  if (localStorageFavoritesShows !== null) {
    favoritesShows = localStorageFavoritesShows;
    paintShows();
    listenShows();
  }
}*/

const search = function(ev) {
  ev.preventDefault();

  fetch("http://api.tvmaze.com/search/shows?q=" + characterElement.value)
    .then(function(response) {
      return response.json();
    })
    .then(function(serverData) {
      shows = serverData;
      paintShows();
      listenShows();
    })
    .catch(function(err) {
      console.log("Error al traer los datos del servidor", err);
    });
};

function paintFavShows() {
  let htmlCode = `<ul>`;
  for (let i = 0; i < favoritesShows.length; i++) {
    htmlCode += `<li class="shows__item js-shows-item" id="${favoritesShows[i].id}">`;
    /*if (isfavorite === true) {
      htmlCode += `<li class="shows__item js-shows-item shows__item--favorite" id="${i}">`;
    }else{
      htmlCode += `<li class="shows__item js-shows-item" id="${i}">`;
    };*/

    htmlCode += `<h2 class="shows__name">${favoritesShows[i].name}</h2>`;

    if (favoritesShows[i].image === null) {
      htmlCode += `<img class="image shows__imagefav" src="https://via.placeholder.com/210x295/ffffff/666666/?
      text=TV.">`;
    } else {
      htmlCode += `<img class="image shows__imagefav" src="${favoritesShows[i].image.medium}">`;
    }

    htmlCode += `</li>`;
  }

  htmlCode += `</ul>`;

  containerFavElement.innerHTML = htmlCode;
}

function paintShows() {
  let htmlCode = `<ul>`;
  for (let i = 0; i < shows.length; i++) {
    htmlCode += `<li class="shows__item js-shows-item" id="${shows[i].show.id}">`;
    /*if (isfavorite === true) {
      htmlCode += `<li class="shows__item js-shows-item shows__item--favorite" id="${i}">`;
    }else{
      htmlCode += `<li class="shows__item js-shows-item" id="${i}">`;
    };*/

    htmlCode += `<h2 class="shows__name">${shows[i].show.name}</h2>`;

    if (shows[i].show.image === null) {
      htmlCode += `<img class="image" src="https://via.placeholder.com/210x295/ffffff/666666/?
      text=TV.">`;
    } else {
      htmlCode += `<img class="image" src="${shows[i].show.image.medium}">`;
    }

    htmlCode += `</li>`;
  }

  htmlCode += `</ul>`;

  containerElement.innerHTML = htmlCode;
}

function toggleFavorites(ev) {
  const clickedId = parseInt(ev.currentTarget.id);
  const index = favoritesShows.findIndex(function(show, index) {
    return show.id === clickedId;
  });

  const isFavorite = index !== -1;
  if (isFavorite === true) {
    favoritesShows.splice(index, 1);
  } else {
    for (let i = 0; i < shows.length; i++) {
      if (shows[i].show.id === clickedId) {
        favoritesShows.push(shows[i].show);
      }
    }
  }
  paintFavShows();
}

function listenShows() {
  const showsItems = document.querySelectorAll(".js-shows-item");
  for (const showsItem of showsItems) {
    showsItem.addEventListener("click", toggleFavorites);
  }
}

btn.addEventListener("click", search);
