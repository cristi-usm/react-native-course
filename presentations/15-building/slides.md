---
transition: slide-left
layout: cover
color: indigo-light
---

# Workflow-ul Bare
Build & Deploy cu EAS

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Introducere în Workflow-ul Bare

:: content ::

React Native oferă două fluxuri de lucru principale: **Managed** (gestionat de Expo) și **Bare** (brut/neadministrat). Alegerea depinde de nivelul de control de care aveți nevoie asupra codului nativ.

<div class="grid grid-cols-2 gap-8 mt-8 text-center">
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-admon-bg-color)] p-6 rounded-lg border border-[var(--neversink-admon-border-color)]">
    <h3 class="text-xl font-bold text-[var(--neversink-text-color)]">Workflow Managed</h3>
<div class="mt-4">

Expo gestionează complexitatea configurării native. Scrieți doar JavaScript/TypeScript. Nu aveți acces direct la directoarele `android` și `ios`.

</div>
    <p class="mt-4 text-sm"><strong>Ideal pentru:</strong> Majoritatea aplicațiilor, prototipare rapidă, echipe fără experiență nativă.</p>
  </div>
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-admon-bg-color)] p-6 rounded-lg border border-[var(--neversink-admon-border-color)]">
    <h3 class="text-xl font-bold text-[var(--neversink-text-color)]">Workflow Bare</h3>
    <p class="mt-4">
    Aveți acces complet la codul nativ (Java/Kotlin pentru Android, Swift/Objective-C pentru iOS). Vă oferă flexibilitate maximă, dar necesită o configurare mai complexă a mediului.
    </p>
    <p class="mt-4 text-sm"><strong>Ideal pentru:</strong> Aplicații cu module native custom, integrare în proiecte native existente ("brownfield").</p>
  </div>
</div>

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# De ce să alegem Workflow-ul Bare?

:: content ::

<div class="grid grid-cols-2 gap-6 mt-6">
<div class="neversink-indigo-light-scheme p-4 rounded-lg bg-[var(--neversink-bg-color)]">
<h3 class="font-bold text-lg text-[var(--neversink-highlight-color)]">Module Native Custom</h3>
<p class="text-sm">Cazul de utilizare principal. Când trebuie să scrieți cod nativ specific platformei sau să integrați o librărie nativă care nu are suport în ecosistemul Expo.</p>
</div>
<div class="neversink-indigo-light-scheme p-4 rounded-lg bg-[var(--neversink-bg-color)]">
<h3 class="font-bold text-lg text-[var(--neversink-highlight-color)]">Control Total asupra Build-ului</h3>
<p class="text-sm">Aveți control complet asupra procesului de compilare, permițând optimizări avansate sau configurări specifice care nu sunt posibile altfel.</p>
</div>
<div class="neversink-indigo-light-scheme p-4 rounded-lg bg-[var(--neversink-bg-color)]">
<h3 class="font-bold text-lg text-[var(--neversink-highlight-color)]">Integrare "Brownfield"</h3>
<p class="text-sm">Când doriți să adăugați funcționalități React Native într-o aplicație nativă deja existentă.</p>
</div>
<div class="neversink-indigo-light-scheme p-4 rounded-lg bg-[var(--neversink-bg-color)]">
<h3 class="font-bold text-lg text-[var(--neversink-highlight-color)]">Dependințe Specifice</h3>
<div class="text-sm">

Unele servicii (în special cele care rulează în fundal pe iOS) pot necesita configurări native specifice în `Info.plist` sau capabilități Xcode.

</div>
</div>
</div>

<AdmonitionType type="info" class="mt-6">

Datorită Expo Dev Client și EAS Build, linia de demarcație dintre Managed și Bare a devenit mai fină. Acum puteți folosi module native custom chiar și în proiecte "managed".

</AdmonitionType>

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Setup-ul Proiectului Bare

:: content ::

Inițializarea unui proiect Bare cu `create-expo-app` este simplă, folosind un șablon minim.

1. **Crearea Proiectului**:
Folosim template-ul `bare-minimum` pentru a genera un proiect curat, fără nicio dependență suplimentară.
`
npx create-expo-app NumeleMeuProiectBare --template bare-minimum
`

1. **Explorarea Structurii**:
După creare, veți observa două directoare noi, esențiale:
<div class="ns-c-tight">

