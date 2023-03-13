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

### .env_Variablen
Das File *.env* im Root Verzeichnis des Projekts definiert wichtige Variablen,
welche der Server benötigt, um sich mit der Datenbank zu verbinden oder Mockdaten zu erstellen.

* Die **PORT** Variable wird verwendet, um den Port zu definieren, über den der Webserver
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
nicht angegeben wurde gilt der PORT: 3000.

## Aufbau des Servers

## Aufbau der Webseite
Grundsätzlich stehen auf der Website folgende Kernfunktionalitäten zur Verfügung: 
1. Suche (ohne vorhandenen Login)
2. Produktübersichtsseite (ohne vorhandenen Login)
3. Login (mit vorhandenem Account) 
4. Registrieren (ohne vorhandenen Login) 
5. Warenkorb (vorhandener Login mit Privataccount benötigt)
6. Produktdetailseite (ohne vorhandenen Login)
7. Produkterstellung (vorhandener Login mit Businessaccount benötigt)
8. Logout (mit vorhandenem Login)

Wie oben angedeutet, sind die Funktionalitäten der Website teilweise eingeschränkt, solange man nicht eingeloogt ist. 
Dementsprechend wird auch diese Anleitung vom Allgemeinen zum Besonderen aufgebaut. 

## Funktionalitäten ohne Login:
Angekommen auf der Landing Page, erhält man als User einen schnellen Überblick darüber, was die Motivation und der Zweck der Website ist. Das Banner auf dem oberen Teil der Seite wechselt regelmäßig. Man kann aber auch jederzeit durch einen Klick auf das Bild "weiterscrollen".
(switchBannerImageAfterTime, general.js)

Von hier aus hat man nun mehrere Möglichkeiten: 

