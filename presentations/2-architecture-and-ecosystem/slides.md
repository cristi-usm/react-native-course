---
transition: slide-left
layout: cover
color: indigo-light
---

### Arhitectura React Native & Ecosistemul Expo

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Ce este React Native?

:: content ::

**React Native** este un framework open-source creat de Facebook care permite dezvoltatorilor să construiască aplicații mobile **cu adevărat native** pentru iOS și Android, folosind o singură bază de cod scrisă în **JavaScript** și **React**.

Spre deosebire de alte soluții care rulează într-un WebView (practic, o pagină web mascată ca aplicație), React Native folosește componente de bază ale interfeței utilizator (UI) care sunt compilate direct în echivalentele lor native.

<br>

<AdmonitionType type="info">

O componentă `<View>` în React Native devine un `UIView` pe iOS și un `android.view.View` pe Android. Aplicația nu doar *arată* ca una nativă, ci *este* una nativă.

</AdmonitionType>

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# De ce React Native?

:: content ::

<style>
.why-rn-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 100%;
  margin-top: 1.5rem;
}
.why-rn-card {
  background-color: var(--neversink-bg-color);
  padding: 20px;
  border-radius: 12px;
  border: 1px solid var(--neversink-admon-border-color);
  text-align: center;
}
.why-rn-card h3 {
  font-size: 1.2em;
  font-weight: 600;
  color: var(--neversink-highlight-color);
  margin-top: 0;
  margin-bottom: 10px;
}
.why-rn-card p {
  font-size: 0.9em;
  color: var(--neversink-admon-text-color);
}
</style>

<div class="why-rn-container neversink-indigo-light-scheme">
  <div class="why-rn-card">
    <h3>Dezvoltare Rapidă</h3>
    <p>O singură bază de cod pentru iOS și Android reduce timpul și costurile de dezvoltare. Funcționalități precum "Fast Refresh" permit vizualizarea instantă a modificărilor.</p>
  </div>
  <div class="why-rn-card">
    <h3>Comunitate Uriașă</h3>
    <p>Fiind un proiect open-source susținut de Meta, beneficiază de o comunitate vastă, nenumărate librării, tutoriale și suport activ.</p>
  </div>
  <div class="why-rn-card">
    <h3>Performanță Aproape Nativă</h3>
    <p>Prin comunicarea directă cu modulele native, aplicațiile ating o performanță mult superioară alternativelor bazate pe WebView.</p>
  </div>
  <div class="why-rn-card">
    <h3>Ecosistem Matur</h3>
    <p>Ecosistemul React (management de stare, hooks) se transferă direct, permițând dezvoltatorilor web o tranziție lină către dezvoltarea mobilă.</p>
  </div>
</div>

---
layout: image
image: /2-architecture-and-ecosystem/apps.png
backgroundSize: contain
---

---
layout: top-title
align: c
color: indigo-light
---

:: title ::
# JS Runtime

:: content ::

<img src="/2-architecture-and-ecosystem/runtime.png" class="h-100 mx-auto" />

---
layout: center
---

<img src="/2-architecture-and-ecosystem/rn.png" />

---
layout: image
image: /2-architecture-and-ecosystem/separation.png
backgroundSize: contain
---

---
layout: image
image: /2-architecture-and-ecosystem/bridge.png
backgroundSize: contain
---

---
layout: image
image: /2-architecture-and-ecosystem/allthreads.png
backgroundSize: contain
---

---
layout: center
---

<AdmonitionType type="tip">

# Update-urile la UI, JS și calculările de poziționare se desfășoară pe fire de execuție diferite
</AdmonitionType>

<br/>
<br/>

<AdmonitionType type="tip">

# Toată comunicarea între fire de execuție este asincronă
</AdmonitionType>

---
layout: image
image: /2-architecture-and-ecosystem/scroll.png
backgroundSize: contain
---

---
layout: image
image: /2-architecture-and-ecosystem/old-arch.png
backgroundSize: contain
---

