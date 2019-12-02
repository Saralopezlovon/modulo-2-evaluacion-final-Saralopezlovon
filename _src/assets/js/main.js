"use strict";

const characterElement = document.querySelector(".js-character");
const btn = document.querySelector(".js-find");
const containerElement = document.querySelector(".js-container");

let shows = [];
const favoritesShows = [];

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

function paintShows() {
  let htmlCode = `<ul>`;
  for (let i = 0; i < shows.length; i++) {
    htmlCode += `<li class="shows__item js-shows-item" id="${i}">`;
    htmlCode += `<h2 class="shows__name">${shows[i].show.name}</h2>`;
    htmlCode += `<img class="image" src="${shows[i].show.image.medium}">`;
    htmlCode += `</li>`;
  }

  htmlCode += `</ul>`;

  containerElement.innerHTML = htmlCode;
}

function toggleFavorites() {
  console.log("comprobando..");
}

function listenShows() {
  const showsItems = document.querySelectorAll(".js-shows-item");
  for (const showsItem of showsItems) {
    showsItem.addEventListener("click", toggleFavorites);
  }
}

btn.addEventListener("click", search);