## Produktsuche: (general.js, productPage.js)
Je nachdem, ob man gezielt auf der Suche nach einem Produkt ist oder nur recherchieren möchte, gibt es zwei Möglichkeiten, sich alle angebotenen Produkte anzeigen zu lassen. 
1. Über öffnen der Suchfunktion (changeToSearch("general.js": openProductPage, importProducts, _createProductDataList,openProductPage): 
   Hierfür muss man zuerst das Menü im oberen rechten Rand der Webseite aufklappen und den Menüpunkt mit der Lupe auswählen. 
   Sobald man dies getan hat, öffnet sich ein Textfeld, in dem man ein Produkt suchen kann. Sollte man fündig werden, muss nur noch das Produkt ausgewählt und auf "GO" gedrückt werden. Man wird nun unverzüglich zu einer detailierten Ansichtsseite des Produkts geführt. 
2. Über die Product Page:("productPage.js") 
   Zu der Product Page gelangt man ebenfalls über das Menü. Hierfür muss der Menüpunkt mit dem Laptop ausgewählt werden. Daraufhin wird man zu einer Übersichtsseite geführt. Hier werden alle aktuell verfügbaren Laptops präsentiert. Um einen besseren Überblick zu erhalten, hat man über den Produkten die Möglichkeit, diese nach bestimmten Kriterien zu filtern. 
   Folgende Filter sind verfügar: 
   Hersteller (Liste), Preis (Regler), Farbe (Liste), Betriebssystem (Liste), CPU-Typ (Liste). 
   Die Produktübersichtsseite wird automatische nach auswählen eines Filters angepasst. 

   Auch von hier aus hat man die Möglichkeit auf die Detailansicht eines Produkts zu gelangen. 
   Dafür muss hier auf das Bild eines Produkts gedrückt werden. Daraufhin erfolgt umgehend die Weiterleitung auf die Detailansicht des angeklickten Produktes.

## Login/Registrierung:
Grundsätzlich wird der gesamte Login- und Registrierungsprozess aufgeteilt nach dem Nutzertyp (privat oder gewerblich). Diese Entscheidung wird wie, zuvor erwähnt, Einfluss auf den restlichen Verlauf der Webseite haben. Private Nutzer haben die Möglichkeit einzukaufen und dementsprechend einen Warenkorb zu füllen. Diese Funktion steht gewerblichen Nutzern nicht zur Verfügung. Dafür hat man als gewerblicher Nutzer über das "Product Creation"-Formular die Möglichkeit, seine eigenen Produkte einzustellen.

Login: ("login.js")
Den Login erreicht man, indem man im Menü den Menüpunkt mit dem User-Symbol auswählt. Hier loggt man sich mit seiner E-Mail Adresse und seinem Passwort ein. Außerdem ist es essenziell darauf zu achten, dass man die Checkbox "Login as Business User" auswählt, sollte man sich mit seinem Business Account anmelden wollen. Ob der Login erfolgreich war, teilt ein Pop-Up-Fenster am oberen Rand der Webseite mit. 
Bei erfolgreichem Login wird man automatisch wieder zurück zur Startseite geleitet, auf der man nun im oberen linken Rand der Seite sehen kann, dass man eingeloggt ist. 

Sollte man aber noch keinen Account besitzen, dann kann dieser direkt vom Login-Formular aus angelegt werden, indem man auf den Hyperlink "Register here" klickt.   

Registrierung: ("register.js")
Wie auch schon beim Login, hat man hier die Möglichkeit zwischen privatem und gewerblichen Account auszuwählen. Je nachdem, welche Auswahl getroffen wurde, wird das Formular angepasst. Alle angezeigten Textfelder/Daten müsssen vollstädnig und korrekt ausgefüllt werden. Das heißt, die Felder "ZIP" und "Number" müssen als numerische Werte ausgefüllt werden und alle Felder sind "required". Außerdem ist darauf zu achten, dass es nicht möglich ist, mehrere User mit der selben E-Mail anzulegen. 
Bezüglich des Erfolgs des Registrierungsprozesses, wird man auch hier wieder über ein Pop-Up-Fenster am oberen Bildschirmrand informiert. Sollte es ein Problem mit dem ausgefüllten Formular geben, dann wird dieser über das Pop-Up-Fenster angezeigt. Damit kann der Fehler gefunden und korrigiert werden.


## Funktionalitäten mit Login:
Nach erfolgreichem Login passt sich das Menü an. Unabhängig davon, welchen Usertyp man ausgewählt hat, wird stets ein Logout-Button als letzer Menüpunkt hinzugefügt. Sollte man sich als privater User angemeldet haben, dann wird ein Einkaufswagen in der Menüleiste hinzugefügt. 

## Einkaufswagen: ("shoppingCart.js")
   Von nun an hat man als User die Möglichkeit, Produkte, die man erwerben möchte, zu seinem Einkaufswagen hinzuzufügen. Dies ist nur von der Detailansicht möglich. Von hier aus kann man Produkte in seinen Einkaufswagen legen, indem man auf den entsprechenden Button drückt.  
   Sobald man nun den Einkauf beenden möchte, gelangt man über den entsprechenden Menüpunkt zu seinem eigenen Einkaufswagen. Auf dieser Seite erhält man eine finale Übersicht darüber, was aktuell im Warenkorb liegt und kann über den Button "Checkout" die Produkte kaufen. 

Sollte man sich als gewerblicher Nutzer einloggen, erscheint stattdessen der Menüpunkt "Product Creation" dargestellt als Notizblock. 
## Product Creation: ("productCreation.js","productDetailPreviewPage.js")
   Als gewerblicher User kann man nun über diesen Menüpunkt eigene Produke einstellen. Dafür ist es zwingend notwendig, dass alle Eingabefelder ausgefüllt wurden und mindestens ein Bild hochgeladen wurde. Bilder können entweder hochgeladen werden, indem man den Button "Choose File" wählt oder eine Datei in das Feld "Product Image" zieht. Dabei muss der "Product Price" selbsverständlich wieder mit dem korrekten Datentyp, hier also numerischen Werten, angegeben werden. Der Rest der Eingabefelder werden mit Text gefüllt oder Auswahlfelder, bei denen man aus einer Liste wählen kann. 
    
   Sobald man nun alles vollständig ausgefüllt hat, kann man sich vor Veröffentlichung noch über den Button "Preview" anzeigen lassen, wie das eingestellte Produkt auf seiner Detailseite nach dem aktuellen Stand aussehen würde. Somit kann man gegebenfalls noch Änderungen vornehmen, sollte es bei der Vorschau noch Unstimmigkeiten geben. Um wieder zur Bearbeitung zurück zu gelangen, muss der Button "Return" gedrückt werden. Daraufhin wird das Vorschaufenster geschlossen.

   Sollte man nun mit der Gestaltung seiner Produktseite fertig sein, kann man über den Button "Create" schlussendlich das Produkt erstellen und im Webshop hochladen. 
   Über den Erfolg des Uploads wird man, wie auch wie schon zuvor, über das Po-Up-Fenster am oberen Bilschirmrand informiert. Sollte es Probleme während des Uploads gegeben haben, werden diese dort angezeigt. 

   Gesetzt den Fall, dass der Upload erfolgreich war, wird man als User sofort auf die Produkt Page navigiert. Hier kann man nun das erstellte Produkt sehen und überprüfen, ob es den Wünschen entsprechend hochgeladen wurde. 

## Logout: ("general.js")

Zum Schluss hat man als User noch die Möglichkeit, sich aus seinem Account auszuloggen. Hierbei werden alle Sitzungsdaten gelöscht und die Landing Page wird wieder auf den Ursprungszustand zurückgesetzt.
Wie bereits erwähnt, ist diese Funktion ebenfalls Teil des Menüs und wird hier stets als der letzte Menüpunkt angezeigt. 

## Regeln für Devs
* Pullrequests mit **inline CSS** werden nicht akzeptiert
* Pullrequests die nicht der **BEM Convention** folgen, werden nicht akzeptiert
* Pullrequests mit JS Code **ohne ";" am Ende von Lines** werden nicht akzeptiert

## Neuer Weg für Erstellung von HTML Seiten (nach der Template Engine)
* Erstellt ein ejs File in views, in dem ihr ganz normal euer HTML schreibt, jedoch nur das, was im Body stehen würde, (das Standardlayout wird automatisch eingefügt)
* Anschließend wird im File *api.js* eine Route erstellt, mit der auf das Dokument zugegriffen werden soll. 
* Alle Links zu Ressourcen sind relativ zum *public-Ordner*. Legt neue öffentliche Ressourcen auch darin an.

## Erstellen von Mock Daten
* In der .env SETUP_MOCK_DATA = "true" setzen um Mockdaten auf die DB zu pushen.
* Nur einmal ausführen, danach sind die Daten fest auf der MongoDB.
* Dann SETUP_MOCK_DATA = "false" setzen

## Weitere Aufgaben
* Seite für einzelne Produkte
* Bestätigungen beim Erstellen und Einloggen von Usern und Erstellen von Produkten.
Fehler wenn falsche Eingeaben gemacht werden.
