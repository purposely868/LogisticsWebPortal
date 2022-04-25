import mysql, { createPool, Pool, RowDataPacket } from "mysql2/promise";
import fs from "fs";
//import FrontValid from "./validationsChecks";

interface news {
  title: string;
  paragraph: string;
  image: string;
  atribution: string[];
}

interface resultInfo {
  [x: string]: string[];
  newsImage: string[];
  newsTitle: string[];
  newsParagraph: string[];
  changesImage: string[];
  changesTitle: string[];
  changesParagraph: string[];
}

export default class sqlContentClass {
  protected _connection: Pool;

  constructor() {
    this._connection = createPool({
      host: "localhost",
      user: "root",
      database: "content",
      password: "1asxqklp546",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }

  // angular user home general information eg. news, updates etc.
  async UserHomeGeneralContent() {
    let resultInfo: resultInfo = {
      newsImage: [],
      newsTitle: [],
      newsParagraph: [],
      changesImage: [],
      changesTitle: [],
      changesParagraph: [],
    };

    const userHomeInfo = this._connection
      .execute("SELECT * FROM userindexpageinfo")
      .then((resolve: any[]) => {
        //console.log(resolve[0]);
        for (const key in (resolve[0] as mysql.RowDataPacket[])[0]) {
          const element: string = (resolve[0] as mysql.RowDataPacket[])[0][key];

          if (key in resultInfo) {
            resultInfo[key] = element.split(";");
          }
        }
        return resultInfo;
      });
    //console.log(userHomeInfo);
    return userHomeInfo;
  }

  // News, Info and Slider queries for index page
  async queryIndexDynamicData() {
    const allInfo: {
      sliderArray: string[];
      infoArray: string[];
      newsArray: news[];
    } = {
      sliderArray: [],
      infoArray: [],
      newsArray: [],
    };

    const indexInfo = await this._connection
      .execute("SELECT * FROM outsideindexpageinfo")
      .then((resolve: any) => {
        // loading slider images

        const resolved = (resolve[0] as RowDataPacket[])[0];

        allInfo.sliderArray = resolved.sliderImagesName.split(";");
        // loading info data

        allInfo.infoArray = [
          resolved.infoImageName as string,
          fs.readFileSync(
            `dist\\public\\paragraphs\\infoPar\\${
              resolved.infoParagraphName as string
            }`,
            "utf-8"
          ) as string,
          resolved.infoAttributions.split(";"),
        ];

        // loading news data
        const newsTitleArray = resolved.newsTitles.split(";");
        const newsParagraphsArray = resolved.newsParagraphsName.split(";");
        const newImagesArray = resolved.newsImagesName.split(";");
        const newsAttributionsArray = resolved.newsImagesAttributions
          .split(",")
          .map((items: string) => {
            return items.split(";");
          });

        for (let i = 0; i < 3; i++) {
          allInfo.newsArray.push({
            title: newsTitleArray[i],
            paragraph: fs.readFileSync(
              `dist\\public\\paragraphs\\newsPar\\${newsParagraphsArray[i]}`,
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
        console.log(allInfo);

        return allInfo;
      });
    // return the result of the query
    return indexInfo;
  }
}