---
layout: image
image: /2-architecture-and-ecosystem/web.png
backgroundSize: cover
---

---
layout: image
image: /2-architecture-and-ecosystem/web-detailed.png
backgroundSize: contain
---

---
layout: image
image: /2-architecture-and-ecosystem/allthreads.png
backgroundSize: contain
---

---
layout: image
image: /2-architecture-and-ecosystem/native-detailed.png
backgroundSize: contain
---

---
layout: center
---

<AdmonitionType type="tip">

# Javascript Interface (JSI) – Permite comunicarea între JS și Java/ObjC

- Obiecte Host din C++ expun metode și variabile pentru JS
- JS păstrează referințe la obiectele Host, poate apela metode a acestora


</AdmonitionType>

---
layout: image
image: /2-architecture-and-ecosystem/steps.png
backgroundSize: contain
---

---
layout: image
image: /2-architecture-and-ecosystem/new-arch.png
backgroundSize: contain
---

---
layout: two-cols-title
---

:: title ::

### Fabric & TurboModules

:: left ::

### Fabric: Noul Sistem de Randare

**Fabric** este reimplementarea layer-ului de UI. Profitând de JSI, acesta aduce îmbunătățiri majore:

<div class="ns-c-tight">

- **Randare Sincronă**: Permite operațiuni de UI cu prioritate ridicată să fie executate sincron, eliminând efectul de "pâlpâire" în anumite scenarii.
- **Concurrency**: Permite împărțirea randării în pași mai mici, care pot fi întrerupți, făcând interfața mai receptivă.
- **Core C++ Partajat**: Logica de randare este unificată în C++, reducând duplicarea codului între platforme.

</div>

:: right ::

### TurboModules: Noile Module Native

**TurboModules** sunt evoluția modulelor native.

<div class="ns-c-tight">

- **Încărcare "Lazy"**: Modulele sunt încărcate în memorie doar atunci când sunt folosite pentru prima dată, reducând timpul de pornire al aplicației.
- **Tipizare Puternică**: Folosesc un sistem de specificații (scrise în TypeScript sau Flow) pentru a genera interfețe native, asigurând consistența între JS și nativ.
- **Apeluri Sincrone**: Datorită JSI, funcțiile native pot fi acum apelate sincron din JavaScript, simplificând codul care înainte necesita `Promises` sau `Callbacks`.

</div>
---
layout: two-cols-title
---
:: title ::

### Avantajele Noii Arhitecturi

:: left ::


<br>

**Arhitectura Veche**
- Latență în animații și gesturi din cauza comunicării asincrone peste Bridge.
- Dificultate în integrarea cu API-uri native care necesită răspunsuri sincrone.
- Încărcare "eager" a tuturor modulelor native la pornire.

:: right ::


<br>

**Arhitectura Nouă**
- UI mai fluid și receptiv datorită accesului sincron la elementele native.
- Performanță îmbunătățită pentru liste, animații și gesturi complexe.
- Timp de pornire mai rapid datorită TurboModules.
- Integrare mai simplă și mai sigură cu codul nativ.





---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Layout și Efecte Sincrone: Bridge vs. JSI

:: content ::

Noua arhitectură React Native, cu ajutorul JSI (JavaScript Interface), elimină "bridge-ul" asincron, permițând comunicarea **sincronă** între JavaScript și UI-ul nativ. Acest lucru rezolvă probleme de "tearing" (rupturi vizuale) care apăreau la actualizări rapide, cum ar fi în cazul unui tooltip care urmărește un element în mișcare.

---
layout: center
---

<div class="grid grid-cols-2 gap-8 mt-4 text-center">
<div>

### Arhitectura Veche (Bridge)
Comunicarea asincronă prin bridge cauza o întârziere. Poziția tooltip-ului era calculată **după** ce elementul țintă se randase deja, ducând la o poziționare incorectă pentru un cadru (frame).

<img src="/2-architecture-and-ecosystem/old-tooltip.gif" class="mt-2 mx-auto rounded-lg w-44" alt="Efect de tearing pe arhitectura veche">

