-- SNAPSHOTS, VIEWS annak érdekében, hogy jobban lássuk mit - ki láthat és azt milyen SQL sorokkal tudjuk megjeleníteni
-- Ezen felül pedig, hogy egyeántalán mit kellene esetleg valahol megjeleníteni
-- A mi kontextusunkban egyszerű szituációkkal dolgozunk nyilván
-- Ezek csak átmeneti leíáros, ötletelés, majd megbeszélünk mindent

SELECT * FROM app; --  IT app, valamint nyilván a főoldalon hozzáférhető appokat innen szedjük
SELECT * FROM apprights; --  IT app, valamint mindenki a saját jogai
SELECT * FROM dep_lev_poz; --  IT app, valamint mindenki a saját szintjei a saját felületen
SELECT * FROM dep_poz_levels; --  IT app, itt sem szükséges másnak látnia a lehetséges kombinációkat
SELECT * FROM department; -- IT app, saját osztály
SELECT * FROM poz_rights; -- IT app, szerintem nem szükséges másnak látnia a lehetséges kombinációkat
SELECT * FROM pozition; -- IT app, saját pozíció neve
SELECT * FROM users; -- IT app, saját userinformáció

SELECT DISTINCT * FROM app; -- DISTINCT kulcsszóval megjeleníthetünk mindent ami egyedi

-- Egy igen fontos SNAPSHOT a felhasználók jogai, mivel ezeknek az adatoknak nincs külön táblája
SELECT users.Username, poz_rights.AppName, poz_rights.AppRights
FROM users
INNER JOIN poz_rights
ON users.D_L_P = poz_rights.D_L_P;

-- Frissíteni vagy törölni a táblákból
-- Másik SQL script file ban vannak alap insert utasítások amiket alapul lehet venni

-- Törlés: itt figyelembe kell venni a függéseket és hogy mi lett beállítva ON DELETE esetén
DELETE FROM users	-- itt nincs probléma mert ettől a táblától nem függ semmi VISZONT ez a tábla függ a dep_lev_poz táblától
WHERE Username = "Bob1";

-- Na ezt már nem lehet csak úgy törölgeni mert sokminden függ tőle. Egyenlőre bármilyen rekordot törölni tilos mert vannak ettől függő sorok más táblában
DELETE FROM dep_lev_poz	
WHERE D_L_P_ID = 1;

-- View: Milyen felhasználónak milyen jogai vannak.


-- quieries for server side:

-- Main Login QuUsernameieries:

-- user info
SELECT  u.FirstN, u.LastN, u.Email, u.Phone, u.D_L_P, dlp.DepartmentName, dlp.PozitionName
FROM users AS u
JOIN dep_lev_poz AS dlp
ON u.D_L_P = dlp.D_L_P_ID
WHERE Username = "Variable";

-- all app info
SELECT * FROM app;

-- your app rightsUsername
SELECT ar.AppName, dlp.AppRights
FROM d_l_p_rights AS dlp
JOIN apprights AS ar
ON ar.Rights = dlp.AppRights
WHERE dlp.D_L_P = "variable";

-- Main Login Quieries End

-- user manageing queries
INSERT INTO users(Username, FirstN, LastN, Email, Phone, D_L_P,   Password)
     VALUES (?, ?, ?, ?, ?, ?, ?);

UPDATE users 
SEt ? = ?, ? = ?
WHERE ?;

DELETE FROM users WHERE Username = ?