- **`android/`**: Acesta este un proiect Android complet. Îl puteți deschide în Android Studio pentru a modifica fișiere Gradle, `AndroidManifest.xml` sau pentru a adăuga cod Java/Kotlin.
- **`ios/`**: Acesta este un proiect Xcode complet. Îl puteți deschide pe un Mac pentru a edita `Info.plist`, a adăuga capabilități sau a scrie cod Swift/Objective-C.

</div>

3. **Rularea Locală**:
Spre deosebire de `npx expo start`, pentru a rula aplicația trebuie să compilăm codul nativ.
<div class="ns-c-tight">

- **Android**: `npx expo run:android`
- **iOS**: `npx expo run:ios` (necesită macOS și Xcode)

</div>
Aceste comenzi vor compila proiectul nativ, vor instala aplicația pe emulator/dispozitiv și o vor conecta la serverul de dezvoltare Metro.

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Expo Dev Client: Ce e mai bun din ambele lumi

:: content ::

**Expo Dev Client** este o unealtă revoluționară care combină simplitatea fluxului de lucru Managed cu puterea celui Bare.

**Ce este?**
Este o versiune personalizată a aplicației Expo Go, pe care o construiți chiar dvs. și care include **doar modulele native de care aveți nevoie**.

**Cum funcționează?**
<div class="ns-c-tight">

1. Adăugați orice librărie nativă în proiectul dvs. (ex: `react-native-track-player`).
2. Construiți un client de dezvoltare cu `eas build --profile development`.
3. Instalați acest client pe dispozitivul/emulatorul dvs.
4. Acum, puteți porni serverul Metro cu `npx expo start` și vă puteți conecta la clientul dvs. personalizat, beneficiind de Fast Refresh și de toate avantajele dezvoltării rapide, dar având acces la modulele native custom.

</div>

<AdmonitionType type="tip">

Dev Client este podul care vă permite să adăugați cod nativ fără a renunța la viteza de dezvoltare specifică Expo.

</AdmonitionType>

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Exemplu: Adăugarea unei Librării Native

:: content ::

Să presupunem că dorim să adăugăm `react-native-track-player` pentru a gestiona redarea audio în fundal, o funcționalitate care necesită cod nativ.

1. **Instalarea Librăriei**:
Mai întâi, adăugăm pachetul în proiectul nostru.
```bash
npx expo install react-native-track-player
```
Folosirea `npx expo install` asigură compatibilitatea versiunilor.

2. **Configurarea Nativă** (dacă este necesar):
Unele librării necesită modificări în fișierele native. De exemplu, pentru `track-player` ar trebui să adăugăm capabilități de "Background Modes" (Audio, AirPlay, and Picture in Picture) în Xcode.

3. **Re-compilarea Proiectului Nativ**:
După adăugarea unei noi dependențe native, este esențial să re-compilăm aplicația pentru ca modificările să fie incluse.
```bash
# Pentru a actualiza dependențele native (ex: pod-uri pe iOS)
npx expo prebuild --clean

# Pentru a rula aplicația actualizată
npx expo run:ios
```
Comanda `run` va detecta noile dependențe și le va lega (link) automat în timpul procesului de build.

---
transition: slide-left
layout: cover
color: indigo-light
---

# De la Cod la Cloud
Introducere în EAS (Expo Application Services)

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Ce este EAS?

:: content ::

**Expo Application Services (EAS)** este o suită de servicii cloud, găzduite de Expo, concepute pentru a automatiza și simplifica cele mai complexe părți ale ciclului de viață al unei aplicații React Native: **construirea (build), trimiterea (submit) și actualizarea (update)**.

Gândiți-vă la EAS ca la un CI/CD (Continuous Integration/Continuous Deployment) specializat pentru React Native.

**Servicii de Bază:**
<div class="grid grid-cols-3 gap-6 mt-8">
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-bg-color)] p-5 rounded-lg text-center">
    <h3 class="text-lg font-bold text-[var(--neversink-text-color)]">EAS Build</h3>
    <div class="text-sm mt-2">
    
Compilează aplicația dvs. în cloud, generând fișiere `.aab`/`.apk` pentru Android și `.ipa` pentru iOS. **Nu mai aveți nevoie de un Mac pentru a construi pentru iOS!**