</div>
<div>

### Arhitectura Nouă (JSI)
Cu JSI, JavaScript poate invoca direct funcții native. Măsurătorile de layout se fac sincron, în același "tick" al thread-ului de UI, eliminând orice întârziere și efect de "tearing".

<img src="/2-architecture-and-ecosystem/new-tooltip.gif" class="mt-2 mx-auto rounded-lg w-44" alt="Layout sincron pe arhitectura nouă">

</div>
</div>


---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Rendering Concurrent: UI Blocat vs. Fluid

:: content ::

**Rendering-ul Concurent** este o funcționalitate fundamentală a noii arhitecturi, care permite React-ului să pregătească mai multe versiuni ale UI-ului simultan. Cel mai mare beneficiu este că randarea poate fi **întreruptă** pentru a gestiona evenimente mai importante (ex: input-ul utilizatorului), prevenind astfel blocarea interfeței.

---
layout: center
---

<div class="grid grid-cols-2 gap-8 mt-4 text-center">
<div>

### Arhitectura Veche (Blocking)
O actualizare masivă a UI-ului (ex: randarea unei liste lungi) bloca complet thread-ul de JavaScript. Până la finalizarea sarcinii, aplicația nu putea răspunde la nicio acțiune a utilizatorului, creând o experiență neplăcută ("jank").

<img src="/2-architecture-and-ecosystem/old-concurent.gif" class="mt-2 mx-auto rounded-lg w-44" alt="UI-ul se blochează pe arhitectura veche">

</div>
<div>

### Arhitectura Nouă (Concurrent)
React poate "pune pe pauză" o randare de prioritate scăzută pentru a procesa o acțiune a utilizatorului, apoi poate relua randarea. Rezultatul este o aplicație care rămâne fluidă și interactivă, chiar și în timpul unor actualizări complexe.

<img src="/2-architecture-and-ecosystem/new-concurent.gif" class="mt-2 mx-auto rounded-lg w-44" alt="UI fluid pe arhitectura nouă">

</div>
</div>

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Tranziții și Randare Întreruptibilă

:: content ::

Funcția **`startTransition`** din React 18 le permite dezvoltatorilor să marcheze anumite actualizări de stare ca fiind "non-urgente" sau "tranziții". React Native, prin noua arhitectură, poate întrerupe randarea acestor tranziții dacă apare o actualizare mai urgentă (cum ar fi scrierea într-un câmp de text).

---
layout: center
---

<div class="grid grid-cols-2 gap-8 mt-4 text-center">
<div>

### Fără Tranziții (Arhitectura Veche)
Orice actualizare de stare este tratată ca fiind urgentă. Dacă utilizatorul scrie într-un câmp de căutare care filtrează o listă lungă, fiecare caracter introdus declanșează o re-randare costisitoare, blocând UI-ul.

<img src="/2-architecture-and-ecosystem/old-transition.gif" class="mt-2 mx-auto rounded-lg w-44" alt="Actualizări blocante fără tranziții">

</div>
<div>

### Cu `startTransition` (Arhitectura Nouă)
Actualizarea listei este învelită în `startTransition`, devenind întreruptibilă. Aplicația rămâne perfect responsivă la input-ul utilizatorului, chiar dacă lista se actualizează în fundal.

<img src="/2-architecture-and-ecosystem/new-transition.gif" class="mt-2 mx-auto rounded-lg w-44" alt="Actualizări fluide cu startTransition">

</div>
</div>

---
transition: slide-left
layout: cover
color: indigo-light
---

## Crearea unui Proiect React Native CLI

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Setup-ul Mediului "Bare" (React Native CLI)

:: content ::

Crearea unui proiect React Native fără Expo ("bare workflow") oferă control total asupra codului nativ, dar necesită o configurare mai complexă a mediului de dezvoltare.

**Cerințe Esențiale:**

<div class="ns-c-tight">

