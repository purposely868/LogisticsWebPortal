"use strict";

// submenu
const submenu = document.querySelector(".submenu");

const subList = submenu.getElementsByTagName("li");

const articles = document
  .querySelector(".article_container")
  .getElementsByTagName("article");

// news
const spansNews = document.querySelector(".newsBtns");

const newsArticles = document.querySelectorAll(".news");

// slider
const sliderImages = document.querySelectorAll(".sliderImg");

const sliderBtns = document.querySelector(".slider_btns");

// add event listeners for sublist items
for (const iterator of subList) {
  iterator.addEventListener("click", (e) => {
    let contains = false;

    for (const i of articles) {
      i.classList.forEach((values) => {
        console.log(values);
        if (e.currentTarget.classList.contains(values)) {
          contains = true;
        }
      });
      if (contains) {
        i.classList.add("visible15");
        contains = false;
      } else {
        i.classList.remove("visible15");
      }
    }
  });
}

// add event listeners for news buttons
for (let i = 0; i < newsArticles.length; i++) {
  spansNews.appendChild(document.createElement("span"));

  spansNews.querySelectorAll("span")[i].addEventListener("click", (e) => {
    newsArticles.forEach((values, index) => {
      if (index == i) {
        values.classList.add("visible20");
      } else {
        values.classList.remove("visible20");
      }
    });

    console.log(i);
  });
}

// add event listeners for sliders
for (let i = 0; i < sliderImages.length; i++) {
  sliderBtns.appendChild(document.createElement("span"));

  sliderBtns.querySelectorAll("span")[i].addEventListener("click", (e) => {
    sliderImages.forEach((values, index) => {
      if (index == i) {
        values.classList.add("visible15");
      } else {
        values.classList.remove("visible15");
      }
    });

    console.log(i);
  });
}
