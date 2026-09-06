---
transition: slide-left
layout: cover
color: indigo-light
---

## Stilizarea în React Native
---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# `StyleSheet` vs. CSS Tradițional

:: content ::

Deși conceptul este similar, implementarea stilizării în React Native are diferențe esențiale față de dezvoltarea web cu CSS.

| Caracteristică | React Native (`StyleSheet`) | CSS Tradițional (Web) |
| :--- | :--- | :--- |
| **Sintaxă** | Obiecte JavaScript (camelCase) | Fișiere `.css` (kebab-case) |
| **Selectoare** | Nu există (stilurile se aplică direct) | Complexe (clase, ID-uri, tag-uri, etc.) |
| **Unități** | Unități adimensionale (puncte logice), `%` | Diverse (px, em, rem, vw, vh, etc.) |
| **Moștenire** | Limitată (doar componentele `<Text>` moștenesc) | Moștenire extinsă și efect de cascadă |
| **Performanță** | `StyleSheet.create` serializează stilurile și le trimite o singură dată către motorul de UI nativ. | Gestionat de motorul de randare al browser-ului |
| **Media Queries** | Nu există (se folosește `Dimensions` sau `useWindowDimensions`) | Suport nativ (`@media`) |

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Utilizarea `StyleSheet.create`

:: content ::

Cea mai performantă și organizată metodă de a defini stiluri este folosind `StyleSheet.create`.

**Avantaje:**

<div class="ns-c-tight">

- **Performanță**: Stilurile sunt procesate și memorate nativ o singură dată. În loc să se creeze și să se trimită un obiect de stil complex la fiecare randare, componenta va folosi un ID de referință. Acest lucru optimizează comunicarea dintre JavaScript și interfața nativă.
- **Validare**: React Native poate valida obiectul de stiluri, afișând erori în consolă pentru proprietăți sau valori incorecte.
- **Organizare**: Codul devine mai curat prin separarea clară a stilurilor de logica JSX.

</div>

---
layout: center
---

```js{*|1|12-29|5,8,13-18|6,7,19-28|*}
import { View, Text, StyleSheet } from 'react-native';

export default function StyleSheetEx() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Salut, React Native!</Text>
      <Text style={styles.subtitle}>Stilizare cu StyleSheet</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginTop: 8,
  }
});
```
---
layout: cover
---

<script setup>
const code = `
import { View, Text, StyleSheet } from 'react-native';

export default function StyleSheetEx() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Salut, React Native!</Text>
      <Text style={styles.subtitle}>Stilizare cu StyleSheet</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginTop: 8,
  }
});
`
</script>

<ExpoPreview :code="code" name="Exemplu StyleSheet" />

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Combinarea Stilurilor

:: content ::

Stilurile pot fi combinate folosind un **array**. Această tehnică este extrem de utilă pentru a aplica stiluri de bază și a le suprascrie cu stiluri specifice sau condiționale.

<AdmonitionType type="info">

Ultimul stil din array are prioritate. Dacă două obiecte de stil definesc aceeași proprietate, valoarea din ultimul obiect va fi aplicată.

</AdmonitionType>

<span class="text-center text-xl">

`style={[styles.base, styles.varianta, conditie && styles.conditional]}`

</span> 

<div class="ns-c-tight">

- `styles.base`: Stilurile comune, de bază.
- `styles.varianta`: Modificări specifice (ex: un buton "primar" vs. "secundar").
- `styles.conditional`: Un stil aplicat doar dacă o anumită condiție este îndeplinită.
  
</div>

---
layout: cover
---

<script setup>
const code = `
import { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function CombiningStylesEx() {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <View style={styles.container}>
      <Pressable 
        style={[styles.button, styles.primaryButton]}
        onPress={() => alert('Buton Primar Apăsat!')}
      >
        <Text style={[styles.buttonText, styles.primaryButtonText]}>Buton Primar</Text>
      </Pressable>
      
      <Pressable 
        style={[styles.button, styles.secondaryButton]}
        onPress={() => alert('Buton Secundar Apăsat!')}
      >
        <Text style={[styles.buttonText, styles.secondaryButtonText]}>Buton Secundar</Text>
      </Pressable>

      <Pressable 
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        style={[styles.button, isPressed && styles.pressedButton]}
      >
        <Text style={styles.buttonText}>Apasă-mă (Stil Condițional)</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '80%25',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  primaryButton: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  primaryButtonText: {
    color: 'white',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderColor: '#6c757d',
  },
  secondaryButtonText: {
    color: '#6c757d',
  },
  pressedButton: {
    backgroundColor: '#ffc107',
    borderColor: '#ffc107',
  }
});
`
</script>

<ExpoPreview :code="code" name="Exemplu Combinare Stiluri" />

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Design Systems - Android vs. iOS

:: content ::

Un **Design System** (sistem de design) este o colecție de componente reutilizabile, ghidată de standarde clare, care pot fi asamblate pentru a construi orice număr de aplicații. Acesta servește ca o "sursă unică de adevăr" pentru design și dezvoltare, asigurând consistența și eficiența.

Atât Google (pentru Android), cât și Apple (pentru iOS) au dezvoltat sisteme de design mature și cuprinzătoare, care definesc nu doar aspectul vizual, ci și filozofia interacțiunii pe platformele lor.

Cunoașterea acestor sisteme este crucială pentru a crea aplicații care se simt **native** și intuitive pentru utilizatori.

---
layout: top-title 
align: c 
color: indigo-light
---

:: title ::

# Componentele Cheie ale unui Design System

:: content ::

<div class="ns-c-tight">

- **Principii de Design**: Concepte și tematici fundamentale care informează procesul decizional și oferă o bază solidă pentru alegerile de design.
- **Componente UI**: Elemente reutilizabile (butoane, câmpuri de formular, iconițe) concepute pentru a menține consistența în aspect și comportament.
- **Paleta de Culori**: Un set definit de culori care se armonizează cu identitatea brandului și stabilesc un limbaj vizual consistent.
- **Ghid de Tipografie**: Specificații pentru fonturi, dimensiuni și stiluri, menținând o ierarhie tipografică coerentă.
- **Reguli de Layout(Aranjare)**: Norme pentru spațiere, sisteme de grile și structura generală a paginii pentru a asigura un aspect plăcut și consistent.
- **Iconografie**: Iconițe și simboluri standardizate care contribuie la un limbaj vizual unificat și îmbunătățesc înțelegerea utilizatorului.
- **Standarde de Accesibilitate**: Ghiduri pentru a asigura că designul este incluziv și accesibil pentru utilizatorii cu diverse nevoi.
- **Documentație**: Documentație completă care descrie utilizarea și implementarea elementelor, facilitând aplicarea corectă a sistemului de design de către echipă.

