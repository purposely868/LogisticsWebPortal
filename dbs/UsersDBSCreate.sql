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
	D_L_P_ID int AUTO_INCREMENT,
    DepartmentName varchar(30) NOT NULL,
    PozLevel int NOT NULL,
    PozitionName varchar(30) NOT NULL,
    PozitionDiscription varchar(50) NOT NULL,
    PRIMARY KEY (D_L_P_ID)
);

CREATE TABLE d_l_p_rights (
	D_L_P int,
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
    FirstN varchar(10) NOT NULL,
    LastN varchar(10) NOT NULL,
    Email varchar(20) NOT NULL,
    Phone varchar(15) NOT NULL,
    Password varchar(10) NOT NULL,
    D_L_P int NOT NULL,
    PRIMARY KEY (Username),
    FOREIGN KEY(D_L_P) REFERENCES Dep_Lev_Poz(D_L_P_ID) 
    ON DELETE RESTRICT
    ON UPDATE CASCADE
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
		(9, "IT Administration", 3, "Head Of IT Department", "Heads to the Moon");

INSERT INTO d_l_p_rights(D_L_P, AppRights)
VALUES  (1, "Read and Query Data in WS App"),
		(2, "Edit Basic Data in WS App"),
		(3, "Edit All Data in WS App"),
		(4, "Read and Query The Data in PG App"),
		(5, "Edit Basic Data in PG App"),
		(6, "Edit All Data in PG App"),
		(7, "Read and Query The Data in UM App"),
		(8, "Edit Basic Data in UM App"),
		(9, "Edit All Data in UM App");

INSERT INTO users(Username, FirstN, LastN, Email, Phone, D_L_P, Password)
VALUES  ("Bob1", "Charly", "Madison", "CM@gmail.com", "0630", 1,"asd1234"),
		("Bob2", "Boby", "Viliams", "VB@gmail.com", "0630", 2, "asd1234"),
		("Bob3", "Brian", "Josh", "BJ@gmail.com", "0630", 3, "asd1234"),
		("Bob4", "Clara", "Jason", "CJ@gmail.com", "0630", 4, "asd1234"),
		("Bob5", "Halloween", "Pumpkin", "HP@gmail.com", "0630", 5, "asd1234"),
		("Bob6", "Cristhmas", "Santa", "CS@gmail.com", "0630", 6, "asd1234"),
		("Bob7", "Veronika", "Versache", "VV@gmail.com", "0630", 7, "asd1234"),
		("Bob8", "Bianka", "Jonatan", "BJ@gmail.com", "0630", 8, "asd1234"),
		("Bob9", "Agnes", "Klaudia", "AK@gmail.com", "0630", 9, "asd1234");

DELETE FROM users WHERE Username = "Bob19";

