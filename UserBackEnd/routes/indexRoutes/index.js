const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const fs = require("fs");

router.get("/", (req, res, next) => {
  queryIndexDynamicData(res);
});

// News, Info and Slider queries for index page
function queryIndexDynamicData(res) {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "users",
    password: "1asxqklp546",
  });

  let sliderArray = [];
  let infoArray = [];
  let newsArray = [];

  connection.execute("SELECT * FROM indexpageinfo", (err, result, fields) => {
    if (err) {
      res.send(err);
    } else {
      //console.log(result);

      // loading slider images
      sliderArray = result[0].sliderImagesName.split(";");

      // loading info data
      infoArray = [
        result[0].infoImageName,
        fs.readFileSync(
          `public\\paragraphs\\infoPar\\${result[0].infoParagraphName}`,
          "utf-8"
        ),
        result[0].infoAttributions.split(";"),
      ];

      // loading news data
      const newsTitleArray = result[0].newsTitles.split(";");
      const newsParagraphsArray = result[0].newsParagraphsName.split(";");
      const newImagesArray = result[0].newsImagesName.split(";");
      const newsAttributionsArray = result[0].newsImagesAttributions
        .split(",")
        .map((items) => {
          return items.split(";");
        });

      for (let i = 0; i < 3; i++) {
        newsArray.push({
          title: newsTitleArray[i],
          paragraph: fs.readFileSync(
            `public\\paragraphs\\newsPar\\${newsParagraphsArray[1]}`,
            "utf-8"
          ),
          image: newImagesArray[i],
          atribution: [
            newsAttributionsArray[i][0],
            newsAttributionsArray[i][1],
            newsAttributionsArray[i][2],
            newsAttributionsArray[i][3],
          ],
        });
      }

      // console.log(sliderArray);
      // console.log(infoArray);
      // console.log(newsArray);

      res.render("index", { sliderArray, infoArray, newsArray });
    }
  });
}

module.exports = router;
