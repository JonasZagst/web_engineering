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
Grundsätzlich hat man auf der Website folgende Kernfunktionalitäten zur Verfügung: 
1. Search(Ohne Login)
2. Product Page(Ohne Login)
3. Login(Ohne Login) 
4. Register(Ohne Login) 
5. Shopping Cart(Login mit Privat Account benötigt)
6. Product Detail Page(Ohne Login)
7. Product Creation(Login mit Business Account benötigt)
8. Logout(Login benötigt)

Wie oben angedeutet sind die Funktionalitäten der Website teilweise eingeschränkt solange man nicht eingeloogt ist. 
Demnach wird auch diese Anleitung dementsprechend aufgebaut(Vom Allgemeinen zum Besonderen). 

## Funktionaliäten Ohne Login:
Angekommen auf der Landing Page, erhält man als User einen schnellen Überblick darüber, was die Motivation der Website ist und der Zweck der Website ist. Das Bild Banner auf dem oberen Teil der Page, läuft grundsätzlich zeitlich durch. Man kann aber auch jederzeit per Klick auf das Bild "weiterscrollen".(switchBannerImageAfterTime, general.js)

Von hier aus hat man nun mehrere Möglichkeiten: 

## Produktsuche:(general.js, productPage.js)
Jenachdem ob man gezielt auf der Suche nach einem Produkt ist oder nur am recherchieren, hat man zwei Möglichkeiten sich alle angebotenen Produkte anzeigen zu lassen. 
1. Über öffnen der Suchfunktion(changeToSearch("general.js": openProductPage, importProducts, _createProductDataList,openProductPage): 
   Hierfür muss man zualler erst, das Menü im oberen rechten Rand der Webseite aufklappen und den Menüpunkt mit der Lupe auswählen. 
   Sobald man dies getan hat, öffnet sich ein Textfeld, indem man nach dem gesuchten Produkt suchen kann. Sollte man fündg werden, muss man nur noch das Produkt auswählen und auf "GO" drücken. Man wird unverögert zu einer detailierten Ansicht, des Produkts geführt. 
2. Über die Product Page:("productPage.js") 
   Zu der Product Page gelangt man ebenfalls über das Menü. Hierfür muss dieses Mal, der Menüpunkt mit dem "Laptop" auswählen. Daraufhin wird man zu einer "Übersichts Seite" geführt. Hier werden alle aktuell verfügbaren Laptops präsentiert. Um einen  besseren Überblick zu erhalten, hat man über den Produkten die Möglichkeit zu filtern. 
   Folgende Filter sind verfügar: 
   Hersteller(Liste), Preis(Regler), Farbe(Liste), Betriebssystem(Liste), Type CPU(Liste). 
   Die Produktübersichtsseite wird automatische nach auswählen eines Filters angepasst. 

   Auch von hier aus hat man die Möglichkeit auf die Detailansicht eines Produkts zu gelangen. 
   Dafür muss hier auf das Bild eines Produkts gedrückt werden. Man wird daraufhin umgehend auf die Detailansicht, des angeklickten Produktes geführt. 

## Login/Registrieren:
Grundsätlich wird der gesamte Login und Registrierprozess aufgeteilt in den Usertyp(Privat oder Gewerblich). Diese Entscheidung wird wie auch bereits erwähnt Einfluss auf den restlichen Verlauf der Webseite haben. Private User haben die Möglichkeit einzukaufen und dementsprechend einen Warenkorb. Diese Funktion steht Gewerblichen Usern nicht zur Verfügung. Dafür hat man als gewerblicher User über das "Product Creation" Formular die Möglichkeit seine eigenen Produkte einzustellen.

Login:("login.js")
Zum Login kommt man indem man im Menü den Menüpunkt mit dem User auswählt. Hier loggt man sich mit seiner E-Mail Adresse und Passowrt ein. Außerdem ist es essenziell darauf zu achten, dass man die Checkbox "Login as Business User" auswählt, sollte man sich mit seinem Business Account anmelden wollen. Ob das Login erfolgreich war, wird einem über das Pop Up Fenster am oberen Rand der Webseite mitgeteilt. 
Bei erfolgreichem Login wird man automatisch wieder zuürck zur Startseite geleitet, auf der man nun im oberen link Rand der Seite sehen kann, dass man eingeloggt ist. 

Sollte man nun noch keinen Account besitzen, dann kann man sich diesen direkt vom Login Formular aus anlegen. Indem man auf den Hyperlink "Register here" klickt.   

Register:("register.js")
Wie auch schon beim Login, hat man hier die Möglichkeit zwischen Privatem und Gewerblichem Account auszuwählen. Jenachdem, welche Auswahl getroffen wurde, wird das Formular angepasst. Alle angezeigten Textfelder/Daten müsssen vollstädnig und korrekt ausgefüllt werden. Das heißt die Felder "ZIP" und "Number" müssen als Numerische Werte ausgefüllt werden und alle Felder sind "required". Außerdem ist darauf zu achten, dass es nicht möglich ist mehrere User mit der selben E-Mail anzulegen. 
Bezüglich des Erfolg des Registrierungsprozesses, wird man auch hier wieder über ein Pop Up Fenster am oberen Bildschirmrand informiert. Sollte es Problem mit dem Formular geben, dann werden diese über das Pop Up Fenster angezeigt. So dass diese angepasst und verbessert werden können. 


## Funktionaliäten Mit Login:
Nach erfolgreichem Login wird sich nun das Menü anpassen. Unabhängig davon, welchen Usertyp man ausgewählt hat. Wird stest ein Logout Button  als letzer Menüpunkt hinzugefügt. Sollte man sich als Privater User angemeldet haben, dann wird ein Einkaufswagen in der Menüleiste hinzugefügt. 

## Einkaufswagen:("shoppingCart.js")
   Von nun an hat man als User die Möglichkeit Produkte, die man kaufen möchte zu seinem Einkaufswagen hinzuzufügen. Dies ist nur von der Detailansicht aus möglich.(Zu dieser gelangt, man wie bereits erwähnt über die Produkt Page oder die Suchleiste). Von hier aus kann man Produkte in seinen Einkaufswagen legen indem man, auf den dementsprechenden Button drückt.  
   Sobald man nun fertig mit einkaufen ist, gelangt man über den Menüpunkt(Einkaufswagen) zu seinem eigenen Einkaufswagen. Auf dieser Seite erhält man eine finale Übersicht darüber, was aktuell im Warenkorb liegt und kann über den Button "Checkout" alle Produkte kaufen. 

Sollte man sich als gewerblicher Nutzer einloggen, erhält man stadtdessen den Menüpunkt "Product Creation"(dargestellt mit dem Notizblock). 
## Product Creation:("productCreation.js","productDetailPreviewPage.js")
   Als gewerblicher User kann man nun über diesen Menüpunkt eigene Produke einstellen. Dafür ist es zwingend notwendig, dass alle  Eingabefelder ausgefüllt wurden und min. 1 Bild hochgeladen wurde. Bilder können entweder hochgeladen werden, indem man den Button "Choose File" drückt oder indem man eine Datei in das Feld "Product Image" zieht. Bezüglich der Datentypen, muss "Product Price" selbsverstädndlich, wieder mit numerischen Werten angegeben werden. Der Rest der Eingabefelder sind wieder Strings bzw. Auswahlfelder, bei denen man aus einer Liste wählen kann. 
    
   Sobald man nun alles vollständig ausgefüllt hat, kann man sich zuerst noch über den Button "Preview" anzeigen lassen, wie das eingestellte Produkt laut aktuellem Stand aussehen würde. Somit kann man gegebenfalls noch Änderungen vornehmen, sollte es bei der Vorschau noch Unstimigkeiten geben.  Um wieder zurück zugelangen, muss der Button "Return" gedrückt werden. Daraufhin wird das Vorschau Fenster geschloßen und man gelangt direkt wieder zum Product Creation Formular. 

   Sollte man nun fertig sein mit dem "gestalten" seiner Produktseite, dann kann man über den Button "Create" schlußendlich sein Produkt erstellen und im Webshop hochladen. 
   Über den Erfolg des Uploads wird man wie auch wie schon zu vor, über das Pop Up Fenster am oberen Bilschirmrand informiert. Sollte es Probleme währrend des Uploads gegeben haben, dann werden diese dort angezeigt. 

   Gesetz dem Fall, dass der Upload erfolgreich war, wird man als User sofort auf die Produkt Page navigiert. Hier kann man nun das erstellte Produkt sehen und überprüfen ob es den Wünschen entsprechend hochgeladen wurde. 

## Logout("general.js")

Zu guter Letzt hat man als User noch die Möglichkeit sich aus seinem Account auszuloggen, hierbei werden alle Sitzungsdaten gelöscht und die Landing Page wird wieder auf den Ursprungszustand zurückgesetzt.
Wie bereits erwähnt ist diese Funktion ebenfalls Teil des Menüs und wird hier stets als der letze Menüpunkt angezeigt. 

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