</div>
  </div>
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-bg-color)] p-5 rounded-lg text-center">
    <h3 class="text-lg font-bold text-[var(--neversink-text-color)]">EAS Submit</h3>
    <p class="text-sm mt-2">Automatizează procesul de încărcare a build-urilor compilate în Google Play Store și Apple App Store Connect, direct din linia de comandă.</p>
  </div>
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-bg-color)] p-5 rounded-lg text-center">
    <h3 class="text-lg font-bold text-[var(--neversink-text-color)]">EAS Update</h3>
    <p class="text-sm mt-2">Permite publicarea de actualizări "Over-The-Air" (OTA). Puteți livra mici modificări și repara bug-uri utilizatorilor instantaneu, fără a mai trece prin procesul de revizuire al magazinelor.</p>
  </div>
</div>

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Setup-ul EAS CLI

:: content ::

Pentru a interacționa cu serviciile EAS, folosim **EAS CLI** (Command Line Interface).

1. **Instalarea Globală**:
Se recomandă instalarea globală a pachetului pentru a avea acces la comanda `eas` de oriunde.
```bash
npm install -g eas-cli
```

2. **Autentificarea**:
Conectați CLI-ul la contul dvs. Expo. Dacă nu aveți un cont, veți fi ghidat să vă creați unul.
```bash
eas login
```
Această comandă va deschide browser-ul pentru a vă autentifica și va salva cheia de acces local, pe mașina dvs.

3. **Verificarea**:
Puteți verifica dacă sunteți autentificat corect cu comanda:
```bash
eas whoami
```

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Construirea cu `eas build`

:: content ::

**EAS Build** este serviciul care preia codul sursă al aplicației și îl compilează pe un server cloud, gestionând toate dependențele native.

1. **Configurarea Proiectului**:
Prima dată când rulați comanda de build într-un proiect nou, trebuie să configurați EAS.
```bash
eas build:configure
```
Această comandă analizează proiectul și creează un fișier esențial: **`eas.json`**. Acesta conține "profilurile" de build, care definesc cum ar trebui construită aplicația pentru diferite medii (ex: dezvoltare, preview, producție).

---
layout: center
---

2. **Fișierul `eas.json`**:
Acest fișier este inima procesului de build. Un profil de bază arată astfel:
```js
{
  "cli": { "version": ">= 7.0.0" },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {}
  },
  "submit": {
    "production": {}
  }
}
```
<div class="ns-c-tight">

- **`development`**: Profil pentru a crea build-uri de dezvoltare (Dev Client), care se pot conecta la serverul Metro local.
- **`production`**: Profil pentru build-uri finale, optimizate, gata de a fi trimise în magazinele de aplicații.
</div>

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Rularea unui Build în Cloud

:: content ::

Odată ce proiectul este configurat, puteți porni un build pentru platforma dorită.

```bash
# Pentru Android
eas build --platform android
# Pentru iOS
eas build --platform ios
```

**Ce se întâmplă în continuare?**
<div class="ns-c-tight">

1. EAS CLI comprimă proiectul și îl încarcă pe serverele Expo.
2. În cloud, este alocat un server de build care instalează toate dependențele (npm, CocoaPods, Gradle).
3. EAS gestionează automat **semnarea aplicației (app signing)**. Pentru prima dată, va genera cheile necesare (`keystore` pentru Android, `provisioning profiles` pentru iOS) și le va salva în siguranță în contul dvs. Expo. Acest pas elimină una dintre cele mai complicate părți ale dezvoltării native.
4. Aplicația este compilată.
5. La final, primiți un link pentru a descărca artefactul (`.apk`/`.aab` sau `.ipa`) și un cod QR pentru a-l instala direct pe un dispozitiv.

</div>

---
layout: center
---

<AdmonitionType type="info">

# Puteți urmări progresul build-ului în timp real pe dashboard-ul Expo, unde aveți acces la log-uri complete, utile pentru depanare.

</AdmonitionType>

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Publicarea cu `eas submit`

:: content ::

După ce ați testat cu succes build-ul, **EAS Submit** preia acest artefact și îl trimite la magazinele de aplicații pentru revizuire și publicare.

