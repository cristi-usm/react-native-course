---
transition: slide-left
layout: cover
color: indigo-light
---

## Recapitulare Fundamente JavaScript

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Ce este JavaScript?

:: content ::

JavaScript (JS) este un limbaj de programare **interpretat**, **multi-paradigmă** (suportă programare imperativă, orientată pe obiecte și funcțională) și cu **tipizare dinamică**. Este "limbajul web-ului", dar popularitatea sa a explodat, fiind acum utilizat pe scară largă în diverse domenii.

<div class="grid grid-cols-3 gap-4 mt-8">
<div class="neversink-indigo-light-scheme bg-[var(--neversink-bg-color)] p-4 rounded-lg text-center">
<h3 class="text-lg font-bold text-[var(--neversink-text-color)]">Front-End Web</h3>
<p class="text-sm">Cu librării precum React, Angular, Vue.</p>
</div>
<div class="neversink-indigo-light-scheme bg-[var(--neversink-bg-color)] p-4 rounded-lg text-center">
<h3 class="text-lg font-bold text-[var(--neversink-text-color)]">Back-End</h3>
<p class="text-sm">Cu runtime-uri ca Node.js și Deno.</p>
</div>
<div class="neversink-indigo-light-scheme bg-[var(--neversink-bg-color)] p-4 rounded-lg text-center">
<h3 class="text-lg font-bold text-[var(--neversink-text-color)]">Mobile (React Native)</h3>
<p class="text-sm">Scrii o singură bază de cod pentru iOS și Android.</p>
</div>
</div>

<br/>

<AdmonitionType type="info">

Conform sondajului Stack Overflow 2025, JavaScript este cel mai utilizat limbaj de programare pentru al 13-lea an consecutiv.

</AdmonitionType>

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Caracteristici Cheie

:: content ::

<div class="ns-c-tight">

- **Single-Threaded, Non-Blocking**: JavaScript execută codul pe un singur fir de execuție principal. Pentru a nu bloca acest fir cu operațiuni lente (ex: cereri de rețea), folosește un model asincron, non-blocant, bazat pe un "Event Loop".

- **Tipizare Dinamică**: Tipurile de date ale variabilelor nu sunt declarate explicit și se pot schimba pe parcursul execuției. `let x = 10;` (Number), apoi `x = 'salut';` (String) este valid.

- **Orientat pe Obiecte (bazat pe prototipuri)**: Aproape totul în JavaScript este un obiect. Moștenirea se realizează prin prototipuri, un mecanism flexibil, deși clasele (`class`) introduse în ES6 oferă o sintaxă mai familiară.

- **Funcțiile sunt "First-Class Citizens"**: Funcțiile sunt tratate ca orice altă valoare. Ele pot fi stocate în variabile, pasate ca argumente altor funcții și returnate din alte funcții.

</div>

---
layout: two-cols-title
left: 5
right: 7
---

:: title ::

# Tipuri de Date

:: left ::

### Tipuri Primitive

Valorile primitive sunt **imutabile** (nu pot fi modificate direct).

<div class="ns-c-tight">

-   **`string`**: Pentru text.
-   **`number`**: Pentru numere (întregi sau cu virgulă mobilă).
-   **`boolean`**: `true` sau `false`.
-   **`null`**: Reprezintă intenționat absența unei valori.
-   **`undefined`**: O variabilă care a fost declarată, dar nu i s-a atribuit o valoare.
-   **`symbol`**: O valoare unică și imutabilă, adesea folosită ca și cheie pentru proprietățile obiectelor.
-   **`bigint`**: Pentru numere întregi de dimensiuni foarte mari.

</div>

:: right ::

### Tipuri de Referință (Obiecte)

Valorile de referință sunt **mutabile**.

<div class="ns-c-tight">

-   **`Object`**: Tipul fundamental, o colecție de perechi cheie-valoare.
    -   **`Array`**: Un tip special de obiect, folosit pentru liste ordonate.
    -   **`Function`**: Un obiect special care poate fi executat.
    -   Alte obiecte încorporate: `Date`, `RegExp`, `Map`, `Set`, etc.

</div>

---
layout: center
---

```js
// Primitivă (valoare copiată)
let a = 10;
let b = a;
b = 20;
console.log(a); // Afișează 10

// Referință (referință copiată)
let obj1 = { val: 10 };
let obj2 = obj1;
obj2.val = 20;
console.log(obj1.val); // Afișează 20
```

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Structuri de Control

:: content ::