- **Node.js (LTS)** și un manager de pachete (npm sau Yarn).
- **JDK (Java Development Kit)**: Necesar pentru a compila codul Android.
- **Android Studio**: Pentru SDK-ul Android, emulator și unelte de build. Va trebui să configurați variabilele de mediu precum `ANDROID_HOME`.
- **Xcode** (doar pe macOS): Necesar pentru a dezvolta și a compila aplicația pentru iOS. Include simulatorul de iOS și toate uneltele de build necesare.
- **CocoaPods** (doar pe macOS): Un manager de dependențe pentru proiectele Xcode.

</div>

<br>

<AdmonitionType type="tip">

Configurarea detaliată poate varia în funcție de sistemul de operare. Urmați **întotdeauna** ghidul oficial din documentația React Native, secțiunea **"React Native CLI Quickstart"**.

</AdmonitionType>

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Crearea Proiectului

:: content ::

Odată ce mediul de dezvoltare este configurat corect, puteți crea un nou proiect folosind linia de comandă.

Spre deosebire de `create-expo-app`, se folosește comanda specifică din `react-native-cli`.

Rulează în terminal:
```sh
npx react-native init NumeleMeuProiect
```
<br>

Această comandă va genera un proiect React Native standard, care include directoarele native **`android`** și **`ios`**, gata pentru a fi deschise în Android Studio, respectiv Xcode. Șablonul implicit este unul "blank", conținând doar o componentă `App.tsx` minimală.

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Structura unui Proiect "Bare"

:: content ::

Structura unui proiect creat cu React Native CLI este mai complexă, deoarece include codul nativ al platformelor.

<div class="ns-c-tight">

- **`android/`**: Proiectul nativ Android. Poate fi deschis în Android Studio. Conține fișiere Gradle, cod Java/Kotlin și `AndroidManifest.xml`.
- **`ios/`**: Proiectul nativ iOS. Poate fi deschis în Xcode. Conține fișiere de configurare, cod Swift/Objective-C și `Info.plist`.
- **`App.tsx`** (sau `.js`): Componenta rădăcină a aplicației tale, similar cu `App.js` din șablonul "blank" de la Expo. Aici începi să construiești interfața.
- **`index.js`**: **Punctul de intrare** real al aplicației. Aici, componenta `App` este înregistrată folosind `AppRegistry.registerComponent()`, făcând legătura între lumea JavaScript și cea nativă.
- **`metro.config.js`**: Fișier de configurare pentru Metro, bundler-ul JavaScript folosit de React Native.
- **`package.json`**: Definește script-urile (`start`, `android`, `ios`) și dependențele JavaScript.

</div>

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Rularea Aplicației

:: content ::

Procesul de rulare implică pornirea serverului Metro și compilarea aplicației native pentru platforma dorită.

### 1. Pornirea Serverului Metro
Mai întâi, pornește serverul de dezvoltare care împachetează codul JavaScript. Rulează într-un terminal separat:
```sh
npx react-native start
```
<br>

---
layout: default
---

### 2. Rularea pe Platforma Nativă
Deschide **un alt terminal** în directorul proiectului și rulează una dintre următoarele comenzi:

**Pentru Android:** (Asigură-te că ai un emulator pornit sau un dispozitiv fizic conectat)
```sh
npx react-native run-android
```

**Pentru iOS:** (Doar pe macOS, cu un simulator pornit sau un dispozitiv conectat)
```sh
npx react-native run-ios
```
<br>
Aceste comenzi vor compila codul nativ, vor instala aplicația pe dispozitiv/emulator și o vor conecta la serverul Metro pentru a încărca codul JavaScript.

---
transition: slide-left
layout: cover
color: indigo-light
---

## Ce este Expo?

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Expo - Strat de Unelte Peste React Native

:: content ::

**Expo** este o platformă open-source și un set de unelte construite **în jurul** React Native, concepute pentru a simplifica și accelera întregul proces de dezvoltare, de la crearea proiectului până la publicarea în magazinele de aplicații.

