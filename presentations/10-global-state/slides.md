---
transition: slide-left
layout: cover
color: indigo-light
---

### Gestionarea Stării Globale în React Native

De la Context API la Redux și Mai Departe

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Ce este Starea Globală?

:: content ::

**Starea Globală** este un loc centralizat unde stocăm datele aplicației care trebuie să fie accesate sau modificate de mai multe componente, indiferent de poziția lor în arborele de componente.

Gândiți-vă la ea ca la "creierul" aplicației, o sursă unică de adevăr pentru informațiile esențiale.

<br>

### De ce avem nevoie de ea?

Problema principală pe care o rezolvă este **"Prop Drilling"**.

<style>
.prop-drilling-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 2rem;
  font-family: 'Segoe UI', sans-serif;
}
.prop-drilling-card {
  background-color: var(--neversink-admon-bg-color);
  padding: 20px;
  border-radius: 10px;
  border: 1px solid var(--neversink-admon-border-color);
  width: 45%;
  text-align: center;
}
.prop-drilling-card h3 {
  color: var(--neversink-highlight-color);
  margin-top: 0;
}
.arrow {
  font-size: 2.5em;
  color: var(--neversink-text-color);
}
</style>

<div class="prop-drilling-container neversink-indigo-light-scheme">
  <div class="prop-drilling-card">
    <h3>❌ Fără Stare Globală</h3>
<div class="text-sm">
    
Pentru ca o componentă de la nivel adânc (ex: `Avatar`) să acceseze datele utilizatorului, acestea trebuie pasate prin `props` prin toate componentele intermediare (`App` -> `Layout` -> `Header` -> `Avatar`).

</div>
  </div>
  <div class="arrow">➡️</div>
  <div class="prop-drilling-card">
    <h3>✅ Cu Stare Globală</h3>
    <div class="text-sm">
    
Componenta `Avatar` poate accesa direct datele utilizatorului din starea globală, fără ca `Layout` sau `Header` să știe de existența lor. Codul devine mai curat, mai eficient și mai ușor de întreținut.

</div>
  </div>
</div>

---
transition: slide-left
layout: cover
color: indigo-light
---

## React Native Pur: Context API

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Context API: Mecanismul Nativ

:: content ::

**Context API** este soluția încorporată în React pentru a partaja starea între componente fără a folosi `props`. Este o unealtă puternică, ideală pentru aplicații de dimensiuni mici și medii sau pentru stări care nu se schimbă foarte des (ex: tema aplicației, limba, informațiile utilizatorului autentificat).

**Cum funcționează?**

<div class="ns-c-tight">

1.  **`createContext()`**: Creezi un obiect `Context`. Acesta este containerul pentru starea ta.
2.  **`Context.Provider`**: O componentă specială care "furnizează" o valoare. Înfășori o parte a arborelui tău de componente cu acest `Provider`. Toți copiii din interior vor avea acces la valoare.
3.  **`useContext(MyContext)`**: Un hook care permite oricărei componente copil să "consume" (citească) valoarea furnizată de cel mai apropiat `Provider` de deasupra sa.

</div>
---
layout: cover
---

<script setup>
const code = `
import { useState, useContext, createContext } from 'react';
import { View, Text, Switch, StyleSheet, SafeAreaView } from 'react-native';

// 1. Creăm Contextul cu o valoare implicită
const ThemeContext = createContext('light');

// O componentă care folosește contextul
function ThemedButton() {
  // 3. Folosim useContext pentru a accesa valoarea temei
  const theme = useContext(ThemeContext);
  const isDark = theme === 'dark';
  
  return (
    <View style={[styles.button, { backgroundColor: isDark ? '#555' : '#ddd' }]}>
      <Text style={{ color: isDark ? 'white' : 'black' }}>Buton Tematic</Text>
    </View>
  );
}

// O altă componentă, la un alt nivel
function Toolbar() {
  return (
    <View style={styles.toolbar}>
      <ThemedButton />
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
    // Toți copiii pot accesa acum valoarea 'theme'
    <ThemeContext.Provider value={theme}>
      <SafeAreaView style={[styles.container, { backgroundColor: theme === 'dark' ? '#333' : '#fff' }]}>
        <Text style={{ color: theme === 'dark' ? 'white' : 'black' }}>Tema este: {theme}</Text>
        <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
        <Toolbar />
      </SafeAreaView>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 15 },
  toolbar: { padding: 10, borderRadius: 5 },
  button: { padding: 15, borderRadius: 10 }
});
`
</script>

