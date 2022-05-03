-- These are the quires and default data for the content dabase.

-- CREATE DATABASE content;
-- Egy Példa. Név: Bob1 Jelszó: asd12345
-- Majdnem mindenkinek ugyan az a jelszava.

CREATE TABLE OutsideIndexPageInfo (
	indexID tinyint AUTO_INCREMENT,
	sliderImagesName varchar(50) NOT NULL,
    infoImageName varchar(20) NOT NULL,
    infoParagraphName varchar(20) NOT NULL,
    infoAttributions varchar(255) NOT NULL,
    newsTitles varchar(20) NOT NULL,
    newsParagraphsName varchar(50) NOT NULL,
    newsImagesName varchar(50) NOT NULL,
    newsImagesAttributions varchar(255) NOT NULL,
    PRIMARY KEY(indexID)
);

/* Dummy data */

INSERT INTO OutsideIndexPageInfo (sliderImagesName, infoImageName, infoParagraphName, infoAttributions, newsTitles ,newsParagraphsName, newsImagesName, newsImagesAttributions)
VALUES ("sImage1.jpg;sImage2.jpg;sImage3.jpg", 
		"infoImage.png",
        "infoParagraph.txt", 
        "sushi;sushi icons;Sushi icons;Freepik",
        "News 1;News 2;News 3",
        "nParagraph1.txt;nParagraph2.txt;nParagraph3.txt", 
        "nImage1.png;nImage2.png;nImage3.png",
        "google-maps;google maps icons;Google maps;manshagraphic,chat-bubbles;chat bubbles icon;Chat bubbles;manshagraphics,search;search icons;Search icons;Freepik"
        );

CREATE TABLE UserIndexPageInfo (
	indexID tinyint AUTO_INCREMENT,
    newsImage varchar(50) NOT NULL,
    newsTitle varchar(50) NOT NULL,
    newsParagraph varchar(50) NOT NULL,
    changesImage varchar(50) NOT NULL,
    changesTitle varchar(50) NOT NULL,
    changesParagraph varchar(50) NOT NULL,
    PRIMARY KEY(indexID)
);

INSERT INTO UserIndexPageInfo (newsImage, newsTitle, newsParagraph, changesImage, changesTitle, changesParagraph)
VALUES ("NewsImage1;NewsImage2;NewsImage3", "NewsT1;NewsT2;NewsT3", "NewsP1;NewsP2;NewsP3", 
		"ChangesImage1;ChangesImage2;ChangesImage3", "ChangesT1;ChangesT2;ChangesT3", "ChangesP1;ChangesP2;ChangesP3");
