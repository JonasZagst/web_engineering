# web_engineering
Repository zur Web Engineering Vorlesung

Prüfungsleistung für die Vorlesung Web Engineering des Kurses TIK22 und TIM22
der DHBW Ravensburg (Campus Friedrichshafen)

Diese Datei dient auch als Anleitung für die Installation der Software. Weiterhin lässt sich eine Dokumentation für die
serverseitige Infrastruktur und das Javascript für die funktionalität der Webseiten in JSDoc erstellen.

## Inhalt
* Dokumentation generieren
* Server Starten
* Aufbau des Servers
* Aufbau der Webseite

## Dokumentation generieren
Für die Dokumentation der der Webseite wurde [JSDoc](https://jsdoc.app/) verwendet. Diese kann nach Installation mit 
```bash
jsdoc -d ./doc -r . -R ./README.md 
``` 
generiert werden. Dabei sollte beachtet werden, dass dieser Befehl auch die `node_modules` durchsucht und Dokumentationsseiten für sie generiert.
Daher wird empfohlen den Befehl auszuführen, bevor die Node Packete installiert werden.

## Server starten

### Env Variablen
Das File *.env* im Root Verzeichnis des Projekts definiert wichtige Variablen,
welche der Server benötigt, um sich mit der Datenbank zu verbinden oder mockdaten zu erstellen.

* Die **PORT** Variable wird verwendet, um den Port zu definieren über den der Webserver
und auch die Webseite erreichbar sein sollen. Wenn dieser nicht gesetzt wird,
wird der Standardwert 3000 verwendet.
* Die **SETUP_MOCK_DATA** Variable wird verwendet, um die Daten in der Datenbank zu löschen
und mit Mockdaten neu aufzusetzen. Diese Methode **löscht die gesamte Datenbank**!
Hierfür ist ein **Admin User** nötig, ansonsten wird die Methode einen Fehler werfen.
Wir empfehlen Vorsicht bei der Verwendung dieser Methode, es sollte eine eigene Datenbank
für die Anwendung verwendet werden und die Methode sollte nur beim ersten Start des
Webservers verwendet werden, um die Mockdaten aufzusetzen. Bitte setzen Sie die Variable
anschließend auf *false*.
* Die **DB_URI** Variable definiert den Pfad, über den der Server sich mit der *MongoDB*
Datenbank verbindet. Dieser Pfad ist wie folgt aufgebaut 
```mongodb+srv://<username>:<password>@host:port/database?options```.
Der verwendete User sollte wie oben erwähnt ein **Admin** User sein und die Datenbank sollte
nicht für andere Zwecke verwendet werden, da sie beim Setup der Mockdaten gelöscht wird.

### Starten des Servers
* **Requirements**: Um den Server zu starten, benötigt man **npm** und eine aktuelle Version von **node.js**.
**Linux** ist als Betriebssystem empfohlen und getestet, für andere Betriebssysteme können
keine Garantien ausgesprochen werden, auch wenn eine weite Kompatibilität zu erwarten ist.
* Vor dem ersten Start muss im Root Verzeichnis des Projekts `npm install` ausgeführt werden.
* Zum Start des Webservers muss im Root Verzeichnis des Projekts `npm run prod` ausgeführt werden.
* Um die Webseite mit einem Browser anzuzeigen, kann man nach dem Start des Webservers auf die Startseite über
die URL `localhost:PORT` zugreifen. Dabei wird der *PORT* aus dem *.env* File verwendet. Falls dieser
nicht angegeben wurde der PORT: 3000.

## Aufbau des Servers
Dieses Kapitel beschreibt den funktionalen Aufbau des Servers.

### Grundaufbau
MVC, Templating Engine, Modelle

### API
Die Webseiten, sowie sonstige Ressourcen wie die Zugriffe auf Users und Products sind mit der API umgesetzt.
Hierbei wurde sich lose an den **REST** Design Prinzipien orientiert.

#### Webseiten
Die **API Endpunkte** für den Zugriff auf die Webseiten sind im *routes* Ordner in der Datei *site.js* definiert.
Die Startseite (index) erreicht man über den "leeren Pfad" ``/``, wobei dieser auch weggelassen werden kann.
Alle weiteren Webseiten findet man über den Pfad, welcher normalerweise derselben Namenskonvention folgt, wie die
zugrundeliegende Datei. Auf den genauen Aufbau der Webseiten geht das Kapitel *Aufbau der Webseite* noch genauer ein.


#### Serverseitige Funktionen
Die **API Endpunkte** für den Zugriff auf die serverseitigen Funktionen sind im *routes* Ordner in der Datei *api.js* definiert.
Der Pfad beginnt für alle funktionen mit dem Präfix ``/api``, um die Unterscheidung zu den Webseiten zu vereinfachen.
Der zweite Teil des Pfads identifiziert die Ressource auf der gearbeitet werden soll. Hier wird zwischen den *products*, *users*
und *companies* unterschieden. Wobei letzteres den Nutzeraccount von Firmennutzern repräsentiert. Alle Rückgabewerte im
Erfolgsfall werden in JSON Format gesendet.

Die **Product API**:
* Eine **GET** Anfrage auf den URI ``/api/products`` liefert eine Liste aller Produkte zurück.
* Eine **POST** Anfrage auf den URI ``/api/products`` erlaubt es (wenn im Body ein neues Produkt in akzeptierten
JSON Schema mitgeliefert wird), ein neues Product auf der Datenbank zu speichern. Diesem wird dann serverseitig eine 
eindeutige *UUID* zugewiesen. Als bestätigung wird der erstellte Eintrag zurückgesendet.
* Eine **GET** Anfrage auf den URI ``/api/products/{id}`` liefert ein konkretes Produkt anhand seiner *UUID* zurück.
Hierbei wird die *UUID* des gesuchten Produktes im Pfad übergeben.
* Eine **GET** Anfrage auf den URI ``/api/products?search={query}`` liefert alle Produkte, welche in dem Namen, der Beschreibung
oder sonstigen nicht numerischen Feldern den gegebenen *query term* beinhalten. 
Diese Funktion dient für die Produktsuche der Nutzer.

Die **User API**:

Die **users** und **companies** API funktionieren sehr ähnlich und sind deshalb in diesem Abschnitt zusammengefasst.
* Eine **POST** Anfrage auf den URI ``/api/users`` erlaubt es (wenn im Body ein neuer User in akzeptierten JSON Schema
mitgeliefert wird), einen neuen User anzulegen und auf der Datenbank zu speichern. Diesem wird dann serverseitig eine
eindeutige *UUID* zugewiesen. Als bestätigung wird der erstellte Nutzer zurückgesendet.
* Eine **GET** Anfrage auf den URI ``/api/users/{id}`` liefert einen konkreten Nutzer anhand seiner *UUID* zurück, wobei
das Passwort jedoch nicht mit übergeben wird. Hierbei wird die *UUID* des gesuchten Users im Pfad übergeben.
* Eine **GET** Anfrage auf den URI ``/api/users/password`` mit den Headern *username* und *password*, welche die eindeutige
E-Mail eines Users und das Passwort für seinen Account beinhalten, liefert diese Funktion ähnlich zu der oben genannten Funktion
den User ohne sein Passwort zurück. Diese Funktion dient der Authentifizierung und überprüfung von Nutzerdaten.

All diese Funktionen werden zwischen *users* und *compnaies* geteilt, für letztere muss nur *users* im Pfad durch *companies* ersetzt
werden. Beispielsweise wäre eine Anfrage eines *company Accounts* per id: ``/api/companies/{id}``. Die folgenden Funktionen
lassen sich jecoch nur auf *users* anwenden.
* Eine **GET** Anfrage auf den URI ``/api/users/{id}/shoppingCart`` liefert ein Array aus allen *ProductID* im Warenkorb des
Nutzers, anhand der *UUID* des Nutzers. Diese können anschließend über die **Product API** den Produkten zugeordnet werden.
* Eine **PUT** Anfrage auf den URI ``/api/users/:id/shoppingCart``, bei welcher eine **ProductID** im Body übergeben wird,
fügt die übergebene *Product ID* dem Wahrenkorb des mit dem *id* parameter spezifizierten Nutzers hinzu und sendet das
aktualisierte Array des Warenkorbs zurück.

Eine Möglichkeit alle User anzufragen wurde bewusst weggelassen, sodass nicht die Daten aller Nutzer einfach gesammelt
werden können. In Zukunft wäre für die API Zugriffe allgemein noch eine **Authentication** geplant.

## Aufbau der Webseite

## Regeln für Devs
* Pullrequests mit **inline CSS** werden nicht akzeptiert (bitte alle rausnehmen die noch da sind)
* Pullrequests die nicht der **BEM Convention** folgen werden nicht akzeptiert
* Pullrequests mit JS Code **ohne ";" am Ende von Lines** werden nicht akzeptiert

## Neuer Weg für Erstellung von HTML Seiten (nach der Template Engine)
* Erstellt ein ejs File in views in dem ihr ganz normal euer HTML schreibt, jedoch nur das was im Body stehen würde, das standard Layout wird automatisch eingefügt
* Anschließend wird im File *api.js* eine Route erstellt, mit der auf das Dokument zugegriffen werden soll. 
* Alle Links zu Ressourcen sind relativ zum *public ordner*. Legt neue öffentliche Ressourcen auch darin an.

## Erstellen von Mock Daten
* In der .env SETUP_MOCK_DATA="true" setzen um Mockdaten auf die DB zu pushen.
* Nur einmal machen danach sind die Daten fest auf der MongoDB.
* Dann SETUP_MOCK_DATA="false" setzen

## Weitere Aufgaben
* Seite für einzelne Produkte
* Bestätigungen beim Erstellen und Einloggen von Usern und Erstellen von Produkten.
Fehler wenn falsche Eingeaben gemacht werden.