</div>

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Google Material Design (Android)

:: content ::

Lansat în 2014, Material Design este un sistem de design creat de Google pentru a unifica experiența pe toate platformele și dispozitivele sale.

**Principii Cheie:**
<div class="ns-c-tight">

- **Material is the Metaphor**: Interfața se comportă ca un material fizic, cu suprafețe, margini și umbre care indică ce elemente pot fi atinse și cum se vor comporta.
- **Bold, Graphic, Intentional**: Culorile vibrante, tipografia ierarhică și spațiul alb sunt folosite pentru a atrage atenția și a ghida utilizatorul.
- **Motion Provides Meaning**: Animațiile nu sunt doar decorative, ci au un scop: ele ghidează atenția, oferă feedback și creează o tranziție fluidă între stări.

</div>

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Evoluția Material Design

:: content ::

<div class="timeline-horizontal-container neversink-indigo-light-scheme">
    <div class="timeline-horizontal">
        <div class="timeline-item-horizontal">
            <div class="timeline-marker">2014</div>
            <div class="timeline-content-horizontal">
                <h3>Material Design 1</h3>
                <p>Introduce concepte ca "materialul digital", elevația (umbra) și animațiile semnificative, cu accent pe culori îndrăznețe.</p>
            </div>
        </div>
        <div class="timeline-item-horizontal">
            <div class="timeline-marker">2018</div>
            <div class="timeline-content-horizontal">
                <h3>Material Design 2</h3>
                <p>Aduce flexibilitate prin personalizarea culorilor, formelor și tipografiei (theming), permițând brandurilor să se exprime.</p>
            </div>
        </div>
        <div class="timeline-item-horizontal">
            <div class="timeline-marker">2021</div>
            <div class="timeline-content-horizontal">
                <h3>Material You</h3>
                <p>Se axează pe hiper-personalizare, extrăgând culori din wallpaper pentru a crea o interfață unică pentru fiecare utilizator.</p>
            </div>
        </div>
    </div>
</div>

<style>
.timeline-horizontal-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  padding: 50px 0;
}
.timeline-horizontal {
  display: flex;
  justify-content: space-between;
  width: 90%;
  position: relative;
}
.timeline-horizontal::before {
  content: '';
  position: absolute;
  top: 25px;
  left: 5%;
  right: 5%;
  height: 4px;
  background-color: var(--neversink-bg-code-color);
  z-index: 0;
}
.timeline-item-horizontal {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 30%;
  text-align: center;
}
.timeline-marker {
  width: 50px;
  height: 50px;
  background-color: white;
  border: 4px solid var(--neversink-border-color);
  border-radius: 50%;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
  color: var(--neversink-text-color);
}
.timeline-content-horizontal {
  margin-top: 20px;
  padding: 15px;
  background-color: var(--neversink-bg-color);
  border-radius: 8px;
}
.timeline-content-horizontal h3 {
  margin-top: 0;
  font-weight:bold;
  font-size: 1.1em;
  color: var(--neversink-text-color)
}
.timeline-content-horizontal p {
  font-size: 0.9em;
  margin-bottom: 0;
  color: var(--neversink-admon-text-color)
}
</style>

---
layout: image
image: /4-layout-and-styling/materialdiff.jpg
backgroundSize: contain
---

---
layout: image
image: /4-layout-and-styling/md-1.jpg
backgroundSize: contain
---

---
layout: image
image: /4-layout-and-styling/md-2.jpg
backgroundSize: contain
---

---
layout: image
image: /4-layout-and-styling/md-3.png
backgroundSize: contain
---

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Material Design 1 vs Material Design 2

:: content ::

## 1 - Opacitate și Spațiu Alb

O distincție cheie între Material Design 1 și Material Design 2 este utilizarea crescută a spațiului alb. Acest lucru a fost făcut pentru a obține un aspect mai de simplu, dar a provocat o agitație. Noul design include, de asemenea, rafinări ale modului în care funcționează opacitatea.

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Material Design 1 vs Material Design 2

:: content ::

## 2. Google Sans

Cu Material Design 2, Google SANS a înlocuit treptat mai multe dintre tipografiile Roboto care au fost utilizate anterior.

![Icon Colors](/4-layout-and-styling/fonts.webp)

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Material Design 1 vs Material Design 2

:: content ::

## 3. Colțuri Rotunjite

![Icon Colors](/4-layout-and-styling/corners.webp)

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Material Design 1 vs Material Design 2

:: content ::

## 4. Colorarea Iconițelor

![Icon Colors](/4-layout-and-styling/icons.webp)

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Material Design 2 vs Material Design 3 

:: content ::

## 1. Structurarea Antetelor

![Headings](/4-layout-and-styling/headings.jpg)


---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Material Design 2 vs Material Design 3 

:: content ::

## 2. Culori Dinamice

Cea mai fascinantă caracteristică nouă a Material Design 3 este utilizarea sa de culori dinamice, care este o dezvoltare îndrăzneață. Un generator de scheme de culori care se inspiră din fotografiile de fundal ale utilizatorilor este inclus în Material Design 3.

În continuare, o paletă cu funcții de culoare distincte este construită și folosită în orice program care acceptă culori dinamice. Designerii pot dezvolta o schemă de culori personalizată și o pot previzualiza pentru a vedea cum funcționează cu aplicația lor, toate în cadrul constructorului de teme materiale.

Textul, simbolurile, fundalurile și graficele pot fi stilate pentru a se potrivi cu preferințele dvs., pe placă sau la nivel local. Pagina de profil a unui utilizator, de exemplu, ar putea beneficia de colorarea dinamică, dar pagina principală nu ar fi.

---
layout: image
image: /4-layout-and-styling/dynamiccolors.png
backgroundSize: contain
---

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Material Design 2 vs Material Design 3 

:: content ::

## 3. Componente UI

De asemenea, a existat o actualizare cosmetică a componentelor UI. În general, aspectul la Material Design 3 este mai puțin serios și mai distractiv. Este optimizat pentru culori dinamice și are colțuri rotunjite, umbre mai puțin dramatice, mai mult spațiu alb și noi stări active.

De exemplu, bara de navigație de jos sa transfromat acum în bara de navigație de sus și este mai mare și nu aruncă o umbră. Același lucru este valabil și pentru bara de aplicații din partea de sus și pentru elemente de navigație. În același timp, butoanele de acțiune plutitoare (FABS) sunt acum mai în pătratice și mai accesibile într-o versiune nouă, mai mare, pentru a se adapta la ecrane mai mari.