<ExpoPreview :code="code" name="Exemplu Context API" />

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Îmbunătățirea Context-ului cu `useReducer`

:: content ::

Pentru stări mai complexe, unde următoarea stare depinde de cea anterioară sau unde logica de actualizare este complicată, combinarea `Context` cu hook-ul `useReducer` este o soluție foarte puternică și scalabilă.

**Ce este `useReducer`?**
Este o alternativă la `useState`, inspirată din Redux. În loc să actualizezi starea direct, trimiți ("dispatch") o **acțiune**, iar o funcție **reducer** calculează noua stare pe baza stării curente și a acțiunii primite.

**Avantaje:**

<div class="ns-c-tight">

- **Logică Centralizată**: Toată logica de modificare a stării este centralizată în funcția `reducer`, nu împrăștiată în diverse funcții `handle...` din componentă.
- **Previzibilitate**: Actualizările devin mai previzibile și mai ușor de testat.
- **Performanță**: Permite optimizări de performanță prin pasarea funcției `dispatch` în jos prin context, care este stabilă între randări, prevenind re-randări inutile ale componentelor copil.

</div>
---
layout: cover
---

<script setup>
const code = `
import { useReducer, useContext, createContext } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView } from 'react-native';

// 1. Creăm Context-ul
const CounterContext = createContext();

// 2. Definim reducer-ul: (stareCurenta, actiune) => nouaStare
function counterReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

// 3. Creăm Provider-ul care va folosi useReducer
function CounterProvider({ children }) {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });
  // Furnizăm atât starea, cât și funcția dispatch
  const value = { state, dispatch };
  return <CounterContext.Provider value={value}>{children}</CounterContext.Provider>;
}

// Componentă copil care folosește contextul
function CounterDisplay() {
  const { state } = useContext(CounterContext);
  return <Text style={styles.text}>Contor: {state.count}</Text>;
}

// Altă componentă copil care modifică starea
function CounterControls() {
  const { dispatch } = useContext(CounterContext);
  return (
    <View style={styles.controls}>
      <Button title="Incrementează" onPress={() => dispatch({ type: 'increment' })} />
      <Button title="Decrementează" onPress={() => dispatch({ type: 'decrement' })} />
    </View>
  );
}

export default function App() {
  return (
    <CounterProvider>
      <SafeAreaView style={styles.container}>
        <CounterDisplay />
        <CounterControls />
      </SafeAreaView>
    </CounterProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 24, fontWeight: 'bold' },
  controls: { flexDirection: 'row', marginTop: 20, gap: 10 }
});
`
</script>

<ExpoPreview :code="code" name="Exemplu Context cu useReducer" />

---
transition: slide-left
layout: cover
color: indigo-light
---

## Redux: O Sursă Unică de Adevăr

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Conceptele de Bază Redux

:: content ::

**Redux** este o librărie de gestionare a stării, predictibilă, pentru aplicații JavaScript. Deși `Context API` este util, Redux oferă unelte mai puternice pentru depanare, middleware și gestionarea stărilor complexe în aplicații de mari dimensiuni.

Fluxul de date în Redux este strict **unidirecțional**.

<img src="/10-global-state/redux-flow.png" class="h-40 mx-auto" />

<div class="ns-c-tight">

