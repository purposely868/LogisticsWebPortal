"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = require("mysql2/promise");
const fs_1 = __importDefault(require("fs"));
class sqlContentClass {
    constructor() {
        this._connection = (0, promise_1.createPool)({
            host: "localhost",
            user: "root",
            database: "content",
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });
    }
    // angular user home general information eg. news, updates etc.
    UserHomeGeneralContent() {
        return __awaiter(this, void 0, void 0, function* () {
            const resultInfo = {
                newsImage: [],
                newsTitle: [],
                newsParagraph: [],
                changesImage: [],
                changesTitle: [],
                changesParagraph: [],
            };
            const userHomeQuery = this._connection
                .execute("SELECT * FROM userindexpageinfo")
                .then((resolve) => {
                //console.log(resolve[0]);
                for (const key in resolve[0][0]) {
                    const element = resolve[0][0][key];
                    if (key in resultInfo) {
                        resultInfo[key] = element.split(";");
                    }
                }
                return resultInfo;
            });
            //console.log(userHomeInfo);
            return userHomeQuery;
        });
    }
    // News, Info and Slider queries for index page
    queryIndexDynamicData() {
        return __awaiter(this, void 0, void 0, function* () {
            const allInfo = {
                sliderArray: [],
                infoArray: [],
                newsArray: [],
            };
            const indexInfo = yield this._connection
                .execute("SELECT * FROM outsideindexpageinfo")
                .then((resolve) => {
                // loading slider images
                const resolved = resolve[0][0];
                allInfo.sliderArray = resolved.sliderImagesName.split(";");
                // loading info data
                allInfo.infoArray = [
                    resolved.infoImageName,
                    fs_1.default.readFileSync(`dist\\public\\paragraphs\\infoPar\\${resolved.infoParagraphName}`, "utf-8"),
                    resolved.infoAttributions.split(";"),
                ];
                // loading news data
                const newsTitleArray = resolved.newsTitles.split(";");
                const newsParagraphsArray = resolved.newsParagraphsName.split(";");
                const newImagesArray = resolved.newsImagesName.split(";");
                const newsAttributionsArray = resolved.newsImagesAttributions
                    .split(",")
                    .map((items) => {
                    return items.split(";");
                });
                for (let i = 0; i < 3; i++) {
                    allInfo.newsArray.push({
                        title: newsTitleArray[i],
                        paragraph: fs_1.default.readFileSync(`dist\\public\\paragraphs\\newsPar\\${newsParagraphsArray[i]}`, "utf-8"),
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
        });
    }
    poolClose() {
        this._connection.end();
    }
}
exports.default = sqlContentClass;
