CREATE TABLE app (
	AppName varchar(20),
    Discription varchar(50),
    PRIMARY KEY (AppName)
);

CREATE TABLE department (
	DepartmentName varchar(30),
    PRIMARY KEY (DepartmentName)
);

CREATE TABLE app_department (
	AppName varchar(20) NOT NULL,
	DepartmentName varchar(30) NOT NULL,
    PRIMARY KEY (APPName, DepartmentName),
    FOREIGN KEY (AppName) REFERENCES App(AppName)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
    FOREIGN KEY (DepartmentName) REFERENCES Department(DepartmentName)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

CREATE TABLE apprights (
	AppName varchar(20) NOT NULL,
    Rights varchar(50) NOT NULL,
    PRIMARY KEY (Rights),
    FOREIGN KEY (AppName) REFERENCES App(AppName)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

CREATE TABLE dep_lev_poz (
	D_L_P_ID tinyint AUTO_INCREMENT,
    DepartmentName varchar(30) NOT NULL,
    PozLevel tinyint NOT NULL,
    PozitionName varchar(30) NOT NULL,
    PozitionDiscription varchar(50) NOT NULL,
    PRIMARY KEY (D_L_P_ID)
);

CREATE TABLE d_l_p_rights (
	D_L_P tinyint,
    AppRights varchar(50),
    CONSTRAINT PK_Poz_Rights PRIMARY KEY(D_L_P, AppRights),
    FOREIGN KEY(D_L_P) REFERENCES Dep_Lev_Poz(D_L_P_ID)  
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
    FOREIGN KEY(APPRights) REFERENCES AppRights(Rights)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

CREATE TABLE users (
	Username varchar(10),
    FirstN varchar(15) NOT NULL,
    LastN varchar(15) NOT NULL,
    Email varchar(30) NOT NULL UNIQUE,
    Phone varchar(20),
    Password varchar(20) NOT NULL,
    D_L_P tinyint NOT NULL,
    PRIMARY KEY (Username),
    FOREIGN KEY(D_L_P) REFERENCES Dep_Lev_Poz(D_L_P_ID) 
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
    CONSTRAINT MinL4_UserName_ CHECK (CHARACTER_LENGTH(Username)>=4),
	CONSTRAINT MinL2_FirstN_ CHECK (CHARACTER_LENGTH(FirstN)>=2 ),
	CONSTRAINT MinL2_LastN_ CHECK (CHARACTER_LENGTH(LastN)>=2),
	CONSTRAINT MinL10_Email_ CHECK (CHARACTER_LENGTH(Email)>= 10),
	CONSTRAINT MinL8_Phone_ CHECK (CHARACTER_LENGTH(Phone)>=8),
	CONSTRAINT MinL8_Password_ CHECK (CHARACTER_LENGTH(Password)>=8)
);

CREATE TABLE passwordRules ( 
	minLength tinyint NOT NULL, 
    maxLength tinyint NOT NULL, 
    minUppercase tinyint NOT NULL, 
    minNumbers tinyint NOT NULL, 
    minSymbols tinyint NOT NULL,
    PRIMARY KEY(minLength, maxLength, minUppercase, minNumbers, minSymbols)
);

/* Dummy data */
INSERT INTO app (AppName, Discription)
VALUES  ("Warehouse Stock App", "This Application manages the warehouse stock"), 
		("Purschase Goods App", "This Application manages the shipments"),
        ("UserManagement App", "This Application is for manageing users");

INSERT INTO department (DepartmentName)
VALUES  ("Warehouse Administration"),
		("Purschase"),
        ("IT Administration");

INSERT INTO app_department (AppName, DepartmentName)
VALUES  ("Warehouse Stock App", "Warehouse Administration"), 
		("Purschase Goods App", "Purschase"),
        ("UserManagement App", "IT Administration");

INSERT INTO apprights(AppName, Rights)
VALUES  ("Warehouse Stock App", "Read and Query Data in WS App"),
		("Warehouse Stock App", "Edit Basic Data in WS App"),
		("Warehouse Stock App", "Edit All Data in WS App"),
        ("Purschase Goods App", "Read and Query The Data in PG App"),
		("Purschase Goods App", "Edit Basic Data in PG App"),
		("Purschase Goods App", "Edit All Data in PG App"),
        ("UserManagement App", "Read and Query The Data in UM App"),
		("UserManagement App", "Edit Basic Data in UM App"),
		("UserManagement App", "Edit All Data in UM App");

INSERT INTO dep_lev_poz(D_L_P_ID, DepartmentName, PozLevel, PozitionName, PozitionDiscription)
VALUES  (1, "Warehouse Administration", 1, "Input Admin", "In Side"),
		(2, "Warehouse Administration", 2, "Team Leader WA", "Leads the team"),
		(3, "Warehouse Administration", 3, "Head Of WA Department", "Heads the team to the Sun"),
        (4, "Purschase", 1, "Input Purschase", "In Puts The Phur"),
		(5, "Purschase", 2, "Team Leader P", "Leads the Phur"),
		(6, "Purschase", 3, "Head Of P Department", "Heads the Phur to the Fur"),
        (7, "IT Administration", 1, "User Administrator", "Uses the Trator"),
		(8, "IT Administration", 2, "Team Leader IT", "Leads the User Trator"),
		(9, "IT Administration", 3, "Head Of IT Department", "Heads to the Moon"),
        (10, "IT Administration", 4, "Head Of Every Thing", "Boss");

INSERT INTO d_l_p_rights(D_L_P, AppRights)
VALUES  (1, "Read and Query Data in WS App"),
		(2, "Edit Basic Data in WS App"),
		(3, "Edit All Data in WS App"),
		(4, "Read and Query The Data in PG App"),
		(5, "Edit Basic Data in PG App"),
		(6, "Edit All Data in PG App"),
		(7, "Read and Query The Data in UM App"),
		(8, "Edit Basic Data in UM App"),
		(9, "Edit All Data in UM App"),
        (10, "Edit All Data in UM App"),
        (10, "Edit All Data in PG App"),
        (10, "Edit All Data in WS App");

INSERT INTO users(Username, FirstN, LastN, Email, Phone, D_L_P, Password)
VALUES  ("Bob1", "Charly", "Madison", "CM@gmail.com", null, 1,"asd12345"),
		("Bob2", "Boby", "Viliams", "VB@gmail.com", null, 2, "asd12345"),
		("Bob3", "Brian", "Josh", "BJ@gmail.com", null, 3, "asd12345"),
		("Bob4", "Clara", "Jason", "CJ@gmail.com", null, 4, "asd12345"),
		("Bob5", "Halloween", "Pumpkin", "HP@gmail.com", "0630658972", 5, "asd12345"),
		("Bob6", "Cristhmas", "Santa", "CS@gmail.com", "063063215", 6, "asd12345"),
		("Bob7", "Veronika", "Versache", "VV@gmail.com", "063013987", 7, "asd12345"),
		("Bob8", "Bianka", "Jonatan", "BJ2@gmail.com", "063036928", 8, "asd12345"),
		("Bob9", "Agnes", "Klaudia", "AK@gmail.com", "063012368", 9, "asd12345"),
        ("God19", "God", "Gedeon", "GG@gmail.com", "063012368", 10, "asd12345");
        

INSERT INTO passwordRules(minLength, maxLength, minUppercase, minNumbers, minSymbols)
VALUES (8, 20, 1, 1, 1);

DELETE FROM users WHERE Username = "Boby29";

