# web_engineering
Repository zur Web Engineering Vorlesung

Prüfungsleistung für die Vorlesung Web Engineering des Kurses TIK22 und TIM22
der DHBW Ravensburg (Campus Friedrichshafen)

Diese Datei dient auch als Anleitung für die Installation der Software.

## Inhalt
* Server Starten
* Aufbau des Servers
* Aufbau der Webseite

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
* Ändern zu Webshop für Business Notebooks
* Background zu darkgrey anpassen (wie Discord)
* Suche als Produktseite mit Filter umsetzen (eventuell auch Suchtags bei der Erstellung von Produkteinträgen)
* Blättern auf Produktseite
* Icon für Produktseite anpassen?
* Seite für einzelne Produkte