1.  **Store**: Un obiect gigant care deține întreaga stare a aplicației.
2.  **Action**: Un obiect care descrie ce s-a întâmplat (ex: `{ type: 'INCREMENT' }`).
3.  **Dispatch**: Funcția care trimite o acțiune către Store.
4.  **Reducer**: O funcție pură care primește starea curentă și o acțiune, și returnează noua stare.

</div>

---
layout: image
image: /10-global-state/redux-example.gif
backgroundSize: contain
---

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Redux Toolkit (RTK): Abordarea Modernă

:: content ::

Folosirea Redux "vanilla" (simplu) necesita mult cod repetitiv ("boilerplate"). **Redux Toolkit (RTK)** este acum standardul oficial și recomandat, deoarece simplifică drastic procesul.

**De ce RTK?**
<div class="ns-c-tight">

- **Mai Puțin Cod**: Reduce semnificativ codul necesar pentru a configura store-ul și a defini reducerii.
- **Bune Practici Integrate**: Include unelte precum `Immer` pentru a permite scrierea de logică de actualizare "mutabilă" (care este transformată în imutabilă în spate) și `Redux Thunk` pentru gestionarea logicii asincrone.
- **Eficiență**: Simplifică cele mai comune cazuri de utilizare.

</div>

**Concepte Cheie RTK:**
<div class="ns-c-tight">

- **`configureStore`**: Înlocuiește funcția `createStore` din Redux-ul clasic. Configurează store-ul cu setări implicite optimizate (inclusiv uneltele de dev-uri).
- **`createSlice`**: O funcție puternică ce acceptă un nume, o stare inițială și un obiect cu funcții `reducer`. Generează automat **creatorii de acțiuni** și **tipurile de acțiuni** pe baza numelor reducerilor, eliminând cea mai mare parte a codului repetitiv.

</div>
---
layout: cover
---

<script setup>
const code = `
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { View, Text, Button, StyleSheet, SafeAreaView } from 'react-native';

// 1. Creăm un "slice" al stării
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  // Reducerii definesc cum se modifică starea
  reducers: {
    increment: state => {
      // RTK folosește Immer, deci putem "muta" starea direct
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
  },
});

// Extragem acțiunile generate automat
export const { increment, decrement } = counterSlice.actions;

// 2. Configurăm Store-ul
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

// Componenta care afișează și modifică starea
function CounterComponent() {
  // useSelector citește date din store
  const count = useSelector((state) => state.counter.value);
  // useDispatch trimite acțiuni
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Contor (Redux): {count}</Text>
      <View style={styles.controls}>
        <Button title="+ Incrementează" onPress={() => dispatch(increment())} />
        <Button title="- Decrementează" onPress={() => dispatch(decrement())} />
      </View>
    </View>
  );
}

export default function App() {
  return (
    // 3. Furnizăm store-ul întregii aplicații
    <Provider store={store}>
      <SafeAreaView style={{flex: 1}}>
        <CounterComponent />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 24, fontWeight: 'bold' },
  controls: { flexDirection: 'row', marginTop: 20, gap: 10 },
});
`
const dependencies = '@reduxjs/toolkit,react-redux'
</script>

<ExpoPreview :code="code" :dependencies="dependencies" name="Exemplu Redux Toolkit" />

---
transition: slide-left
layout: cover
color: indigo-light
---

## Alternative Moderne

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Alte Alternative Populare

:: content ::

Deși Redux este o soluție robustă și matură, ecosistemul React oferă și alte librării de state management, fiecare cu filosofia și avantajele sale.

<div class="grid grid-cols-3 gap-6 mt-8">
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-bg-color)] p-5 rounded-lg text-center">
    <h3 class="text-lg font-bold text-[var(--neversink-text-color)]">Zustand</h3>
    <div class="text-sm mt-2">
    
O soluție **minimalistă**, rapidă și scalabilă. Este cunoscută pentru simplitatea sa și lipsa aproape totală de boilerplate. Starea este deținută într-un hook React, făcând integrarea extrem de simplă.