---
layout: image
image: /4-layout-and-styling/components.png
backgroundSize: contain
---

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Apple Human Interface Guidelines (iOS)

:: content ::

Human Interface Guidelines (HIG) este documentația oficială a Apple care definește principiile și convențiile pentru proiectarea interfețelor pe toate platformele sale (iOS, macOS, watchOS, etc.).

**Istoric și Filozofie:**
- **Skeuomorphism (până la iOS 6)**: Designul imita obiecte din lumea reală. De exemplu, aplicația de notițe arăta ca un carnețel de hârtie galbenă. Scopul era de a face interfețele digitale mai familiare și mai ușor de înțeles pentru noii utilizatori.
- **Flat Design (iOS 7 - prezent)**: Odată cu iOS 7, Apple a adoptat un design "plat", minimalist și modern. Accentul s-a mutat de la texturi realiste la tipografie curată, culori vii și utilizarea straturilor (layers) pentru a crea o ierarhie vizuală și o senzație de adâncime.
- **Glass / Liquid Design (2023 - visionOS)**: Odată cu realitatea augmentată, designul devine tridimensional. Folosește materiale translucide (sticlă), lumină și umbră pentru a plasa interfețele în spațiul fizic al utilizatorului. Elementele par reale, au volum și interacționează cu mediul înconjurător.
  
---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Principii Cheie

:: content ::

<div class="ns-c-tight">

- **Clarity (Claritate)**: Textul trebuie să fie lizibil, iconițele precise și layout-ul curat. Fiecare element trebuie să aibă un scop clar.
- **Deference (Deferență)**: Interfața trebuie să fie subtilă și să nu iasă în evidență, permițând conțiutului utilizatorului să fie elementul central. Transparența și blur-ul sunt folosite pentru a sugera conținutul de sub stratul curent.
- **Depth (Adâncime)**: Straturile și animațiile fluide sunt folosite pentru a crea o ierarhie vizuală și pentru a ajuta utilizatorul să înțeleagă contextul și cum să navigheze înapoi. Tranzițiile trebuie să fie logice și intuitive.

</div>

---
layout: image
image: /4-layout-and-styling/ios1.png
backgroundSize: contain
---

---
layout: image
image: /4-layout-and-styling/ios2.png
backgroundSize: contain
---

---
layout: image
image: /4-layout-and-styling/iosflat.jpg
backgroundSize: contain
---

---
layout: image
image: /4-layout-and-styling/iosliquid.jpg
backgroundSize: contain
---

---
layout: center
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/jGztGfRujSE?si=u-JaG44NL_bXerWf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

---
layout: center
align: c
color: indigo-light
---

| Aspect | Material Design (Android) | Human Interface Guidelines (iOS) |
| :--- | :--- | :--- |
| **Navigare Principală** | Adesea în `Drawer` (meniu lateral) sau `Bottom Navigation Bar`. Buton "Înapoi" fizic/gestual. | Predominant `Tab Bar` în partea de jos. Navigare ierarhică cu buton "Înapoi" în colțul stânga-sus. |
| **Butoane** | Proeminente, cu umbră (elevație), text adesea cu majuscule. Include `Floating Action Button` (FAB). | Subtile, adesea doar text colorat sau iconițe. Fără un echivalent direct pentru FAB. |
| **Feedback la Atingere** | Efect de "ripple" (val) care se propagă de la punctul de atingere. | Elementele devin transparente sau își schimbă culoarea la atingere. |
| **Alerte / Dialoguri** | Simple, centrate, cu acțiuni aliniate la dreapta (ex: `DISMISS`, `CONFIRM`). | Mai stilizate, centrate, cu acțiuni clare, adesea cu fonturi bold. |
| **Tipografie** | Fontul principal este **Roboto** și **Sans**. Ierarhie clară prin grosime și dimensiune. | Fontul principal este **San Francisco (SF)**. Accent pe lizibilitate și adaptabilitate. |

---
layout: center
---

<AdmonitionType type="info">

# Ca dezvoltator React Native, este important să cunoști aceste diferențe pentru a crea componente care se simt native pe ambele platforme, fie prin stilizare condițională, fie prin utilizarea de biblioteci de componente care respectă aceste ghiduri.

</AdmonitionType>

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Layout cu Flexbox

:: content ::

Flexbox este "inima" sistemului de layout din React Native. Este un model de design unidimensional care oferă o metodă eficientă și predictibilă de a aranja, alinia și distribui spațiul între elementele dintr-un container, chiar și atunci când dimensiunile acestora sunt necunoscute sau dinamice.

**De ce Flexbox?**
- **Implicit**: Fiecare `View` este, prin natura sa, un container flex. Nu e necesar să adaugi `display: flex;`.
- **Cross-Platform**: Funcționează consistent pe Android și iOS.
- **Responsiv**: Este conceput pentru a crea interfețe care se adaptează natural la diferite dimensiuni de ecran.
- **Intuitiv**: Deși are multe proprietăți, modelul său bazat pe un container și itemii săi este ușor de înțeles.

<AdmonitionType type="info">

Spre deosebire de web, în React Native proprietatea `flexDirection` are valoarea implicită **`'column'`** (elementele se așează pe verticală), nu `'row'`.

</AdmonitionType>

---
layout: two-cols-title
left: 6
right: 6
---

:: title ::

# Axele Flexbox

:: left ::

### Main Axis (Axa Principală)
Este axa de-a lungul căreia sunt așezate elementele. Direcția ei este definită de `flexDirection`.

<div class="ns-c-tight">

-   Dacă `flexDirection: 'column'` (implicit), axa principală este **verticală**.
-   Dacă `flexDirection: 'row'`, axa principală este **orizontală**.

</div>

<br>

Proprietatea `justifyContent` aliniază elementele pe **Axa Principală**.

:: right ::

### Cross Axis (Axa Transversală)
Este axa perpendiculară pe axa principală.

<div class="ns-c-tight">

-   Dacă `flexDirection: 'column'`, axa transversală este **orizontală**.
-   Dacă `flexDirection: 'row'`, axa transversală este **verticală**.

</div>

<br>

Proprietatea `alignItems` aliniază elementele pe **Axa Transversală**.


---
layout: image
image: /4-layout-and-styling/flexDirection.jpg
backgroundSize: contain
---

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# `flexDirection`

:: content ::

Proprietatea `flexDirection` controlează direcția în care copiii unui container flex sunt așezați. Aceasta stabilește axa principală (main axis).

<div class="ns-c-tight">

- **`'column'`** (Implicit): Aranjează elementele de sus în jos.
- **`'row'`**: Aranjează elementele de la stânga la dreapta.
- **`'column-reverse'`**: Aranjează elementele de jos în sus.
- **`'row-reverse'`**: Aranjează elementele de la dreapta la stânga.