Gândește-te la Expo ca la un **kit de start** complet echipat pentru React Native. Acesta gestionează complexitatea configurării mediului de lucru nativ (Xcode, Android Studio) și oferă o colecție bogată de API-uri și servicii.

<br>

<AdmonitionType type="tip">

**Scopul principal al Expo este de a permite dezvoltatorilor să se concentreze pe scrierea aplicației, nu pe configurarea uneltelor.**

</AdmonitionType>

---
layout: top-title-two-cols
left: 6
right: 6
---

:: title ::

# Două Căi: Expo CLI vs. React Native CLI

:: left ::

### Expo CLI ("Managed")

<div class="ns-c-tight">

- **Simplu și Convenabil**: Fricțiune minimă la început. Nu necesită instalarea Xcode sau Android Studio pentru a începe.
- **Dezvoltare Rapidă**: Aplicația Expo Go permite testarea instantă pe un dispozitiv fizic, fără a construi aplicația.
- **API-uri Expo**: Oferă acces la o gamă largă de API-uri native (Cameră, Notificări, etc.) printr-o interfață JavaScript simplă.
- **Servicii Cloud (EAS)**: Simplifică procesul de build și publicare.
- **Flexibilitate**: Oferă opțiunea de a "părăsi" ecosistemul și de a genera un proiect React Native CLI oricând ("eject").

</div>

:: right ::

### React Native CLI ("Bare")

<div class="ns-c-tight">

- **Control Total**: Oferă acces direct și complet la codul nativ (Swift/Objective-C, Java/Kotlin).
- **Configurare Manuală**: Necesită instalarea și configurarea completă a mediilor de dezvoltare native (Xcode, Android Studio).
- **Flexibilitate Maximă**: Permite integrarea oricărei librării native, fără a depinde de ecosistemul Expo.
- **Mai Puține Abstracții**: Dezvoltatorul lucrează mai aproape de platforma nativă.

</div>


---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Componentele Ecosistemului Expo

:: content ::

Expo este mai mult decât un simplu CLI. Este o platformă completă care oferă unelte pentru fiecare etapă a ciclului de viață al unei aplicații.

<div class="grid grid-cols-2 gap-6 mt-6">
<div class="neversink-indigo-light-scheme p-4 rounded-lg bg-[var(--neversink-bg-color)]">
<h3 class="font-bold text-lg text-[var(--neversink-highlight-color)]">Expo Go</h3>
<p class="text-sm">O aplicație client pentru iOS și Android care îți permite să rulezi și să testezi proiectul tău instantaneu, fără a-l compila nativ.</p>
</div>
<div class="neversink-indigo-light-scheme p-4 rounded-lg bg-[var(--neversink-bg-color)]">
<h3 class="font-bold text-lg text-[var(--neversink-highlight-color)]">Expo SDK</h3>
<p class="text-sm">O bibliotecă vastă de API-uri JavaScript care oferă acces la funcționalități native (cameră, senzori, autentificare, etc.).</p>
</div>
<div class="neversink-indigo-light-scheme p-4 rounded-lg bg-[var(--neversink-bg-color)]">
<h3 class="font-bold text-lg text-[var(--neversink-highlight-color)]"> EAS (Expo Application Services)</h3>
<p class="text-sm">Un set de servicii cloud pentru a construi, semna, distribui și actualiza aplicația ta în magazinele oficiale.</p>
</div>
<div class="neversink-indigo-light-scheme p-4 rounded-lg bg-[var(--neversink-bg-color)]">
<h3 class="font-bold text-lg text-[var(--neversink-highlight-color)]">Expo Router</h3>
<p class="text-sm">O soluție de navigare modernă, bazată pe structura de fișiere, care simplifică crearea de rute și layout-uri complexe.</p>
</div>
</div>
---
layout: image-left
image: /2-architecture-and-ecosystem/expo-go.png
---

### Expo Go: Prototipare Instantă

**Expo Go** este o unealtă esențială în fluxul de dezvoltare "managed". Este o aplicație pe care o instalezi pe telefonul tău din App Store sau Google Play.