Sintaxa structurilor de control în JavaScript este foarte similară cu cea din limbajele familiei C (C++, Java, C#), ceea ce face tranziția mai ușoară pentru programatori.

<div class="grid grid-cols-2 gap-4 mt-4">
<div>

**Condiționale**
<div class="ns-c-tight">

- `if / else if / else`
- `switch`
- Operatorul ternar: `conditie ? valAdevarat : valFals`

</div>
</div>
<div>

**Bucle (Iterații)**
<div class="ns-c-tight">

- `for` (clasic, cu contor)
- `while` / `do...while`
- `for...of` (pentru iterabile: Array, String, Map)
- `for...in` (pentru proprietățile unui obiect)

</div>
</div>
</div>

```js
const fructe = ['măr', 'pară', 'banană'];

// for...of este modern și preferat pentru a itera peste valorile unui array
for (const fruct of fructe) {
  console.log(`Îmi place să mănânc ${fruct}e.`);
}

// Rezultat:
// Îmi place să mănânc măre.
// Îmi place să mănânc parăe.
// Îmi place să mănânc bananae.
```

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Tablouri (Arrays)

:: content ::

Un `Array` este un obiect global folosit pentru a stoca o listă ordonată de date. Elementele pot fi de orice tip și pot fi accesate printr-un index numeric (începând de la 0).

Arrays-urile în JavaScript vin cu o multitudine de metode extrem de utile, în special cele funcționale care permit scrierea unui cod mai curat și declarativ.

**Metode esențiale în dezvoltarea cu React/React Native:**

<div class="ns-c-tight">

-   **`map()`**: Creează un nou array prin aplicarea unei funcții pe fiecare element al array-ului original. (Fundamental pentru a randa liste în JSX).
-   **`filter()`**: Creează un nou array cu toate elementele care trec un test (o funcție care returnează `true`).
-   **`reduce()`**: Aplică o funcție "acumulator" pe fiecare element pentru a reduce array-ul la o singură valoare.
-   **`forEach()`**: Execută o funcție pentru fiecare element, dar nu returnează un array nou.
-   **`find()`**: Returnează primul element care satisface o condiție.
-   **`includes()`**: Verifică dacă un array conține un anumit element.

</div>

---
layout: center
---

```js
const numere = [1, 2, 3, 4, 5];

// map: Creează un nou array cu valorile dublate
const dublate = numere.map(numar => numar * 2);
// dublate este [2, 4, 6, 8, 10]

// filter: Creează un nou array doar cu numerele pare
const pare = numere.filter(numar => numar % 2 === 0);
// pare este [2, 4]

// reduce: Calculează suma tuturor numerelor
const suma = numere.reduce((acumulator, numarCurent) => {
  return acumulator + numarCurent;
}, 0); // 0 este valoarea inițială a acumulatorului
// suma este 15

// Combinarea metodelor (chaining)
const sumaParelorDublate = numere
  .filter(n => n % 2 === 0) // [2, 4]
  .map(n => n * 2)         // [4, 8]
  .reduce((acc, n) => acc + n, 0); // 12
```

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Obiecte

:: content ::

Obiectele sunt colecții de perechi **cheie-valoare**, unde cheile sunt `string`-uri (sau `Symbol`-uri), iar valorile pot fi de orice tip, inclusiv alte obiecte sau funcții. Obiectele sunt fundamentale pentru structurarea datelor în JavaScript.

Proprietățile pot fi accesate în două moduri:
<div class="ns-c-tight">

-   **Dot Notation** (Notația cu punct): `obiect.proprietate` - simplu și lizibil.
-   **Bracket Notation** (Notația cu paranteze dreptunghiulare): `obiect['proprietate']` - necesară când cheia este o variabilă sau conține caractere speciale.

</div>

```js
const utilizator = {
  nume: "Ana",
  varsta: 28,
  esteActiv: true,
  "adresa-livrare": "Str. Principală, Nr. 10",
  salut: function() {
    console.log(`Salut, numele meu este ${this.nume}`);
  },
  // Sintaxă modernă pentru metode
  afiseazaVarsta() {
    console.log(`Am ${this.varsta} de ani.`);
  }
};

// Accesare
console.log(utilizator.nume); // "Ana"
console.log(utilizator['adresa-livrare']); // "Str. Principală, Nr. 10"

// Apelare metode
utilizator.salut(); // "Salut, numele meu este Ana"
utilizator.afiseazaVarsta(); // "Am 28 de ani."
```

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Funcții

:: content ::

Funcțiile sunt blocuri de cod reutilizabile. În JavaScript, ele sunt obiecte de primă clasă, ceea ce le conferă o flexibilitate deosebită.

Există mai multe moduri de a le declara:

<div class="grid grid-cols-3 gap-4 mt-4 ">
<div>
<h3 class="font-bold text-center">Declarație de Funcție</h3>
<p class="text-sm text-center">Disponibilă în tot scope-ul (hoisted).</p>

```js
function suma(a, b) {
  return a + b;
}
```

</div>
<div>
<h3 class="font-bold text-center">Expresie de Funcție</h3>
<p class="text-sm text-center">Atribuită unei variabile, nu este "hoisted".</p>

```js
const suma = function(a, b) {
  return a + b;
};
```

</div>
<div>
<h3 class="font-bold text-center">Funcție Săgeată (Arrow)</h3>
<p class="text-sm text-center">Sintaxă concisă, nu are propriul `this`.</p>

```js
const suma = (a, b) => a + b;
```

</div>
</div>
<br/>

<AdmonitionType type="tip">

Funcțiile săgeată (`arrow functions`) sunt extins utilizate în codul modern de React și React Native datorită sintaxei lor scurte și a modului în care gestionează contextul (`this`).

</AdmonitionType>

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Programare Asincronă

:: content ::

JavaScript este **single-threaded**, ceea ce înseamnă că poate face un singur lucru la un moment dat. Dacă o operațiune durează mult (ex: o cerere la un server), ar bloca întregul fir de execuție, iar interfața ar "îngheța".

Pentru a rezolva asta, JavaScript folosește un model **asincron**: inițiază operațiunea, continuă cu alte sarcini și execută o funcție (un "callback") atunci când operațiunea s-a finalizat. Acest proces este gestionat de **Event Loop**.

Trei modele principale sunt folosite pentru a gestiona asincronicitatea:

<div class="ns-c-tight">

-   **Callbacks**: Modelul original, dar poate duce la cod greu de citit ("Callback Hell") la operațiuni multiple.
-   **Promises**: Un obiect care reprezintă starea (pending, fulfilled, rejected) unei operațiuni asincrone. Permite înlănțuirea operațiunilor cu `.then()` și gestionarea erorilor cu `.catch()`.
-   **Async/Await**: "Zahăr sintactic" peste Promises, care permite scrierea codului asincron într-un stil care arată sincron, fiind mult mai lizibil.

</div>
---
layout: center
---

```js
// 1. Callback (exemplu conceptual)
function fetchData(callback) {
  setTimeout(() => { // Simulăm o cerere de rețea
    callback('Date primite!');
  }, 1000);
}
fetchData(data => console.log(data));

// 2. Promise (exemplu cu fetch, API de browser/React Native)
fetch('https://api.example.com/data')
  .then(response => response.json()) // Parsează răspunsul ca JSON
  .then(data => console.log('Date primite (Promise):', data))
  .catch(error => console.error('Eroare:', error));

// 3. Async/Await (cea mai modernă și lizibilă abordare)
async function getData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log('Date primite (Async/Await):', data);
  } catch (error) {
    console.error('Eroare:', error);
  }
}
getData();

console.log('Acest mesaj apare primul, fără a aștepta operațiunile asincrone!');
```

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Module ES6

:: content ::

Modulele permit împărțirea codului în fișiere separate și reutilizabile. Acest lucru ajută la organizare, mentenanță și evită poluarea scope-ului global. React Native folosește extensiv sistemul de module ES6.

Există două tipuri principale de exporturi:

<div class="grid grid-cols-2 gap-8 mt-4">
<div>

### Exporturi Nume (`named exports`)

Poți exporta mai multe valori (funcții, variabile, clase) dintr-un singur fișier. La import, trebuie să folosești numele exacte, între acolade.

```js
// --- utils.js ---
export const PI = 3.14;

export function suma(a, b) {
  return a + b;
}

// --- app.js ---
import { PI, suma } from './utils.js';
console.log(suma(5, 10) * PI);
```

</div>
<div>

### Export Implicit (`default export`)

Poți exporta o singură valoare ca fiind "principalul" export al fișierului. La import, îi poți da orice nume dorești, fără acolade.

```js
// --- User.js ---
export default class User {
  constructor(nume) {
    this.nume = nume;
  }
}

// --- app.js ---
import Persoana from './User.js'; // Putem redenumi
const user = new Persoana('Mihai');
```
</div>
</div>
---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Bunătăți ES6+ 

:: content ::

Versiunile moderne de JavaScript (începând cu ES6/2015) au adus multe îmbunătățiri sintactice care fac codul mai concis și mai expresiv.

<div class="ns-c-tight">

- **Destructurarea**: Extrage valori din array-uri sau proprietăți din obiecte direct în variabile. Esențial pentru lucrul cu props și state în React.

- **Operatori Spread (`...`) și Rest (`...`)**:
  - **Spread**: "Împrăștie" elementele unui array sau proprietățile unui obiect în altul (ex: pentru a face copii sau a combina).
  - **Rest**: "Adună" elementele rămase (ex: argumentele unei funcții) într-un array.

- **Scurtcircuitarea Logică (`&&`, `||`, `??`)**: Folosirea operatorilor logici pentru a controla fluxul. `&&` este des folosit pentru randare condiționată în JSX, iar `||` și `??` (nullish coalescing) pentru valori implicite.

</div>

---
layout: center
---

```js
// --- Destructurare ---
const persoana = { nume: 'Elena', varsta: 30 };
const { nume, varsta } = persoana; // Extrage nume și varsta
console.log(nume); // 'Elena'

const puncte = [10, 20, 30];
const [primul, alDoilea] = puncte;
console.log(primul); // 10

// --- Spread ---
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4]; // [1, 2, 3, 4]

const obj1 = { a: 1 };
const obj2 = { ...obj1, b: 2 }; // { a: 1, b: 2 }

// --- Rest ---
function suma(...numere) { // Adună toate argumentele într-un array 'numere'
  return numere.reduce((acc, n) => acc + n, 0);
}
console.log(suma(1, 2, 3, 4)); // 10

// --- Scurtcircuitare ---
const utilizatorLogat = true;
// În JSX, s-ar randa componenta <Profil /> doar dacă utilizatorLogat este true
utilizatorLogat && console.log('Afișează profil');

const numeUtilizator = null;
const numeAfisat = numeUtilizator ?? 'Anonim'; // 'Anonim' (?? verifică null/undefined)
```

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Clase în JavaScript (ES6)

:: content ::

Introdusă în ECMAScript 2015 (ES6), sintaxa `class` este o modalitate mai clară și mai familiară de a crea obiecte și de a gestiona moștenirea în JavaScript.

<AdmonitionType type="info">

Este important de înțeles că clasele în JavaScript sunt în principal **"zahăr sintactic"** (`syntactic sugar`) peste sistemul existent de moștenire bazat pe prototipuri. Ele nu introduc un nou model de moștenire orientat pe obiecte, ci oferă o sintaxă mai simplă pentru a lucra cu prototipuri.

</AdmonitionType>

**Concepte Cheie:**

<div class="ns-c-tight">

- **`class`**: Cuvântul cheie pentru a declara o clasă.
- **`constructor`**: O metodă specială pentru crearea și inițializarea unui obiect creat cu o clasă.
- **`extends`**: Cuvântul cheie pentru a crea o subclasă (moștenire).
- **`super`**: Cuvântul cheie pentru a apela constructorul clasei părinte.
- **`static`**: Cuvântul cheie pentru a defini metode statice, care sunt apelate pe clasă, nu pe instanțe.

</div>

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Definirea unei Clase

:: content ::

O clasă este un șablon pentru crearea de obiecte. Ea încapsulează datele (proprietăți) și comportamentul (metode) specific obiectelor respective.

Metoda `constructor` este apelată automat atunci când se creează o nouă instanță a clasei folosind cuvântul cheie `new`. Aici se setează de obicei proprietățile inițiale ale obiectului.

---
layout: center
---

<div class="text-sm">

```js
class Masina {
  // Constructorul este apelat la crearea unei noi instanțe: new Masina(...)
  constructor(marca, model, an) {
    this.marca = marca;
    this.model = model;
    this.an = an;
    this.viteza = 0;
  }
  // Metodă a instanței
  accelereaza(valoare) {
    this.viteza += valoare;
    console.log(`Viteza a crescut la ${this.viteza} km/h.`);
  }
  // O altă metodă a instanței
  franeaza(valoare) {
    this.viteza -= valoare;
    if (this.viteza < 0) this.viteza = 0;
    console.log(`Viteza a scăzut la ${this.viteza} km/h.`);
  }
  afiseazaDetalii() {
    console.log(`Mașină: ${this.marca} ${this.model} din anul ${this.an}.`);
  }
}
// Crearea unei noi instanțe (un obiect) a clasei Masina
const masinaMea = new Masina('Dacia', 'Logan', 2023);
masinaMea.afiseazaDetalii(); // Mașină: Dacia Logan din anul 2023.
masinaMea.accelereaza(50);   // Viteza a crescut la 50 km/h.
masinaMea.franeaza(20);     // Viteza a scăzut la 30 km/h.
```

</div>

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Moștenirea (`extends` și `super`)

:: content ::

Moștenirea permite unei clase (subclasă sau clasă derivată) să preia proprietățile și metodele unei alte clase (superclasă sau clasă de bază). Acest lucru promovează reutilizarea codului.

-   Cuvântul cheie **`extends`** este folosit în declarația clasei pentru a stabili relația de moștenire.
-   În interiorul `constructor`-ului subclasei, **`super()`** trebuie apelat *înainte* de a folosi `this`. `super()` apelează constructorul clasei părinte și leagă `this` corect.

---
layout: center
---

```js
class Vehicul {
  constructor(nume) {
    this.nume = nume;
  }

  claxoneaza() {
    console.log(`${this.nume} face un sunet.`);
  }
}

// MasinaElectrica moștenește de la Vehicul
class MasinaElectrica extends Vehicul {
  constructor(nume, capacitateBaterie) {
    super(nume); // Apelează constructorul clasei părinte (Vehicul)
    this.capacitateBaterie = capacitateBaterie;
  }

  // Suprascrierea (override) unei metode
  claxoneaza() {
    console.log(`${this.nume} face un sunet electric silențios.`);
  }

  // Metodă specifică subclasei
  incarca() {
    console.log(`${this.nume} se încarcă...`);
  }
}
```

---
layout: center
---

```js
const tesla = new MasinaElectrica('Tesla Model S', '100 kWh');
tesla.claxoneaza(); // Tesla Model S face un sunet electric silențios.
tesla.incarca();    // Tesla Model S se încarcă...
console.log(tesla.nume); // "Tesla Model S" (proprietate moștenită)
```

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Metode Statice, Getters și Setters

:: content ::

Pe lângă metodele de instanță, clasele pot avea și membri speciali.

<div class="grid grid-cols-2 gap-8">
<div>

### Metode Statice (`static`)

O metodă statică este apelată direct pe clasă, nu pe o instanță a clasei. Este utilă pentru funcții utilitare care sunt legate de clasă, dar nu depind de o instanță specifică.

</div>
<div>

### Getters (`get`) și Setters (`set`)

Permit definirea unor proprietăți "calculate". Un `getter` este o funcție care returnează valoarea unei proprietăți, iar un `setter` este o funcție care actualizează valoarea unei proprietăți.

</div>
</div>

<div class="w-fit mx-auto">

```js
class Calculator {
  static suma(a, b) {
    return a + b;
  }
}
// Se apelează direct pe clasă
const rezultat = Calculator.suma(5, 7);
console.log(rezultat); // 12
// Următoarea linie ar produce o eroare:
// const calc = new Calculator();
// calc.suma(5, 7); // TypeError: calc.suma is not a function
```

</div>

---
layout: center
---

```js
class Utilizator {
  constructor(prenume, nume) {
    this.prenume = prenume;
    this.nume = nume;
  }

  // Getter pentru a obține numele complet
  get numeComplet() {
    return `${this.prenume} ${this.nume}`;
  }

  // Setter pentru a seta numele complet
  set numeComplet(valoare) {
    const [prenume, nume] = valoare.split(' ');
    this.prenume = prenume;
    this.nume = nume;
  }
}

const user = new Utilizator('Ion', 'Popescu');
console.log(user.numeComplet); // 'Ion Popescu' (apelat ca o proprietate)

user.numeComplet = 'Vasile Ionescu';
console.log(user.prenume); // 'Vasile'
```

---
transition: slide-left
layout: cover
color: indigo-light
---

## Recapitulare Fundamente React

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Ce este React?

:: content ::

React este o **librărie** JavaScript, open-source, creată de Facebook, pentru a construi interfețe utilizator (UI) complexe și interactive. Deși este o librărie, ecosistemul său vast (routing, state management) o face să funcționeze ca un "semi-framework".

**Caracteristici Generale:**

<div class="ns-c-tight">

- **Bazat pe Componente**: Interfețele sunt împărțite în bucăți izolate și reutilizabile numite "componente".

<AdmonitionType type="info">

##### O aplicație React este, în esență, un arbore de componente.

</AdmonitionType>


- **Abordare Declarativă**: Tu descrii *cum* ar trebui să arate interfața pentru un anumit state, iar React se ocupă de actualizarea eficientă a DOM-ului pentru a ajunge la acel state. Spui "ce" vrei, nu "cum" să se facă, spre deosebire de abordarea imperativă a JavaScript-ului tradițional.

- **Virtual DOM**: React menține o copie a DOM-ului real în memorie (Virtual DOM). Când state-ul unei componente se schimbă, React actualizează Virtual DOM-ul, calculează diferențele (diffing) și apoi aplică doar acele modificări în DOM-ul real. Acest proces, numit reconciliere, este extrem de eficient.

</div>

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Programare Imperativă vs. Declarativă

:: content ::

Înțelegerea diferenței dintre aceste două paradigme de programare este fundamentală pentru a înțelege "magia" din spatele React și de ce este atât de eficient.

<div class="grid grid-cols-2 gap-8 mt-8 text-center">
<div class="neversink-indigo-light-scheme bg-[var(--neversink-admon-bg-color)] p-6 rounded-lg border border-[var(--neversink-admon-border-color)]">
<h3 class="text-xl font-bold text-[var(--neversink-text-color)]">🗺️ Imperativ ("Cum")</h3>
<p class="mt-2">Este ca și cum i-ai da cuiva instrucțiuni detaliate, pas cu pas, pentru a ajunge la o destinație. Tu descrii fiecare viraj și fiecare acțiune necesară.</p>
<p class="mt-4 font-mono text-sm bg-[var(--neversink-bg-code-color)] p-2 rounded">"Mergi 500m înainte, fă dreapta la semafor, continuă pe strada X, apoi oprește la a treia clădire pe stânga."</p>
<p class="mt-4 text-sm"><strong>În cod:</strong> Manipulezi direct DOM-ul, selectezi elemente și le schimbi proprietățile manual.</p>
</div>
<div class="neversink-indigo-light-scheme bg-[var(--neversink-admon-bg-color)] p-6 rounded-lg border border-[var(--neversink-admon-border-color)]">
<h3 class="text-xl font-bold text-[var(--neversink-text-color)]">📍 Declarativ ("Ce")</h3>
<p class="mt-2">Este ca și cum i-ai spune unui șofer de taxi destinația finală. Tu descrii rezultatul dorit, iar el se ocupă de pașii necesari pentru a ajunge acolo.</p>
<p class="mt-4 font-mono text-sm bg-[var(--neversink-bg-code-color)] p-2 rounded">"Vreau să ajung la Piața Marii Uniri Naționale."</p>
<p class="mt-4 text-sm"><strong>În cod (React):</strong> Descrii cum ar trebui să arate interfața pentru o anumită stare, iar React se ocupă de actualizarea DOM-ului.</p>
</div>
</div>

---
layout: cover
---


### Exemplu Practic - *Schimbarea unui Buton*

Avem un buton. La click, textul și culoarea acestuia trebuie să se schimbe pentru a arăta că a fost "activat".

---
layout: side-title
align: c
color: indigo-light
---

:: title ::
### Abordarea Imperativă (JavaScript Obișnuit)

Aici, dăm instrucțiuni precise:
1.  Găsește butonul în DOM.
2.  Atașează un ascultător de eveniment `click`.
3.  Când se face click, schimbă manual textul.
4.  Apoi, schimbă manual culoarea de fundal.

:: content:: 

```html

<button id="myButton">Apasă-mă</button>

<script>
  const myButton = document.getElementById('myButton');
  let esteActivat = false;

  myButton.addEventListener('click', () => {
    if (!esteActivat) {
      myButton.textContent = 'Activat!';
      myButton.style.backgroundColor = 'green';
      esteActivat = true;
    } else {
      myButton.textContent = 'Apasă-mă';
      myButton.style.backgroundColor = '';
      esteActivat = false;
    }
  });
</script>
```

---
layout: side-title
align: c
color: indigo-light
titlewidth: is-3
---

:: title ::

### Abordarea Declarativă (React)

Aici, descriem cele două stări posibile ale butonului:
1.  Starea `activat`: text "Activat!", culoare verde.
2.  Starea `inactiv`: text "Apasă-mă", culoare standard.

La click, doar schimbăm o variabilă de stare, iar React re-randează butonul conform noii stări.

:: content :: 
<script setup>
const code = `
import { useState } from 'react';
import { Button, View, StyleSheet } from 'react-native';

export default function DeclarativeButton() {
  const [esteActivat, setEsteActivat] = useState(false);

  // Doar descriem rezultatul bazat pe stare
  const titluButon = esteActivat ? 'Activat!' : 'Apasă-mă';
  const culoareButon = esteActivat ? 'green' : '#841584';

  return (
    <View style={styles.container}>
      <Button
        title={titluButon}
        color={culoareButon}
        // La click, actualizăm starea. React se ocupă de restul.
        onPress={() => setEsteActivat(!esteActivat)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});
`
</script>

<ExpoPreview :code="code" name="Exemplu Declarativ" />

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# De ce este React Declarativ?

:: content ::

Abordarea declarativă face codul mai **previzibil**, mai **ușor de citit** și mai **simplu de depanat** (debug).

<div class="ns-c-tight">

-   **Previzibilitate**: Știi exact cum va arăta o componentă doar uitându-te la starea și `props`-urile ei. Nu trebuie să urmărești o secvență de manipulări ale DOM-ului pentru a înțelege starea finală.

-   **Separarea Responsabilităților**: Logica de actualizare a stării este separată de logica de randare. Componenta ta pur și simplu "reacționează" la schimbările de stare.

-   **Eficiență**: React poate optimiza actualizările DOM-ului. Poate grupa mai multe modificări de stare într-o singură re-randare, un proces dificil de gestionat manual în codul imperativ.

</div>

<br>

<AdmonitionType type="info">

# Gândește-te la starea aplicației ca la o singură "sursă de adevăr". Interfața ta este doar o funcție a acelei stări: `UI = f(state)`.

</AdmonitionType>

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Ce este o Componentă?

:: content ::

O componentă este o funcție JavaScript (sau o clasă) care acceptă intrări arbitrare numite **props** (proprietăți) și returnează elemente React ce descriu ce ar trebui să apară pe ecran.

<AdmonitionType type="info">

**Definiția care mie îmi place**: O componentă este o funcție care returnează JSX. 

</AdmonitionType>

Componentele sunt pilonii oricărei aplicații React. Ele permit separarea logicii și a UI-ului în piese independente, testabile și reutilizabile.

<div class="grid grid-cols-2 gap-8 mt-4">
<div class="neversink-indigo-light-scheme bg-[var(--neversink-bg-color)] p-4 rounded-lg">
<h3 class="font-bold text-center text-[var(--neversink-text-color)]">Componentă Funcțională (Modernă)</h3>
<p class="text-sm">O simplă funcție JavaScript. Este abordarea modernă și preferată, folosind "Hooks" pentru a gestiona starea și efectele secundare.
</p>

```js
function Salut(props) {
  return <h1>Salut, {props.nume}!</h1>;
}
```

</div>
<div class="neversink-indigo-light-scheme bg-[var(--neversink-bg-color)] p-4 rounded-lg">
<h3 class="font-bold text-center text-[var(--neversink-text-color)]">Componentă Clasă (Legacy)</h3>
<p class="text-sm">O clasă ES6 care extinde `React.Component`. A fost modul principal de a scrie componente care aveau nevoie de stare sau metode de ciclu de viață.</p>

```js
class Salut extends React.Component {
  render() {
    return <h1>Salut, {this.props.nume}!</h1>;
  }
}
```

</div>
</div>

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# JSX (JavaScript XML)

:: content ::

JSX este o extensie de sintaxă pentru JavaScript care permite scrierea unui cod similar cu HTML direct în fișierele JavaScript. Nu este nici HTML, nici string, ci o modalitate convenabilă de a crea elemente React.

Codul JSX este compilat (transpilat) de unelte precum Babel în apeluri de funcții `React.createElement()`.

**Reguli de Bază JSX:**
<div class="ns-c-tight">

1.  **Returnează un Singur Element Rădăcină**: O componentă trebuie să returneze un singur element părinte. Puteți folosi un `<div>` sau un Fragment React (`<>...</>`) pentru a grupa mai multe elemente.
2.  **Închide Toate Etichetele**: Orice etichetă trebuie să fie închisă, fie cu `</eticheta>`, fie auto-închisă `<eticheta />`.
3.  **Folosește `camelCase` pentru Atribute**: Majoritatea atributelor HTML devin `camelCase` în JSX. De exemplu, `class` devine `className`, iar `onclick` devine `onClick`. 

</div>

---
layout: center
---

```js
const nume = "React";

// Acest cod JSX...
const element = (
  <>
    <h1 className="titlu">Bine ai venit în {nume}!</h1>
    <p>Să începem să învățăm.</p>
  </>
);

// ...este compilat în ceva de genul:
const elementCompilat = React.createElement(
  React.Fragment,
  null,
  React.createElement("h1", { className: "titlu" }, "Bine ai venit în ", nume, "!"),
  React.createElement("p", null, "Să începem să învățăm.")
);
```

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Props (Proprietăți)

:: content ::

**Props** (prescurtare de la "properties") sunt folosite pentru a transmite date de la o componentă părinte la o componentă copil. Ele sunt principala modalitate de a configura și personaliza componentele proprii.

<AdmonitionType type="warning">

**Props sunt "read-only" (doar pentru citire).** O componentă nu trebuie să-și modifice niciodată propriile `props`. Toate componentele React trebuie să acționeze ca niște funcții pure în ceea ce privește `props`-urile lor.

</AdmonitionType>

Datele curg **unidirecțional** în React, de sus în jos (de la părinte la copil).

---
layout: center
---

```js
// Componenta copil 'CardUtilizator' primește props
function CardUtilizator(props) {
  // Destructurarea props pentru un cod mai curat
  const { nume, varsta, ocupatie } = props.informatii;
  
  return (
    <div className="card">
      <h2>{nume}</h2>
      <p>Vârstă: {varsta}</p>
      <p>Ocupație: {ocupatie}</p>
    </div>
  );
}

// Componenta părinte 'Profil' definește datele și le pasează
function Profil() {
  const dateUtilizator = {
    nume: "John Doe",
    varsta: 30,
    ocupatie: "Dezvoltator React"
  };

  return (
    <div>
      <h1>Profilul Meu</h1>
      {/* Părintele pasează datele către copil prin atributul 'informatii' */}
      <CardUtilizator informatii={dateUtilizator} />
    </div>
  );
}
```

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Prop-ul Special `children`

:: content ::

`props.children` este un prop special care conține orice elemente pe care le plasezi între tag-urile de deschidere și de închidere ale unei componente. 

Acesta este extrem de util pentru a crea componente generice de tip "wrapper" sau "container", cum ar fi un `Card`, `Modal` sau `Layout`, care nu știu dinainte ce conținut vor avea.

---
layout: center
---

```js
// Componenta 'Card' este un wrapper generic.
// Ea nu știe ce va conține, doar afișează `props.children`.
function Card(props) {
  return (
    <div className="card-container">
      {props.children}
    </div>
  );
}

function Aplicatie() {
  return (
    <div>
      {/* Tot ce se află între tag-urile <Card> devine props.children */}
      <Card>
        <h2>Titlul Cardului</h2>
        <p>Acesta este un paragraf în interiorul cardului.</p>
        <button>Click aici</button>
      </Card>

      <Card>
        <img src="imagine.jpg" alt="o imagine" />
        <p>Un alt card, cu un conținut complet diferit.</p>
      </Card>
    </div>
  );
}
```

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# State

:: content ::

Dacă `props` sunt datele transmise de la părinte, **`state`** este memoria internă a unei componente. Este un obiect care conține date ce pot fi modificate în timp, de obicei ca rezultat al interacțiunii utilizatorului.

Când state-ul unei componente se schimbă, React **re-randează** automat acea componentă și pe copiii săi pentru a reflecta noile date în UI.

<AdmonitionType type="info">

**Definiția care îmi place mie:** State sunt proprietățile unei componente la modificarea valorii cărora se modifică ceva în UI. 

</AdmonitionType>


În componentele funcționale, gestionăm starea cu hook-ul **`useState`**.

<div class="ns-c-tight">

-   `useState` returnează un array cu două elemente:
    1.  **Valoarea curentă** a stării.
    2.  O **funcție** pentru a actualiza acea valoare.

</div>

<AdmonitionType type="warning">

Nu modifica niciodată starea direct! Folosește întotdeauna funcția de actualizare (ex: `setCount(count + 1)`), nu `count = count + 1`.

</AdmonitionType>

---
layout: cover
---

<script setup>
const code = `
import { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Counter() {
  // Declarăm o variabilă de stare numită 'count', inițializată cu 0
  const [count, setCount] = useState(0);
  const [esteVizibil, setEsteVizibil] = useState(true);

  return (
    <View style={styles.container}>
      {esteVizibil && <Text style={styles.text}>Ai apăsat de {count} ori</Text>}
      
      <Button
        title="Incrementează"
        onPress={() => setCount(count + 1)} // Actualizăm starea la apăsare
      />
      
      <Button
        title={esteVizibil ? "Ascunde" : "Arată"}
        onPress={() => setEsteVizibil(!esteVizibil)} // Comutăm starea booleană
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
  },
  text: {
    fontSize: 20
  }
});
`
</script>

<ExpoPreview :code="code" name="Exemplu useState" />

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Context API

:: content ::

În mod normal, datele sunt transmise de sus în jos prin `props`. Dar ce se întâmplă când o valoare (ex: tema aplicației, utilizatorul autentificat) este necesară în multe componente la niveluri diferite? Transmiterea prin `props` la fiecare nivel devine anevoioasă (fenomen numit **"prop drilling"**).

**Context API** rezolvă această problemă, oferind o modalitate de a pasa date prin arborele de componente fără a fi nevoie să le transmiți manual la fiecare nivel.

Funcționează cu două componente principale:

<div class="ns-c-tight">

- **`Provider`**: Componenta care "furnizează" valoarea. Orice componentă copil din interiorul unui `Provider` poate accesa valoarea.
- **`useContext` (Hook)**: Hook-ul folosit de componentele copil pentru a "consuma" sau a citi valoarea furnizată de cel mai apropiat `Provider` de deasupra sa.

</div>
---
layout: cover
---

<script setup>
const code = `
import { useState, useContext, createContext } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

// 1. Creăm Contextul
const ThemeContext = createContext();

// Componenta care citește valoarea din context
function ThemedComponent() {
  // 3. Folosim useContext pentru a accesa valoarea
  const theme = useContext(ThemeContext);

  return (
    <View style={[styles.box, { backgroundColor: theme === 'dark' ? '#333' : '#eee' }]}>
      <Text style={{ color: theme === 'dark' ? 'white' : 'black' }}>
        Tema curentă este: {theme}
      </Text>
    </View>
  );
}

export default function ContextExample() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    // 2. Învelim componentele în Provider și îi dăm o valoare
    <ThemeContext.Provider value={theme}>
      <View style={styles.container}>
        <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
        <ThemedComponent />
        <ThemedComponent />
      </View>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 15 },
  box: { padding: 20, borderRadius: 10 }
});
`
</script>

<ExpoPreview :code="code" name="Exemplu Context" />

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# `useEffect` Hook

:: content ::

Hook-ul `useEffect` îți permite să execuți **efecte secundare** (`side effects`) în componentele funcționale. Efectele secundare sunt operațiuni care nu sunt legate direct de randare, cum ar fi:

<div class="ns-c-tight">

-   Preluarea de date de la un server (`fetch`).
-   Abonarea la evenimente (ex: un timer, un websocket, scroll).
-   Manipularea directă a DOM-ului (mai rar în React).

</div>

`useEffect(setup, dependencies?)` primește doi parametri:
<div class="ns-c-tight">

1.  **O funcție `setup`**: Codul care va rula. Această funcție poate returna opțional o funcție de **cleanup**, care va fi executată înainte ca efectul să ruleze din nou sau la demontarea componentei.
2.  **Un array de `dependențe` (opțional)**: Controlează *când* se re-execută efectul.
    -   **`[dep1, dep2]`**: Efectul rulează la prima randare și de fiecare dată când oricare dintre `dep1` sau `dep2` se schimbă.
    -   **`[]` (array gol)**: Efectul rulează **doar o singură dată**, la prima randare a componentei.
    -   **Nespecificat**: Efectul rulează **după fiecare randare**. (Atenție la bucle infinite!)

</div>
---
layout: cover
---

<script setup>
const code = `
import { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';

export default function UseEffectExample() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resourceId, setResourceId] = useState(1);

  useEffect(() => {
    setLoading(true);
    console.log(\`Preluare date pentru ID: \${resourceId}\`);

    fetch(\`https://jsonplaceholder.typicode.com/todos/\${resourceId}\`)
      .then(response => response.json())
      .then(json => {
        setData(json);
        setLoading(false);
      });

    return () => {
      console.log(\`Cleanup pentru ID: \${resourceId}\`);
    };
  }, [resourceId]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text style={styles.text}>Titlu: {data.title}</Text>
      )}
      <Button
        title="Încarcă Următorul"
        onPress={() => setResourceId(id => id + 1)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 16, textAlign: 'center', margin: 10 }
});
`
</script>

<ExpoPreview :code="code" name="Exemplu useEffect" />

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# `useRef` Hook

:: content ::

`useRef` este un hook care îți permite să creezi o referință către un obiect mutabil, a cărui valoare persistă pe parcursul ciclului de viață al componentei, fără a cauza re-randări atunci când se schimbă.

Are două cazuri de utilizare principale:

<div class="grid grid-cols-2 gap-8">
<div>

### 1. Accesarea Elementelor Native

Poți atașa un `ref` la un element JSX (ex: `<TextInput ref={myRef} />`) pentru a obține o referință directă la elementul nativ corespunzător. Acest lucru permite apelarea metodelor imperative pe acel element (ex: `myRef.current.focus()`).

</div>
<div>

### 2. Stocarea unei Valori Mutabile

Poți folosi un `ref` ca o "cutie" pentru a stoca orice valoare care trebuie să persiste între randări, dar a cărei modificare **nu trebuie să declanșeze** o nouă randare. Este ca o variabilă de instanță dintr-o clasă. (Ex: stocarea ID-ului unui timer).

</div>
</div>

<AdmonitionType type="tip">

Spre deosebire de `useState`, actualizarea valorii `ref.current` **nu** va face componenta să se re-rendeze. Folosește `ref` pentru valori care nu afectează direct aspectul vizual al componentei.

</AdmonitionType>

---
layout: cover
---

<script setup>
const code = `
import { useRef, useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

export default function UseRefExample() {
  // 1. Ref pentru a accesa un element nativ
  const inputRef = useRef(null);
  
  // 2. Ref pentru a stoca o valoare care nu declanșează re-randare
  const renderCount = useRef(0);
  
  const [text, setText] = useState('');

  useEffect(() => {
    // La fiecare randare, incrementăm valoarea din ref
    renderCount.current = renderCount.current + 1;
  });

  const focusInput = () => {
    // Apelăm o metodă imperativă pe elementul nativ
    inputRef.current.focus();
  };

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        value={text}
        onChangeText={setText}
        style={styles.input}
        placeholder="Apasă butonul pentru focus"
      />
      <Button title="Pune Focus pe Input" onPress={focusInput} />
      
      <Text style={styles.text}>
        Componenta s-a randat de {renderCount.current} ori.
      </Text>
      <Text style={styles.info}>
        (Observă cum acest număr se actualizează doar la randările cauzate de schimbarea textului, nu de ref în sine).
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  input: {
    height: 40,
    width: '80%25',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10
  },
  text: { marginTop: 20, fontSize: 16 },
  info: { fontSize: 12, color: 'gray', textAlign: 'center', marginTop: 5 }
});
`
</script>
<ExpoPreview :code="code" name="Exemplu useRef" />