</div>

---
layout: cover
---

<script setup>
const code = `
import { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const FlexDirectionBasics = () => {
  const [flexDirection, setFlexDirection] = useState('column');

  const directions = ['column', 'row', 'column-reverse', 'row-reverse'];

  return (
    <View style={{ flex: 1, marginTop: 40 }}>
      <View style={styles.controls}>
        {directions.map(direction => (
          <Pressable 
            key={direction}
            onPress={() => setFlexDirection(direction)}
            style={[styles.button, flexDirection === direction && styles.selected]}
          >
            <Text>{direction}</Text>
          </Pressable>
        ))}
      </View>

      <View style={[styles.container, { flexDirection }]}>
        <View style={styles.box1}><Text style={styles.text}>1</Text></View>
        <View style={styles.box2}><Text style={styles.text}>2</Text></View>
        <View style={styles.box3}><Text style={styles.text}>3</Text></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#ddd'
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white'
  },
  selected: {
    backgroundColor: 'skyblue',
    fontWeight: 'bold'
  },
  box1: { backgroundColor: '#e63946', width: 80, height: 80, justifyContent: 'center', alignItems: 'center' },
  box2: { backgroundColor: '#f1faee', width: 80, height: 80, justifyContent: 'center', alignItems: 'center' },
  box3: { backgroundColor: '#a8dadc', width: 80, height: 80, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 24, fontWeight: 'bold' }
});

export default FlexDirectionBasics;
`
</script>

<ExpoPreview :code="code" name="Exemplu flexDirection" />

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# `justifyContent`

:: content ::

`justifyContent` definește cum sunt distribuite elementele de-a lungul **axei principale** (main axis). Este una dintre cele mai utilizate proprietăți pentru aliniere.

<div class="ns-c-tight">

- **`'flex-start'`** (Implicit): Elementele sunt grupate la începutul axei.
- **`'flex-end'`**: Elementele sunt grupate la sfârșitul axei.
- **`'center'`**: Elementele sunt centrate pe axă.
- **`'space-between'`**: Elementele sunt distribuite egal; primul este la început, ultimul la sfârșit.
- **`'space-around'`**: Elementele sunt distribuite egal, cu spațiu egal în jurul lor. Spațiul de la margini este jumătate din spațiul dintre elemente.
- **`'space-evenly'`**: Elementele sunt distribuite astfel încât spațiul dintre oricare două elemente și spațiul de la margini sunt egale.

</div>

---
layout: cover
---

<script setup>
const code = `
import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';

const JustifyContentBasics = () => {
  const [justifyContent, setJustifyContent] = useState('flex-start');
  const values = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'];

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.controls}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {values.map(value => (
            <Pressable 
              key={value}
              onPress={() => setJustifyContent(value)}
              style={[styles.button, justifyContent === value && styles.selected]}
            >
              <Text>{value}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <View style={[styles.container, { justifyContent }]}>
        <View style={styles.box1} />
        <View style={styles.box2} />
        <View style={styles.box3} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', // Pentru a demonstra clar pe orizontală
    backgroundColor: '#f0f0f0',
    alignItems: 'flex-start' // Neutralizăm alignItems
  },
  controls: {
    padding: 10,
    backgroundColor: '#ddd'
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    marginRight: 10,
  },
  selected: {
    backgroundColor: 'skyblue',
    fontWeight: 'bold'
  },
  box1: { backgroundColor: '#e63946', width: 60, height: 60 },
  box2: { backgroundColor: '#f1faee', width: 60, height: 60 },
  box3: { backgroundColor: '#a8dadc', width: 60, height: 60 },
});

export default JustifyContentBasics;
`
</script>

<ExpoPreview :code="code" name="Exemplu justifyContent" />

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# `alignItems`

:: content ::

`alignItems` definește cum sunt aliniate elementele de-a lungul **axei transversale** (cross axis).

<div class="ns-c-tight">

- **`'stretch'`** (Implicit): Elementele se întind pentru a umple containerul pe axa transversală (dacă nu au o dimensiune fixă pe acea axă).
- **`'flex-start'`**: Elementele sunt aliniate la începutul axei transversale.
- **`'flex-end'`**: Elementele sunt aliniate la sfârșitul axei transversale.
- **`'center'`**: Elementele sunt centrate pe axa transversală.
- **`'baseline'`**: Elementele sunt aliniate astfel încât "linia de bază" a textului lor să fie comună.

</div>

---
layout: cover
---

<script setup>
const code = `
import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';

const AlignItemsBasics = () => {
  const [alignItems, setAlignItems] = useState('stretch');
  const values = ['stretch', 'flex-start', 'flex-end', 'center', 'baseline'];

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.controls}>
         <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {values.map(value => (
            <Pressable 
              key={value}
              onPress={() => setAlignItems(value)}
              style={[styles.button, alignItems === value && styles.selected]}
            >
              <Text>{value}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <View style={[styles.container, { alignItems }]}>
        <View style={styles.box1}><Text style={styles.text}>A</Text></View>
        <View style={styles.box2}><Text style={[styles.text, {fontSize: 40}]}>B</Text></View>
        <View style={styles.box3}><Text style={styles.text}>C</Text></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    minHeight: 200,
  },
  controls: { padding: 10, backgroundColor: '#ddd' },
  button: { padding: 10, borderRadius: 5, backgroundColor: 'white', marginRight: 10, },
  selected: { backgroundColor: 'skyblue', fontWeight: 'bold' },
  box1: { backgroundColor: '#e63946', width: 80 },
  box2: { backgroundColor: '#f1faee', width: 80 },
  box3: { backgroundColor: '#a8dadc', width: 80 },
  text: { textAlign: 'center', fontSize: 20, fontWeight: 'bold' }
});

export default AlignItemsBasics;
`
</script>

<ExpoPreview :code="code" name="Exemplu alignItems" />

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# `flex`

:: content ::

`flex` este cea mai importantă proprietate pentru un item dintr-un container flex. Este un număr care specifică cum un element va **crește** sau se va **micșora** pentru a umple spațiul disponibil de-a lungul axei principale.

- Când `flex` este un număr pozitiv, componenta devine **flexibilă** și se va extinde pentru a umple spațiul rămas.
- Valoarea sa este proporțională. Dacă avem două elemente, unul cu `flex: 1` și altul cu `flex: 2`, al doilea va ocupa de două ori mai mult spațiu decât primul.
- Dacă un singur copil are `flex` setat (ex: `flex: 1`), va ocupa tot spațiul rămas disponibil, după ce celelalte elemente sunt așezate.

<AdmonitionType type="tip">

