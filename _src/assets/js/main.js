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
      /*listenShows();*/
    })
    .catch(function(err) {
      console.log("Error al traer los datos del servidor", err);
    });
};

function paintShows() {
  let htmlCode = `<ul>`;
  for (let i = 0; i < shows.length; i++) {
    htmlCode += `<li id="${i}">`;
    htmlCode += `<h2>${shows[i].show.name}</h2>`;
    htmlCode += `<img src="${shows[i].show.image.medium}">`;
    htmlCode += `</li>`;
  }

  htmlCode += `</ul>`;

  containerElement.innerHTML = htmlCode;
}

btn.addEventListener("click", search);