1. **Configurare (Opțională)**:
Puteți pre-configura credențialele pentru magazine în `eas.json` pentru a automatiza complet procesul. Pentru Android, se folosește un fișier JSON de la Google Service Account, iar pentru iOS, se pot folosi chei API App Store Connect.

2. **Rularea Publicării**:
Comanda este simplă și intuitivă. Puteți specifica calea către artefactul descărcat sau puteți lăsa EAS să aleagă automat ultimul build reușit pentru platforma respectivă.

```bash
# Publică ultimul build reușit pentru iOS
eas submit --platform ios --latest

# Publică un artefact specific pentru Android
eas submit --platform android --path /path/to/your/app.aab
```

EAS CLI este interactiv și vă va ghida prin pașii necesari dacă lipsește vreo informație, cum ar fi selectarea contului de dezvoltator sau a versiunii de build.

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# EAS Update: Actualizări Over-the-Air (OTA)

:: content ::

**EAS Update** este una dintre cele mai puternice funcționalități ale ecosistemului Expo. Permite publicarea de actualizări pentru codul JavaScript și resursele (imagini, fonturi) ale aplicației **direct pe dispozitivele utilizatorilor**, fără a mai fi necesar un nou build și un nou proces de revizuire în magazinele de aplicații.

**Cum funcționează?**
<div class="ns-c-tight">

- **Publicarea**: Cu comanda `eas update`, pachetul dvs. JS este compilat și încărcat pe serverele Expo.
- **Canale (Channels)**: Actualizările sunt publicate pe "canale" specifice (ex: `production`, `staging`). Un build nativ este configurat să asculte actualizări pe un anumit canal.
- **Verificarea**: La pornire, aplicația nativă verifică pe serverul Expo dacă există o actualizare nouă pe canalul său. Dacă da, o descarcă în fundal.
- **Aplicarea**: La următoarea pornire a aplicației, noua actualizare este aplicată.

</div>

<AdmonitionType type="tip">

Acest mecanism este ideal pentru a repara bug-uri rapid, a face teste A/B sau a lansa funcționalități noi care nu necesită modificări de cod nativ.

</AdmonitionType>

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Gestionarea Credențialelor cu `eas credentials`

:: content ::

Semnarea aplicațiilor este un proces critic, dar complex, care asigură că build-urile sunt autentice și securizate. EAS simplifică dramatic acest proces prin gestionarea credențialelor în cloud.

Comanda `eas credentials` vă permite să interacționați cu credențialele stocate în siguranță pe contul dvs. Expo.

**Ce gestionează EAS?**
<div class="ns-c-tight">

- **Pentru Android**:
  - **Android Keystore**: Fișierul care conține cheia privată pentru semnarea aplicației. EAS îl poate genera pentru dvs. (`eas credentials` va rula `keytool`).
- **Pentru iOS**:
  - **Distribution Certificate**: Certificatul care vă identifică ca dezvoltator Apple.
  - **Provisioning Profile**: Profilul care leagă certificatul, ID-ul aplicației și dispozitivele permise.
  - **Push Notification Keys**: Cheile necesare pentru a trimite notificări push.

</div>

Când rulați `eas build` pentru prima dată, CLI-ul va detecta dacă lipsesc credențialele și vă va oferi opțiunea de a le genera și încărca automat. Acest lucru elimină necesitatea de a gestiona manual fișiere sensibile pe mașina locală.

---
layout: center
---

# Atelier Practic

**Obiectiv**: Construirea și publicarea unei aplicații "Hello World" pe un canal de testare intern.

**Pași:**
<div class="ns-c-tight">

1. **Inițializați** un proiect nou cu `npx create-expo-app --template bare-minimum`.
2. **Configurați EAS** în proiect cu `eas build:configure`.
3. **Rulați un build** pentru Android folosind profilul `development`: `eas build -p android --profile development`.
4. **Instalați** build-ul pe un dispozitiv fizic folosind codul QR furnizat (acesta este Dev Client-ul dvs.).
5. **Pregătiți** un build pentru producție: `eas build -p android --profile production`.
6. **Creați** o aplicație nouă în Google Play Console și configurați un canal de "Testare Internă".
7. **Rulați** `eas submit -p android --latest` pentru a trimite build-ul pe canalul de testare.
8. **Deveniți tester** și instalați aplicația din magazin!

</div>