**Cum funcționează:**
1.  Rulezi comanda `npx expo start` în terminalul proiectului tău.
2.  Un server de dezvoltare (Metro) pornește și afișează un cod QR.
3.  Scanezi codul QR cu aplicația Expo Go.
4.  Expo Go descarcă pachetul JavaScript al aplicației tale și îl rulează într-un mediu nativ care conține deja întregul Expo SDK.

---
layout: center
---

**Avantaje:**
<div class="ns-c-tight">

- **Viteză**: Vezi rezultatele pe un dispozitiv real în câteva secunde.
- **Simplitate**: Nu ai nevoie de Xcode sau Android Studio instalate.
- **Portabilitate**: Oricine are Expo Go poate testa aplicația ta, oriunde în lume, atâta timp cât este în aceeași rețea sau folosește un tunel.

</div>

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# EAS: De la Dezvoltare la Producție

:: content ::

**Expo Application Services (EAS)** este setul de servicii cloud care preia ștafeta acolo unde se termină dezvoltarea locală. EAS automatizează procesele complexe de build, semnare și distribuție.

<div class="ns-c-tight">

- **EAS Build**: Compilează aplicația ta în cloud, generând fișierele `.apk`/`.aab` (Android) și `.ipa` (iOS) gata pentru a fi trimise în magazine. Nu mai trebuie să ai un Mac pentru a construi pentru iOS.

- **EAS Submit**: Automatizează procesul de încărcare a build-urilor tale în Google Play Store și Apple App Store Connect, direct din linia de comandă.

- **EAS Update**: Permite publicarea de actualizări "Over-The-Air" (OTA). Poți repara bug-uri sau adăuga funcționalități noi în aplicația ta deja publicată, fără a mai trece prin procesul de revizuire al magazinelor.

- **EAS Metadata**: Gestionează metadatele din magazin (capturi de ecran, descrieri, etc.) direct din proiectul tău.

</div>

---
transition: slide-left
layout: cover
color: indigo-light
---

## Crearea și Structura unui Proiect Expo

---
layout: two-cols-title
---

:: title ::

### Pașii Inițiali

:: left ::

### 1. Setup-ul Mediului

Înainte de a începe, asigură-te că ai instalat:

- **Node.js (versiunea LTS)**: React Native și Expo folosesc Node.js pentru a rula serverul de dezvoltare și a gestiona pachetele.
- **Un editor de cod**: Visual Studio Code este o alegere populară în comunitate.
- **Expo Go**: Instalează aplicația pe telefonul tău (iOS sau Android).

:: right ::

### 2. Crearea Proiectului

Deschide un terminal în directorul unde vrei să creezi proiectul și rulează comanda:

```sh
npx create-expo-app NumeleProiectului
```
<br>

Această comandă va crea un nou director, va descărca un șablon de start și va instala toate dependențele necesare.

### 3. Pornirea Proiectului

Navighează în directorul nou creat și pornește serverul de dezvoltare:

```sh
cd NumeleProiectului
npx expo start
```

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Structura Inițială a unui Proiect Expo Router

:: content ::

Un proiect nou creat cu `create-expo-app` vine cu o structură de bază, optimizată pentru navigare cu Expo Router.

<div class="ns-c-tight">

- **`app/`**: Directorul central pentru Expo Router. Fiecare fișier `.js` sau `.tsx` din acest director devine automat o rută în aplicație.
    - **`(tabs)/`**: Un "grup de rute" pentru a defini un layout comun, cum ar fi o bară de tab-uri.
    - **`_layout.js`**: Definește layout-ul pentru un segment de rute (ex: layout-ul pentru tab-uri).
    - **`index.js`**: Ecranul principal al segmentului respectiv.