</div>
  </div>
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-bg-color)] p-5 rounded-lg text-center">
    <h3 class="text-lg font-bold text-[var(--neversink-text-color)]">MobX</h3>
    <div class="text-sm mt-2">

Folosește o paradigmă numită **Programare Reactivă Funcțională Transparentă (TFRP)**. Permite definirea stării ca fiind "observabilă", iar componentele care o folosesc se actualizează automat la modificări, fără a necesita `dispatch`-uri explicite.

</div>
  </div>
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-bg-color)] p-5 rounded-lg text-center">
    <h3 class="text-lg font-bold text-[var(--neversink-text-color)]">Recoil</h3>
    <div class="text-sm mt-2">

O librărie experimentală de la Facebook, care oferă o abordare mai "React-ish". Introduce concepte precum **atomi** (unități de stare) și **selectori** (funcții pure care derivă date din atomi), permițând o gestionare mai granulară și performantă a stării.

</div>
  </div>
</div>


---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Zustand: Simplu și Rapid

:: content ::

**Zustand** este o librărie de management al stării mică și rapidă, care se remarcă prin simplitate. Nu necesită un `Provider` pentru a înfășura aplicația și folosește hook-uri pentru a accesa și modifica starea.

**Cum funcționează?**
<div class="ns-c-tight">

- **`create`**: O singură funcție pentru a crea un "store". Aceasta primește o funcție care returnează obiectul de stare și acțiunile care îl modifică.
- **Hook-ul generat**: Funcția `create` returnează un hook personalizat (ex: `useCounterStore`) care poate fi apelat în orice componentă pentru a accesa starea (`count`) și acțiunile (`increment`).

</div>

<AdmonitionType type="info">

Zustand este ideal pentru proiecte unde Redux pare prea complex, dar Context API este insuficient. Oferă o experiență de dezvoltare foarte plăcută și un boilerplate minim.

</AdmonitionType>

---
layout: cover
---

<script setup>
const code = `
import { create } from 'zustand';
import { View, Text, Button, StyleSheet, SafeAreaView } from 'react-native';

// 1. Creăm store-ul cu starea și acțiunile sale
const useCounterStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

function CounterComponent() {
  // 2. Apelăm hook-ul în componentă pentru a accesa starea și acțiunile
  const { count, increment, decrement } = useCounterStore();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Contor (Zustand): {count}</Text>
      <View style={styles.controls}>
        <Button title="+ Incrementează" onPress={increment} />
        <Button title="- Decrementează" onPress={decrement} />
      </View>
    </View>
  );
}

export default function App() {
  // Nu este nevoie de Provider!
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CounterComponent />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 24, fontWeight: 'bold' },
  controls: { flexDirection: 'row', marginTop: 20, gap: 10 },
});
`
const dependencies = 'zustand'
</script>

<ExpoPreview :code="code" :dependencies="dependencies" name="Exemplu Zustand" />

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# MobX: Stare Reactivă

:: content ::

**MobX** abordează managementul stării dintr-o perspectivă diferită: reactivitatea automată. În loc să trimiți acțiuni pentru a actualiza starea, modifici direct starea, iar MobX se asigură că toate componentele care o folosesc se re-randează automat.

**Concepte Cheie:**
<div class="ns-c-tight">

- **`observable`**: Marchează o parte a stării (o proprietate, un obiect) ca fiind "observabilă".
- **`action`**: Marchează o funcție care modifică starea observabilă.
- **`observer`**: O funcție de ordin superior care înfășoară o componentă React și o face să "reacționeze" la schimbările din starea observabilă pe care o utilizează.

</div>

<AdmonitionType type="warning">

MobX necesită o configurare minimă a Babel pentru a suporta decoratorii (o sintaxă alternativă), dar se poate folosi și fără, cu funcția `makeObservable`.

</AdmonitionType>

---
layout: cover
---