Folosind `flex: 1` pe containerul principal al unui ecran este cea mai comună metodă de a te asigura că ecranul umple tot spațiul vertical disponibil.
</AdmonitionType>

---
layout: cover
---

<script setup>
const code = `
import { View, Text, StyleSheet } from 'react-native';

const FlexProperty = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}><Text>Antet</Text></View>
      
      <View style={styles.content}>
        <View style={styles.sidebar}><Text>Meniu Lateral</Text></View>
        <View style={styles.main}><Text>Conținut Principal (flex: 1)</Text></View>
      </View>
      
      <View style={styles.footer}><Text>Subsol</Text></View>

       <View style={styles.proportional}>
        <View style={styles.box1}><Text>flex: 1</Text></View>
        <View style={styles.box2}><Text>flex: 2</Text></View>
        <View style={styles.box3}><Text>flex: 3</Text></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    flexDirection: 'column' 
  },
  header: { 
    height: 60, 
    backgroundColor: '#a8dadc', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  content: { 
    flex: 1, 
    flexDirection: 'row' 
  },
  sidebar: { 
    width: 100, 
    backgroundColor: '#f1faee', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  main: { 
    flex: 1, 
    backgroundColor: '#e0e0e0', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  footer: { 
    height: 60, 
    backgroundColor: '#a8dadc', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  proportional: { 
    height: 80, 
    flexDirection: 'row', 
    marginTop: 10 
  },
  box1: { 
    flex: 1, 
    backgroundColor: '#e63946', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  box2: { 
    flex: 2, 
    backgroundColor: '#457b9d', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  box3: { 
    flex: 3, 
    backgroundColor: '#1d3557', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
});

export default FlexProperty;
`
</script>

<ExpoPreview :code="code" name="Exemplu proprietate flex" />

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# `alignSelf`

:: content ::

`alignSelf` permite unui singur item să suprascrie alinierea specificată de `alignItems` pe containerul părinte.

Această proprietate este extrem de utilă pentru a crea excepții de la regula generală de aliniere, fără a fi nevoie să înfășori elementul într-un `View` suplimentar.

Valorile posibile pentru `alignSelf` sunt aceleași ca pentru `alignItems`:
<div class="ns-c-tight">

- **`'auto'`** (Implicit): Itemul moștenește valoarea `alignItems` a părintelui.
- **`'flex-start'`**
- **`'flex-end'`**
- **`'center'`**
- **`'stretch'`**
- **`'baseline'`**

</div>

---
layout: cover
---

<script setup>
const code = `
import { View, Text, StyleSheet } from 'react-native';

const AlignSelfExample = () => {
  return (
    <View style={styles.container}>
      <View style={styles.box1}><Text>Box 1 (start)</Text></View>
      <View style={styles.box2}><Text>Box 2 (auto)</Text></View>
      <View style={styles.box3}><Text>Box 3 (stretch)</Text></View>
      <View style={styles.box4}><Text>Box 4 (center)</Text></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end', // Toate elementele sunt la bază, implicit
    backgroundColor: '#f0f0f0',
  },
  box1: {
    alignSelf: 'flex-start', // Suprascrie și se duce sus
    width: 80,
    backgroundColor: '#e63946',
    padding: 10,
  },
  box2: {
    alignSelf: 'auto', // Moștenește 'flex-end' de la container
    width: 80,
    backgroundColor: '#f1faee',
    padding: 10,
  },
  box3: {
    alignSelf: 'stretch', // Se întinde pe toată înălțimea
    width: 80,
    backgroundColor: '#a8dadc',
    padding: 10,
  },
  box4: {
    alignSelf: 'center', // Se centrează pe axa transversală
    width: 80,
    backgroundColor: '#457b9d',
    padding: 10,
  },
});

export default AlignSelfExample;
`
</script>

<ExpoPreview :code="code" name="Exemplu alignSelf" />

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# `flex`

:: content ::

Proprietatea `flex` este, de fapt, o prescurtare pentru trei proprietăți individuale: `flexGrow`, `flexShrink` și `flexBasis`. Înțelegerea lor separată oferă un control mult mai granular asupra layout-ului.

<div class="grid grid-cols-3 gap-4">
<div>

**`flexGrow` (Creștere)**
Un număr care dictează cât de mult spațiu suplimentar va ocupa un element, proporțional cu celelalte.
- **Implicit: `0`** (elementul nu crește).
- Dacă toate elementele au `flexGrow: 1`, vor împărți spațiul liber în mod egal.

</div>
<div>

**`flexShrink` (Micșorare)**
Un număr care dictează cât de mult se va micșora un element dacă nu există suficient spațiu în container.
- **Implicit: `1`** (elementul se poate micșora).
- Un element cu `flexShrink: 0` nu se va micșora sub dimensiunea sa inițială.

</div>
<div>

**`flexBasis` (Bază)**
Definește dimensiunea inițială a unui element de-a lungul axei principale, înainte ca spațiul rămas să fie distribuit.
- **Implicit: `'auto'`** (dimensiunea este calculată pe baza conținutului sau a proprietăților `width`/`height`).
- Poate fi o valoare numerică (ex: `100`) sau un procent.

</div>
</div>

---
layout: center
---

<AdmonitionType type="info">

# Când scrieți `flex: 1`, de fapt setați `flexGrow: 1`, `flexShrink: 1` și `flexBasis: 'auto'`. Aceasta este cea mai comună utilizare.

</AdmonitionType>
---
layout: cover
---

<script setup>
const code = `
import { View, Text, StyleSheet } from 'react-native';

const FlexAdvanced = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>flexGrow (Implicit 0)</Text>
      <View style={styles.row}>
        <View style={[styles.box, { backgroundColor: '#e63946' }]} />
        <View style={[styles.box, { backgroundColor: '#f1faee' }]} />
        <View style={[styles.box, { backgroundColor: '#a8dadc', flexGrow: 1 }]} >
            <Text>flexGrow: 1</Text>
        </View>
      </View>
      
      <Text style={styles.label}>flexShrink (Implicit 1)</Text>
       <View style={styles.row}>
        <View style={[styles.box, { backgroundColor: '#e63946', width: 150 }]} >
            <Text>width: 150</Text>
        </View>
        <View style={[styles.box, { backgroundColor: '#f1faee', width: 150, flexShrink: 0 }]} >
            <Text>width: 150, flexShrink: 0</Text>
        </View>
        <View style={[styles.box, { backgroundColor: '#a8dadc', width: 150 }]} >
            <Text>width: 150</Text>
        </View>
      </View>

      <Text style={styles.label}>flexBasis</Text>
       <View style={styles.row}>
        <View style={[styles.box, { backgroundColor: '#e63946', flexBasis: 80, flexGrow: 1 }]} >
            <Text>flexBasis: 80</Text>
        </View>
         <View style={[styles.box, { backgroundColor: '#f1faee', flexBasis: 120, flexGrow: 1 }]} >
            <Text>flexBasis: 120</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  label: { fontWeight: 'bold', marginTop: 15, marginBottom: 5 },
  row: { flexDirection: 'row', height: 80, borderWidth: 1, borderColor: 'gray' },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  },
});

export default FlexAdvanced;
`
</script>

