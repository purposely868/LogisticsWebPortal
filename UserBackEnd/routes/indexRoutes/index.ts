import express from "express";
const router = express.Router();

import mysql from "mysql2";
import fs from "fs";
import { Response } from "express-serve-static-core";

interface news {
  title: string;
  paragraph: string;
  image: string;
  atribution: string[];
}

router.get("/", (req, res) => {
  queryIndexDynamicData(res);
});

// News, Info and Slider queries for index page
function queryIndexDynamicData(
  res: Response<any, Record<string, any>, number>
) {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "users",
    password: "1asxqklp546",
  });

  let sliderArray: string[] = [];
  let infoArray: Array<string | string[]> = [];
  let newsArray: news[] = [];

  connection.execute("SELECT * FROM indexpageinfo", (err, result: any[]) => {
    if (err) {
      res.send(err);
    } else {
      //console.log(result);

      // loading slider images
      sliderArray = (result[0].sliderImagesName as string).split(";");

      // loading info data
      infoArray = [
        result[0].infoImageName as string,
        fs.readFileSync(
          `dist\\public\\paragraphs\\infoPar\\${result[0].infoParagraphName}`,
          "utf-8"
        ) as string,
        (result[0].infoAttributions as string).split(";"),
      ];

      // loading news data
      const newsTitleArray = result[0].newsTitles.split(";");
      const newsParagraphsArray = result[0].newsParagraphsName.split(";");
      const newImagesArray = result[0].newsImagesName.split(";");
      const newsAttributionsArray = result[0].newsImagesAttributions
        .split(",")
        .map((items: string) => {
          return items.split(";");
        });

      for (let i = 0; i < 3; i++) {
        newsArray.push({
          title: newsTitleArray[i],
          paragraph: fs.readFileSync(
            `dist\\public\\paragraphs\\newsPar\\${newsParagraphsArray[1]}`,
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

export default router;
