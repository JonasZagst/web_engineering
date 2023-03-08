# web_engineering
Repository zur Web Engineering Vorlesung

Prüfungsleistung für die Vorlesung Web Engineering des Kurses TIK22 und TIM22
der DHBW Ravensburg (Campus Friedrichshafen)

Diese Datei dient auch als Anleitung für die Installation der Software.

## Inhalt
* [Server starten](#Server starten)

## Server starten
* *node index.js* ausführen oder in WebStorm die Index.js starten.
* Die .env so bearbeiten wie man es haben will (siehe Erstellen von Mock Daten unten)

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