<ExpoPreview :code="code" name="Exemplu flexGrow/Shrink/Basis" />

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# `flexWrap`

:: content ::

În mod implicit, elementele dintr-un container flex vor încerca să încapă pe o singură linie, chiar dacă asta înseamnă că vor depăși limitele containerului. Proprietatea `flexWrap` controlează acest comportament.

<div class="ns-c-tight">

- **`'nowrap'`** (Implicit): Elementele sunt forțate să rămână pe o singură linie.
- **`'wrap'`**: Elementele vor trece pe rândul următor dacă nu mai au loc pe linia curentă.
- **`'wrap-reverse'`**: Elementele trec pe rândul următor, dar ordinea rândurilor este inversată.

</div>

<AdmonitionType type="warning">

Când folosiți `'wrap'`, este posibil să fie nevoie să ajustați și `alignContent` (nu `alignItems`) pentru a controla spațierea dintre liniile de elemente.

</AdmonitionType>
---
layout: cover
---

<script setup>
const code = `
import { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const FlexWrapExample = () => {
  const [flexWrap, setFlexWrap] = useState('nowrap');
  const values = ['nowrap', 'wrap', 'wrap-reverse'];

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.controls}>
        {values.map(value => (
          <Pressable 
            key={value}
            onPress={() => setFlexWrap(value)}
            style={[styles.button, flexWrap === value && styles.selected]}
          >
            <Text>{value}</Text>
          </Pressable>
        ))}
      </View>
      <View style={[styles.container, { flexWrap }]}>
        <View style={styles.box}><Text>1</Text></View>
        <View style={styles.box}><Text>2</Text></View>
        <View style={styles.box}><Text>3</Text></View>
        <View style={styles.box}><Text>4</Text></View>
        <View style={styles.box}><Text>5</Text></View>
        <View style={styles.box}><Text>6</Text></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderWidth: 2,
    borderColor: 'red'
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#ddd'
  },
  button: { padding: 10, borderRadius: 5, backgroundColor: 'white' },
  selected: { backgroundColor: 'skyblue', fontWeight: 'bold' },
  box: {
    width: 100,
    height: 100,
    backgroundColor: '#a8dadc',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray'
  },
});

export default FlexWrapExample;
`
</script>

<ExpoPreview :code="code" name="Exemplu flexWrap" />

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# `flexFlow` & `gap`

:: content ::

Pentru a simplifica scrierea stilurilor, Flexbox oferă câteva proprietăți de tip prescurtare (`shorthand`) și proprietăți noi pentru gestionarea spațiului.

<div class="grid grid-cols-2 gap-8">
<div>

**`flexFlow`** (Nu este suportat în React Native)

Pe web, `flex-flow` este o prescurtare pentru `flex-direction` și `flex-wrap`.

<AdmonitionType type="warning">

**Atenție**: `flexFlow` **NU** este o proprietate validă în `StyleSheet`-ul din React Native. Trebuie să specificați `flexDirection` și `flexWrap` separat.

</AdmonitionType>

</div>
<div>

**`gap`, `rowGap`, `columnGap`**

Aceste proprietăți moderne oferă o metodă mult mai simplă de a adăuga spațiu între elementele unui container flex, fără a folosi `margin`.

<div class="ns-c-tight">

- **`gap`**: Setează spațiul atât pe verticală, cât și pe orizontală.
- **`rowGap`**: Setează spațiul doar între rânduri (când `flexDirection` este `row` și `flexWrap` este `wrap`).
- **`columnGap`**: Setează spațiul între coloane/elemente.

</div>

</div>
</div>

---
layout: cover
---

<script setup>
const code = `
import { View, Text, StyleSheet } from 'react-native';

const GapExample = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>gap: 20</Text>
      <View style={[styles.wrapper, { gap: 20 }]}>
        <View style={styles.box} />
        <View style={styles.box} />
        <View style={styles.box} />
        <View style={styles.box} />
        <View style={styles.box} />
      </View>
      
      <Text style={styles.label}>rowGap: 30, columnGap: 10</Text>
       <View style={[styles.wrapper, { rowGap: 30, columnGap: 10 }]}>
        <View style={styles.box} />
        <View style={styles.box} />
        <View style={styles.box} />
        <View style={styles.box} />
        <View style={styles.box} />
        <View style={styles.box} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  label: { fontWeight: 'bold', marginTop: 15, marginBottom: 5, fontSize: 16 },
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#f0f0f0',
    padding: 5,
    borderWidth: 1
  },
  box: {
    width: 80,
    height: 80,
    backgroundColor: '#457b9d',
  },
});

export default GapExample;
`
</script>

<ExpoPreview :code="code" name="Exemplu proprietate Gap" />

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Ordinea Elementelor

:: content ::

În CSS-ul de pe web, proprietatea `order` permite rearanjarea vizuală a elementelor flex, independent de ordinea lor în DOM.

<br>

<AdmonitionType type="warning">

### `order` nu este suportată în React Native

React Native **nu implementează** proprietatea `order`. Ordinea vizuală a componentelor este determinată direct de ordinea lor în codul JSX.

Dacă aveți nevoie de rearanjare dinamică, trebuie să manipulați direct ordinea elementelor în array-ul de date înainte de a le randa.

```js
// Exemplu de rearanjare în JavaScript
const reorderedData = myData.sort((a, b) => a.order - b.order);

return (
  <View>
    {reorderedData.map(item => <MyComponent key={item.id} />)}
  </View>
);
```

</AdmonitionType>

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Exersează Flexbox!

:: content ::

Cel mai bun mod de a învăța Flexbox este prin practică. Aceste jocuri interactive te vor ajuta să-ți consolidezi cunoștințele într-un mod distractiv și eficient.

<div class="grid grid-cols-2 gap-8 mt-8">
<div class="text-center">

### [Flexbox Froggy](https://flexboxfroggy.com/)

<br>
Un joc clasic în care trebuie să ajuți o broscuță să ajungă la nufărul ei, scriind cod Flexbox. Acoperă toate proprietățile de bază.

</div>
<div class="text-center">

### [Flexbox Adventure](https://codingfantasy.com/games/flexboxadventure)