<script setup>
const code = `
import { makeObservable, observable, action } from 'mobx';
import { observer } from 'mobx-react-lite';
import { View, Text, Button, StyleSheet, SafeAreaView } from 'react-native';

// 1. Creăm clasa store-ului
class CounterStore {
  count = 0;

  constructor() {
    // Facem proprietățile și metodele reactive
    makeObservable(this, {
      count: observable,
      increment: action,
      decrement: action,
    });
  }

  increment() {
    this.count += 1;
  }

  decrement() {
    this.count -= 1;
  }
}

// Creăm o singură instanță a store-ului
const counterStore = new CounterStore();

// 2. Înfășurăm componenta cu 'observer'
const CounterComponent = observer(() => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Contor (MobX): {counterStore.count}</Text>
      <View style={styles.controls}>
        <Button title="+ Incrementează" onPress={() => counterStore.increment()} />
        <Button title="- Decrementează" onPress={() => counterStore.decrement()} />
      </View>
    </View>
  );
});

export default function App() {
  // Nu este nevoie de Provider pentru cazuri simple
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CounterComponent />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 24, fontWeight: 'bold' },
  controls: { flexDirection: 'row', marginTop: 20, gap: 10 },
});
`
const dependencies = 'mobx,mobx-react-lite'
</script>

<ExpoPreview :code="code" :dependencies="dependencies" name="Exemplu MobX" />

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Recoil: O Abordare "React-ish"

:: content ::

**Recoil** este o librărie de la Facebook care se integrează foarte natural cu modul de gândire din React. În loc de un singur store monolitic, Recoil gestionează starea printr-un graf de unități atomice.

**Concepte Cheie:**
<div class="ns-c-tight">

- **`atom`**: O unitate de stare. Un atom poate fi citit și actualizat din orice componentă. Componentele care citesc un atom se vor re-randa automat la modificarea acestuia.
- **`selector`**: O funcție pură care acceptă atomi (sau alți selectori) ca intrare. Valoarea sa este re-evaluată automat când starea de intrare se schimbă. Selectorii sunt folosiți pentru a calcula date derivate, eliminând starea redundantă.
- **`RecoilRoot`**: Similar cu un `Provider`, trebuie să înfășoare rădăcina aplicației.
- **`useRecoilState`, `useRecoilValue`**: Hook-uri pentru a interacționa cu atomii și selectorii, cu o sintaxă similară cu `useState`.

</div>

---
layout: cover
---

<script setup>
const code = `
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { View, Text, Button, StyleSheet, SafeAreaView } from 'react-native';

// 1. Definim un 'atom' - unitatea de stare
const counterState = atom({
  key: 'counterState',
  default: 0,
});

// 2. Definim un 'selector' - o valoare derivată
const doubledCounterState = selector({
  key: 'doubledCounterState',
  get: ({ get }) => {
    const count = get(counterState);
    return count * 2;
  },
});

function CounterComponent() {
  const [count, setCount] = useRecoilState(counterState);
  const doubledCount = useRecoilValue(doubledCounterState);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Contor (Recoil): {count}</Text>
      <Text style={styles.derivedText}>Valoare Dublată: {doubledCount}</Text>
      <View style={styles.controls}>
        <Button title="+ Incrementează" onPress={() => setCount(c => c + 1)} />
        <Button title="- Decrementează" onPress={() => setCount(c => c - 1)} />
      </View>
    </View>
  );
}

export default function App() {
  return (
    // 3. Înfășurăm aplicația în RecoilRoot
    <RecoilRoot>
      <SafeAreaView style={{ flex: 1 }}>
        <CounterComponent />
      </SafeAreaView>
    </RecoilRoot>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 24, fontWeight: 'bold' },
  derivedText: { fontSize: 18, color: 'gray', marginTop: 10 },
  controls: { flexDirection: 'row', marginTop: 20, gap: 10 },
});
`
const dependencies = 'recoil'
</script>

<ExpoPreview :code="code" :dependencies="dependencies" name="Exemplu Recoil" />