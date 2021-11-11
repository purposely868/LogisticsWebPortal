# LogisticsWebPortal
Centralized Web Portal to track, manage, organize and respond to the logistic needs of the suppliers and the company

Webportál Logisztikai Cégnek.

Központi Webportál egy raktárral rendelkező, elosztó és raktározó logisztikai cégnek. Itt a cég a különböző vevők és beszállítók, tájékoztatást kaphatnak, valamint szervezhetik az anyagok szállítását, készleteiket és rendeléseiket

Résztvevők: Jonatán Oravecz és Gyurcsik Dávid
Tervezett környezet:
Front-end: AngularJs Framework:
		Mind az Angular mind a NodeJs + Express-t a MEAN solution stack kihasználása, valamint az iskolai tanulmányok miatt választottuk. Ezen felül az Angular-t az opinionated mivolta miatt választottuk mely előre definiált megoldásokat kínál a fejlesztéshez ellentétben a REACT-el. „jobban fogja az ember kezét”
Back-end: NodeJs Express Js Framework. Ebben a döntésben pont az unopinionated mivolta volt az egyik mérvadó, hogy ebben is legyen tapasztalatunk. Az egyszerűség és a project mérete is szerepet játszott például a Django Framework szemben. Hiszen Django komplikáltabb és nem a legjobb kis projectekre.
Adatbázis kezelő rendszerek: MySQL és/vagy MongoDB:
MySQL: Rendszeres lekérdezések, kevésbé változó adat rendszerek és szorosabban összekapcsolt adathalmazokat igénylő adatbázisok esetén tervezzük használni. Mint Például:
1.	Vevőkhöz tartozó anyagok, göngyölegek darabszáma fajtája.
2.	Folyamatban lévő rendelésekről különféle információk.
MongoDB: A MEAN solution stack és JSON objektum kihasználása, végett valamint bizonyos nagyobb, változatosabb és rendszeresen változó adathalmazok kialakításához és kezeléséhez. Mint például: 
1.	Document-Oriented alapú: Folyamatosan változó kapacitású teherautók, változó méretű, mennyiségű és típusú szállítmányokkal. Például ez esetben nehezebb lenne újabb és újabb táblákat létrehozni új szállítmányoknak. Egyszerűbb egy-egy JSON objektumot létrehozni és lekérdezni a tartalmát.
2.	Column-based alapú: Amennyiben nagy mennységű és számos típusú tároló dobozt tart nyilván különféle polcrendszerekben. Ez nagy teljesítményt biztosít különféle SUM, COUNT, AVG, MIN etc. Összesítő lekérdezéseknek.