<br>
O aventură în care folosești proprietăți Flexbox pentru a-ți poziționa eroul și a învinge inamicii. Este o abordare mai complexă și distractivă.

</div>
</div>
---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Biblioteci de Componente și Design

:: content ::

Deși React Native oferă un set puternic de componente de bază, construirea fiecărui element de interfață de la zero poate fi un proces lent și repetitiv. Aici intervin **bibliotecile de componente UI**.

Acestea sunt colecții de componente pre-construite, stilizate și gata de utilizare (butoane, carduri, meniuri, etc.), care ne permit să construim interfețe complexe mult mai rapid.

**De ce să folosim o bibliotecă de componente?** 

<div class="ns-c-tight">

- **Viteză și Eficiență**: Reduce drastic timpul de dezvoltare prin eliminarea nevoii de a reinventa roata pentru fiecare componentă.
- **Consistență**: Asigură un aspect vizual și un comportament unitar în întreaga aplicație, respectând principiile unui design system.
- **Accesibilitate și Bune Practici**: Multe biblioteci vin cu suport integrat pentru accesibilitate (ex: etichete pentru cititoare de ecran) și gestionează corect interacțiunile specifice platformei.
- **Personalizare (Theming)**: Majoritatea permit personalizarea culorilor, fonturilor și formelor pentru a se potrivi cu identitatea brandului tău.
- **Mentenanță Ușoară**: Comunitatea din spatele bibliotecii se ocupă de actualizări și rezolvarea problemelor, reducând efortul de mentenanță.

</div>

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# React Native Paper

:: content ::

**React Native Paper** este o bibliotecă de componente UI cross-platform, de înaltă calitate, care implementează cu strictețe **Google Material Design**. Este una dintre cele mai populare alegeri pentru aplicațiile care doresc un aspect familiar și modern, specific Android, dar care funcționează excelent și pe iOS.

**Specificul său:**

<div class="ns-c-tight">

- **Fidelitate cu Material Design**: Oferă componente precum `Button`, `Card`, `AppBar`, `DataTable`, care respectă întocmai ghidurile Google.
- **Personalizare Puternic**: Permite personalizarea completă a paletei de culori (inclusiv suport pentru Material You - culori dinamice), a fonturilor și a formelor.
- **Suport pentru Dark Mode**: Trecerea între tema deschisă și cea întunecată este foarte simplu de implementat.
- **Accesibilitate**: Componentele sunt construite cu accesibilitatea în minte.
- **Suport Web**: Multe dintre componente funcționează și pe web, prin `react-native-web`.

</div>

<AdmonitionType type="tip">

Alege **React Native Paper** dacă vrei o implementare solidă și completă a Material Design, cu opțiuni excelente de personalizare.

</AdmonitionType>

---
layout: cover
---

<script setup>
const code = `
import { Appbar, Button, Card, Text, Provider as PaperProvider } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

// Tema personalizată
const theme = {
  colors: {
    primary: '#6200ee',
    accent: '#03dac4',
  },
};

export default function PaperExample() {
  return (
    <PaperProvider theme={theme}>
      <Appbar.Header>
        <Appbar.Content title="Exemplu Paper" />
      </Appbar.Header>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Title title="Titlu Card" subtitle="Subtitlu" />
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
          <Card.Content>
            <Text style={styles.paragraph}>
              Acesta este un card construit cu React Native Paper. Urmează principiile Material Design.
            </Text>
          </Card.Content>
          <Card.Actions>
            <Button>Anulează</Button>
            <Button mode="contained">OK</Button>
          </Card.Actions>
        </Card>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5'
  },
  card: {
    marginBottom: 16
  },
  paragraph: {
    marginTop: 10,
    fontSize: 16
  }
});
`
const dependencies = 'react-native-paper,react-native-vector-icons'
</script>

<ExpoPreview :code="code" :dependencies="dependencies" name="Exemplu React Native Paper" />

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# React Native Elements

:: content ::

**React Native Elements** este o altă bibliotecă extrem de populară, axată pe a oferi o structură solidă și un design generalist, care poate fi ușor personalizat. Spre deosebire de Paper, nu impune un singur design system, ci adoptă o abordare mai agnostică, combinând idei din Material Design și design-ul iOS.

**Specificul său:**

<div class="ns-c-tight">

- **Ușor de Utilizat**: API-ul său este adesea considerat mai simplu și mai direct pentru începători.
- **Componente Compuse**: Oferă componente complexe precum `Header`, `PricingCard`, `SocialIcon`, `Tile`, care pot fi implementate foarte rapid.
- **Personalizare Flexibilă**: Este foarte ușor să suprascrii stilurile implicite pentru a se potrivi cu designul dorit.
- **Construit cu TypeScript**: Oferă o experiență de dezvoltare excelentă pentru proiectele care folosesc TypeScript.
- **Suport pentru Teme Întunecate**: Include suport pentru dark mode, care poate fi activat cu ușurință.

</div>

<AdmonitionType type="tip">

Alege **React Native Elements** dacă vrei o bibliotecă flexibilă, rapidă și ușor de învățat, care nu te leagă strict de un singur sistem de design.

</AdmonitionType>
---
layout: cover
---

<script setup>
const code = `
import { Button, Card, Text, Header, Icon } from '@rneui/themed';
import { View, StyleSheet, SafeAreaView } from 'react-native';

export default function RNElementsExample() {
  return (
    <SafeAreaView style={styles.container}>
      <Header
        centerComponent={{ text: 'Exemplu RNE', style: styles.heading }}
      />
      <View style={styles.content}>
        <Card>
          <Card.Title>Salut, Lume!</Card.Title>
          <Card.Divider />
          <Card.Image
            style={{ padding: 0 }}
            source={{
              uri:
                'https://images.pexels.com/photos/33496037/pexels-photo-33496037.jpeg',
            }}
          />
          <Text style={{ marginVertical: 10 }}>
            React Native Elements oferă o structură solidă pentru componente, fiind ușor de personalizat.
          </Text>
          <Button
            icon={
              <Icon
                name="code"
                color="#ffffff"
                iconStyle={{ marginRight: 10 }}
              />
            }
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
            }}
            title="Vezi Acum"
          />
        </Card>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 10
  },
  heading: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
});
`
const dependencies = '@rneui/themed,@rneui/base,react-native-vector-icons'
</script>

<ExpoPreview :code="code" :dependencies="dependencies" name="Exemplu React Native Elements" />

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# NativeBase

:: content ::

**NativeBase** este una dintre cele mai vechi și mai mature biblioteci de componente pentru React Native. A fost complet rescrisă în versiunea 3 pentru a oferi o experiență de dezvoltare modernă, bazată pe un sistem de design "utility-first", inspirat de **Tailwind CSS**.