- **`assets/`**: Conține resurse statice precum imagini, iconițe și fonturi.
- **`components/`**: Un director pe care îl vei crea tu pentru a stoca componente reutilizabile (ex: `ButonPersonalizat.js`, `Card.js`).
- **`app.json`**: Fișierul de configurare principal pentru aplicația ta. Aici setezi numele, iconița, splash screen-ul, permisiunile și multe altele.
- **`package.json`**: Definește script-urile proiectului și listează toate dependențele (librăriile) JavaScript.

</div>


---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Crearea Proiectului "Blank"

:: content ::

Pe lângă șablonul implicit cu navigare, Expo oferă un șablon minimal numit **"blank"**. Acesta este ideal pentru a începe de la zero, fără nicio structură de navigare pre-configurată, oferind control maxim asupra organizării proiectului.

Pentru a crea un proiect folosind acest șablon, adăugăm steagul `--template` la comanda de creare:

```sh
npx create-expo-app NumeleProiectului --template blank
```
<br>

Această comandă va genera un proiect cu strictul necesar pentru a rula o aplicație React Native, având ca punct central un singur fișier: `App.js`.

<AdmonitionType type="info">

Folosirea șablonului "blank" este o metodă excelentă pentru a înțelege fundamentele unei aplicații, deoarece te încurajează să adaugi și să configurezi manual fiecare parte, inclusiv navigarea.

</AdmonitionType>

---
layout: top-title-two-cols
---
:: title ::

# Diferențe: "Blank" vs. "Default" (cu Expo Router)

:: left ::

### Template "Blank"

<div class="ns-c-tight">

- **Minimalist**: Conține doar fișierele esențiale.
- **Punct de Intrare Unic**: Toată aplicația pornește din fișierul `App.js`.
- **Fără Navigare**: Nu include nicio librărie sau configurație pentru navigare. Trebuie să o instalezi și configurezi manual (ex: `React Navigation`).
- **Flexibilitate Maximă**: Tu decizi structura folderelor și arhitectura aplicației.
- **Ideal Pentru**:
    - Învățarea conceptelor de bază.
    - Proiecte mici cu un singur ecran.
    - Implementarea unor soluții de navigare complet personalizate.

</div>

:: right ::

### Template "Default" (cu Expo Router)

<div class="ns-c-tight">

- **Complet Echipat**: Vine cu o soluție de navigare puternică, pre-configurată.
- **Navigare Bazată pe Fișiere**: Structura este centrată în jurul directorului `app/`, unde fiecare fișier devine o rută.
- **Dezvoltare Rapidă**: Include exemple de ecrane, tab-uri și un layout de bază, accelerând procesul inițial.
- **Structură Opinată**: Promovează o arhitectură specifică, bazată pe rute.
- **Ideal Pentru**:
    - Majoritatea aplicațiilor noi.
    - Proiecte care beneficiază de pe urma navigării bazate pe fișiere.
    - Prototipare rapidă a aplicațiilor cu mai multe ecrane.

</div>

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Structura unui Proiect "Blank"

:: content ::

Structura generată este intenționat simplă, pentru a oferi un punct de plecare curat.

<div class="ns-c-tight">

- **`App.js`**: **Inima aplicației tale.** Este primul fișier care se execută și componenta rădăcină. Aici vei începe să scrii cod, să adaugi stiluri și, eventual, să configurezi navigarea.

- **`assets/`**: Un director pentru resursele statice ale aplicației.
    - `icon.png`: Iconița aplicației.
    - `splash.png`: Imaginea afișată la pornirea aplicației.
    - `favicon.png`: Iconița pentru varianta web.

- **`app.json`**: Fișierul de configurare principal pentru Expo. Aici setezi numele aplicației, versiunea, iconița, orientarea ecranului, permisiunile native și multe alte opțiuni specifice platformei.

- **`package.json`**: Fișierul standard Node.js care listează dependențele proiectului (ex: `expo`, `react`, `react-native`) și definește script-urile (ex: `npm start`, `npm run android`).

- **`babel.config.js`**: Fișier de configurare pentru Babel, compilatorul JavaScript care transformă sintaxa modernă (JSX, ES6+) în cod compatibil cu toate dispozitivele.

</div>
