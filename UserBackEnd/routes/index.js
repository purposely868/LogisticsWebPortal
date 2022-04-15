const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

router.get("/", (req, res, next) => {
  res.render("index", queryNewsSlider(req, res));
});

// News and slider query for index page
function queryNewsSlider(req, res) {
  // const connection = mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "users",
  //   password: "1asxqklp546",
  // });

  // const result = connection.execute(
  //   "SELECT * FROM indexpageinfo",
  //   (err, result, fields) => {
  //     if (err) {
  //       res.send(err);
  //     } else {
  //       return result;
  //     }
  //   }
  // );

  //console.log(result);

  const sliderArray = ["sImage1.jpg", "sImage2.jpg", "sImage3.jpg"];
  const infoArray = [
    "infoImage.png",
    ["sushi", "sushi icons", "Sushi icons", "Freepik"],
    "Hello World",
  ];

  const newsArray = [
    {
      title: "These are news1",
      paragraph: "News Paragraph1",
      image: "nImage1.png",
      atribution: [
        "google-maps",
        "google maps icons",
        "Google maps",
        "manshagraphic",
      ],
    },
    {
      title: "These are news2",
      paragraph: "News Paragraph2",
      image: "nImage2.png",
      atribution: [
        "chat-bubbles",
        "chat bubbles icon",
        "Chat bubble",
        "manshagraphic",
      ],
    },
    {
      title: "These are news3",
      paragraph: "News Paragraph3",
      image: "nImage3.png",
      atribution: ["search", "search icons", "Search icons", "Freepik"],
    },
  ];

  return { sliderArray, infoArray, newsArray };
}

module.exports = router;