**Specificul său:**

<div class="ns-c-tight">

- **Utility-First Props**: Permite stilizarea componentelor direct prin `props`, făcând codul concis și rapid de scris (ex: `<Box bg="blue.500" p="4">`).
- **Accesibilitate Ridicată**: Urmează standardele WAI-ARIA, asigurând că aplicația ta este accesibilă pentru toți utilizatorii.
- **Extrem de Personalizabilă**: Oferă un control granular asupra fiecărui aspect al componentelor, de la culori și fonturi la variante și stări.
- **Independentă de Platformă**: Componentele sunt concepute să arate la fel pe iOS și Android, oferind o experiență de brand consistentă.
- **Hook-uri Utilitare**: Include hook-uri precum `useColorMode` pentru gestionarea temelor (light/dark) și `useDisclose` pentru controlul stărilor (ex: deschiderea unui modal).

</div>

<AdmonitionType type="tip">

Alege **NativeBase** dacă preferi o abordare "utility-first", vrei un control maxim asupra stilurilor direct din JSX și ai nevoie de o soluție robustă și accesibilă.

</AdmonitionType>
---
layout: cover
---

<script setup>
const code = `
import React from 'react';
import { NativeBaseProvider, Box, Text, Heading, Button, VStack, HStack, Icon, Center } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

export default function NativeBaseExample() {
  return (
    <NativeBaseProvider>
      <Box flex={1} bg="white" safeArea>
        <Center>
          <VStack space={4} alignItems="center" w="90%25">
            <Heading size="lg">Bun venit la NativeBase!</Heading>
            <Text>
              Acest card este construit folosind props de tip "utility-first".
            </Text>

            <Box 
              bg="primary.100" 
              p="4" 
              rounded="lg" 
              shadow={2}
              _text={{
                fontSize: 'md',
                fontWeight: 'medium',
                color: 'primary.800',
              }}
            >
              <HStack alignItems="center" space={2}>
                <Icon as={MaterialIcons} name="info" size="sm" color="primary.800" />
                <Text color="primary.800">
                  Stilizarea se face direct prin props, accelerând dezvoltarea.
                </Text>
              </HStack>
            </Box>

            <Button 
              mt="4" 
              colorScheme="tertiary" 
              leftIcon={<Icon as={MaterialIcons} name="favorite" size="sm" />}
            >
              Apasă-mă
            </Button>
          </VStack>
        </Center>
      </Box>
    </NativeBaseProvider>
  );
}
`
const dependencies = 'native-base,react-native-svg,react-native-safe-area-context,@expo/vector-icons'
</script>

<ExpoPreview :code="code" :dependencies="dependencies" name="Exemplu NativeBase" />

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Abordarea Utility-First (ex: NativeWind)

:: content ::

O alternativă modernă la scrierea stilurilor cu `StyleSheet` este abordarea **"utility-first"**, popularizată în lumea web de **Tailwind CSS**. **NativeWind** aduce această paradigmă în React Native.

**Cum funcționează?**
În loc să definești clase de stil (`styles.container`), aplici stilurile direct în componentă folosind nume de clase predefinite, atomice. Fiecare clasă corespunde unei singure proprietăți CSS.

<span class="text-center">

`className="flex-1 items-center justify-center bg-slate-100"`

</span>

**Avantaje:** 

<div class="ns-c-tight">

- **Dezvoltare Rapidă**: Nu mai trebuie să schimbi constant între fișierul JSX și obiectul `StyleSheet`. Scrii stilurile direct unde ai nevoie de ele.
- **Consistență Forțată**: Folosești un set predefinit de spațieri, culori și dimensiuni, ceea ce duce la o interfață mai consistentă.
- **Cod Previzibil**: Este ușor să înțelegi cum arată o componentă doar citind `className`, fără a căuta definițiile stilurilor în altă parte.
- **Performanță**: NativeWind compilează aceste clase în obiecte `StyleSheet.create` la build time, deci nu există un impact negativ asupra performanței la runtime.

</div>

---
layout: cover
---

<script setup>
const code = `
import { View, Text, StyleSheet } from 'react-native';

// În Snack, simulăm NativeWind folosind StyleSheet, deoarece nu putem
// configura Babel. Numele stilurilor imită clasele utility.

export default function UtilityFirstSimulation() {
  return (
    <View style={[styles.flex1, styles.itemsCenter, styles.justifyCenter, styles.bgGray100]}>
      <View style={[styles.p6, styles.maxWSm, styles.mxAuto, styles.bgWhite, styles.roundedXl, styles.shadowLg, styles.flexRow, styles.itemsCenter, styles.spaceX4]}>
        <View>
          <Text style={[styles.textXl, styles.fontMedium, styles.textBlack]}>Utility-First</Text>
          <Text style={styles.textSlate500}>Stilizare rapidă, chiar și în Snack!</Text>
        </View>
      </View>
       <Text style={[styles.mt4, styles.textCenter, styles.textBlue600, styles.fontBold]}>
          Acest text este stilizat folosind un StyleSheet care imită clasele.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  // Flex & Layout
  flex1: { 
    flex: 1 
  },
  flexRow: { 
    flexDirection: 'row' 
  },
  itemsCenter: { 
    alignItems: 'center' 
  },
  justifyCenter: { 
    justifyContent: 'center' 
  },
  // Background
  bgGray100: { 
    backgroundColor: '#f3f4f6' 
  },
  bgWhite: { 
    backgroundColor: '#ffffff' 
  },
  // Sizing & Spacing
  p6: { 
    padding: 24 
  },
  mt4: { 
    marginTop: 16 
  },
  maxWSm: { 
    maxWidth: 384 
  },
  mxAuto: { 
    marginHorizontal: 'auto' 
  },
  spaceX4: { 
    marginLeft: 16 
  }, 
  // Borders & Shadows
  roundedXl: { 
    borderRadius: 12 
  },
  shadowLg: {
    shadowColor: '#000',
    shadowOffset: { 
      width: 0, 
      height: 10 
    },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
  },
  // Typography
  textXl: { 
    fontSize: 20, 
    lineHeight: 28 
  },
  fontMedium: { 
    fontWeight: '500' 
  },
  fontBold: { 
    fontWeight: '700' 
  },
  textBlack: { 
    color: '#000000' 
  },
  textSlate500: { 
    color: '#64748b' 
  },
  textCenter: { 
    textAlign: 'center' 
  },
  textBlue600: { 
    color: '#2563eb' 
  },
});
`
</script>

<ExpoPreview :code="code" name="Simulare Utility-First" />