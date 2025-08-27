---
transition: slide-left
layout: cover
color: indigo-light
---

### Performanță, Optimizări și Memoizare în React Native

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# De ce contează performanța?

:: content ::

Performanța nu este un lux, ci o cerință fundamentală. O aplicație lentă sau care nu răspunde la comenzi este una dintre principalele cauze ale frustrării utilizatorilor și, în final, ale dezinstalării.

**Impactul unei performanțe slabe:**

<div class="grid grid-cols-3 gap-4 mt-8">
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-bg-color)] p-4 rounded-lg text-center">
    <h3 class="text-lg font-bold text-[var(--neversink-text-color)]">Pierderea Cadrelor (Dropped Frames)</h3>
    <p class="text-sm">Animațiile și tranzițiile sacadate ("janky") creează o senzație de neprofesionalism și fac aplicația să pară defectă. Scopul este de a menține constant 60 de cadre pe secundă (FPS).</p>
  </div>
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-bg-color)] p-4 rounded-lg text-center">
    <h3 class="text-lg font-bold text-[var(--neversink-text-color)]">Pornire Lentă (Slow Startup)</h3>
    <p class="text-sm">Utilizatorii moderni au o răbdare limitată. Un timp de încărcare inițial lung poate determina un utilizator să abandoneze aplicația înainte de a o folosi efectiv.</p>
  </div>
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-bg-color)] p-4 rounded-lg text-center">
    <h3 class="text-lg font-bold text-[var(--neversink-text-color)]">Consum Ridicat de Resurse</h3>
    <p class="text-sm">O aplicație care consumă excesiv bateria sau memoria dispozitivului va fi rapid identificată și eliminată de utilizatori, mai ales pe dispozitivele mai vechi.</p>
  </div>
</div>

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Măsurare și Profilare

:: content ::

Optimizarea începe cu măsurarea. Nu poți îmbunătăți ceea ce nu poți măsura. Ecosistemul React Native oferă mai multe unelte pentru a identifica blocajele de performanță.

<div class="ns-c-tight">

- **Performance Monitor-ul Integrat**: O unealtă simplă, direct în meniul de dezvoltare al aplicației. Afișează în timp real FPS-urile pentru firul de UI și cel de JavaScript (JS). Dacă FPS-ul JS scade constant sub 60, înseamnă că logica ta JavaScript este prea complexă și blochează firul de execuție.

- **Flipper**: O platformă de debugging puternică și extensibilă pentru iOS, Android și React Native. Oferă unelte pentru a inspecta layout-ul, rețeaua, crash reports și, cel mai important, un **React Profiler** pentru a vizualiza re-randările componentelor.

- **React Profiler (în Flipper sau React DevTools)**: Această unealtă este esențială pentru a identifica **re-randările inutile**. Ea îți permite să înregistrezi o interacțiune și să vezi exact ce componente s-au re-randat, de ce s-au re-randat și cât timp a durat.

</div>

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Hook-uri de Memoizare

:: content ::

React este foarte rapid, dar re-randările inutile pot încetini orice aplicație. O re-randare a unei componente părinte va duce, implicit, la re-randarea tuturor componentelor copil. Memoizarea este procesul de a salva rezultatul unei operațiuni costisitoare și de a returna rezultatul salvat (din cache) atunci când aceleași intrări sunt folosite din nou.

React oferă trei unelte principale pentru a preveni re-randările inutile:

<div class="grid grid-cols-3 gap-6 mt-8">
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-bg-color)] p-5 rounded-lg text-center">
    <h3 class="text-lg font-bold text-[var(--neversink-text-color)]">
    
`React.memo`

</h3>
    <p class="text-sm mt-2">O funcție de ordin superior (HOC) care învelește o componentă. Aceasta va preveni re-randarea componentei dacă `props`-urile sale nu s-au schimbat.</p>
  </div>
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-bg-color)] p-5 rounded-lg text-center">
    <h3 class="text-lg font-bold text-[var(--neversink-text-color)]">
    
`useCallback`

</h3>
    <p class="text-sm mt-2">Un hook care memoizează o funcție. Util pentru a pasa funcții stabile către componentele copil memoizate, prevenind re-randarea lor.</p>
  </div>
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-bg-color)] p-5 rounded-lg text-center">
    <h3 class="text-lg font-bold text-[var(--neversink-text-color)]">
    
`useMemo`

</h3>
    <p class="text-sm mt-2">Un hook care memoizează rezultatul unei funcții (o valoare). Util pentru a evita recalcularea unor valori costisitoare la fiecare randare.</p>
  </div>
</div>

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# `React.memo`

:: content ::

`React.memo` este cea mai simplă formă de optimizare. Învelește o componentă funcțională și îi spune lui React: "Nu re-randa această componentă dacă `props`-urile pe care le primește sunt identice cu cele de la randarea anterioară."

React face o comparație superficială (`shallow comparison`) a obiectului de `props`.

**Când să-l folosim?**
<div class="ns-c-tight">

- Când avem o componentă pură (aceleași `props` produc același UI).
- Când componenta este randată des cu aceleași `props`.
- Când componenta are un cost de randare mediu spre ridicat.

</div>

<AdmonitionType type="warning">

Nu înveliți orice componentă în `React.memo`. Costul comparației `props`-urilor poate fi uneori mai mare decât costul re-randării, în special pentru componente foarte simple.

</AdmonitionType>

---
layout: cover
---

<script setup>
const code = `
import { useState, memo } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';

// Componenta copil care primește un prop 'user'
const UserProfile = memo(({ user }) => {
  console.log(\`Se randează UserProfile pentru: \${user.name}\`);
  return (
    <View style={styles.profile}>
      <Text>Nume: {user.name}</Text>
    </View>
  );
});

export default function MemoExample() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // Acest obiect este recreat la fiecare randare, ceea ce va face ca
  // React.memo să nu funcționeze dacă nu folosim useMemo!
  // Pentru acest exemplu, îl lăsăm așa pentru a vedea problema.
  const user = { name: 'Ana' };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Contor părinte: {count}</Text>
      <Button title="Incrementează Contor" onPress={() => setCount(c => c + 1)} />
      
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Schimbă textul pentru a re-randa părintele"
      />
      
      <Text style={styles.info}>
        Observați consola. 'UserProfile' se re-randează de fiecare dată când contorul sau textul se schimbă, deși prop-ul 'user' este mereu același.
      </Text>
      <UserProfile user={user} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20 
  },
  text: { fontSize: 20, marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    width: '80%25',
    padding: 8,
    marginVertical: 15
  },
  profile: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#e0e7ff',
    borderRadius: 8
  },
  info: {
      textAlign: 'center',
      color: 'gray',
      fontSize: 12
  }
});
`
</script>

<ExpoPreview :code="code" name="Exemplu React.memo" />

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# `useCallback`

:: content ::

O problemă comună apare când pasăm funcții ca `props` către componente memoizate. Deoarece funcțiile sunt recreate la fiecare randare a componentei părinte, referința lor se schimbă, iar `React.memo` consideră că `props`-urile sunt diferite, ducând la o re-randare inutilă.

**`useCallback(fn, dependencies)`** rezolvă asta. Returnează o versiune memoizată a funcției `fn`, care se schimbă doar dacă una dintre `dependențe` se modifică.

**Când să-l folosim?**
<div class="ns-c-tight">

- Când pasăm funcții ca `props` către componente copil optimizate cu `React.memo`.
- Când o funcție este o dependență într-un alt hook (ex: `useEffect`).

</div>

---
layout: cover
---

<script setup>
const code = `
import { useState, useCallback, memo } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

// Componenta copil este acum memoizată și primește o funcție
const ChildComponent = memo(({ onIncrement }) => {
  console.log('Se randează componenta copil...');
  return <Button title="Incrementează din copil" onPress={onIncrement} />;
});

export default function UseCallbackExample() {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);

  // Fără useCallback, această funcție ar fi recreată la fiecare randare
  // a părintelui, cauzând re-randarea copilului.
  const handleIncrement = useCallback(() => {
    setCount(c => c + 1);
  }, []); // Array-ul de dependențe este gol, deci funcția nu se va schimba niciodată.

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Contor: {count}</Text>
      <Text style={styles.text}>Altă Stare: {otherState}</Text>
      <Button title="Schimbă Altă Stare (forțează re-randare părinte)" onPress={() => setOtherState(s => s + 1)} />

      <Text style={styles.info}>
        Datorită useCallback, componenta copil NU se va re-randa când se schimbă "Altă Stare".
      </Text>
      <ChildComponent onIncrement={handleIncrement} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 15
  },
  text: { fontSize: 20 },
  info: { textAlign: 'center', color: 'gray', fontSize: 12 }
});
`
</script>

<ExpoPreview :code="code" name="Exemplu useCallback" />

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# `useMemo`

:: content ::

`useMemo` este similar cu `useCallback`, dar în loc să memoizeze o funcție, el **memoizează rezultatul** unei funcții. Este util pentru a evita recalcularea unor valori costisitoare la fiecare randare.

**`useMemo(createFn, dependencies)`** va rula funcția `createFn` și va memoiza valoarea returnată. Va re-calcula această valoare doar dacă una dintre `dependențe` se schimbă.

**Când să-l folosim?**
<div class="ns-c-tight">

- Când avem calcule complexe (ex: filtrarea sau sortarea unui array mare) care nu trebuie refăcute la fiecare randare.
- Când pasăm obiecte sau array-uri ca `props` către componente memoizate. Crearea unui obiect nou la fiecare randare (`{ a: 1 } !== { a: 1 }`) ar invalida memoizarea.

</div>

---
layout: cover
---

<script setup>
const code = `
import { useState, useMemo } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

// O funcție "costisitoare"
const expensiveCalculation = (num) => {
  console.log('Se execută calculul costisitor...');
  // Simulam o operațiune lentă
  for (let i = 0; i < 100000000; i++) {}
  return num * 2;
};

export default function UseMemoExample() {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState('light');

  // Fără useMemo, acest calcul ar rula la fiecare re-randare,
  // chiar și la schimbarea temei, încetinind aplicația.
  const calculatedValue = useMemo(() => {
    return expensiveCalculation(count);
  }, [count]); // Recalculează doar când 'count' se schimbă

  const isDark = theme === 'dark';

  return (
    <View style={[styles.container, isDark && styles.darkContainer]}>
      <Text style={[styles.text, isDark && styles.darkText]}>Contor: {count}</Text>
      <Text style={[styles.text, isDark && styles.darkText]}>Valoare Calculată: {calculatedValue}</Text>
      <Button title="Incrementează Contor" onPress={() => setCount(c => c + 1)} />
      <Button title="Schimbă Tema" onPress={() => setTheme(t => t === 'light' ? 'dark' : 'light')} />
       <Text style={[styles.info, isDark && styles.darkText]}>
        Observați consola. Calculul costisitor se execută doar la incrementare, nu și la schimbarea temei.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15
  },
  darkContainer: {
      backgroundColor: '#333'
  },
  text: { fontSize: 20 },
  darkText: { color: 'white'},
  info: { textAlign: 'center', color: 'gray', fontSize: 12, paddingHorizontal: 20 }
});
`
</script>

<ExpoPreview :code="code" name="Exemplu useMemo" />

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Optimizarea Listelor

:: content ::

Componenta `FlatList` este deja optimizată prin virtualizare, dar putem îmbunătăți și mai mult performanța, în special pentru liste foarte lungi.

**Bune Practici pentru `FlatList`:**

<div class="ns-c-tight">

- **`keyExtractor`**: Furnizați o funcție care returnează o cheie unică (string) pentru fiecare element. Acest lucru ajută React să identifice elementele și să evite re-randarea întregii liste la o modificare.
  `keyExtractor={item => item.id}`

- **`getItemLayout`**: Dacă elementele listei au o înălțime fixă, furnizarea acestei funcții permite `FlatList`-ului să calculeze direct poziția oricărui element, fără a mai randa elementele intermediare. Acest lucru face derularea la un anumit index (`scrollToIndex`) instantanee.
  `getItemLayout={(data, index) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index })}`

- **Componente Memoizate**: Înveliți componenta `renderItem` în `React.memo` pentru a preveni re-randarea elementelor care nu s-au schimbat.

- **Evitați Funcțiile Inline**: Pasați funcții definite (sau memoizate cu `useCallback`) la `props` precum `onPress`, nu funcții săgeată inline.

</div>

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# FlashList: O Alternativă Performantă

:: content ::

**FlashList**, creată de Shopify, este o alternativă directă la `FlatList`, concepută pentru a oferi performanțe superioare pe orice dispozitiv.

**Cum funcționează?**
Principala sa inovație este **reciclarea componentelor**. În loc să distrugă și să recreeze componentele care ies din ecran (ca `FlatList`), FlashList le refolosește, schimbând doar datele pe care le afișează. Acest lucru reduce dramatic încărcarea pe "garbage collector"-ul JavaScript și previne căderile de cadre.

**Când să folosim FlashList?**
- Pentru orice listă unde performanța este critică.
- Este în special eficientă pe dispozitive Android mai vechi.

---
layout: center
---

**Instalare:** `npx expo install @shopify/flash-list`

API-ul este aproape identic cu `FlatList`, făcând migrarea foarte ușoară. Singura cerință suplimentară este `estimatedItemSize`.

```js
import { FlashList } from "@shopify/flash-list";

<FlashList
  data={DATA}
  renderItem={({ item }) => <Text>{item.title}</Text>}
  estimatedItemSize={100} // Necesar pentru performanță
/>

```

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Motorul JavaScript Hermes

:: content ::

**Hermes** este un motor JavaScript open-source, creat de Meta, optimizat special pentru a rula aplicații React Native. Începând cu React Native 0.70, Hermes este motorul implicit pentru toate proiectele noi, și pe bună dreptate.

Spre deosebire de motoarele tradiționale (precum V8), Hermes este proiectat cu focus pe performanța mobilă.

**Avantajele Cheie ale Hermes:**

<div class="ns-c-tight">

- **Timp de Pornire Îmbunătățit (Startup Time)**: Hermes optimizează codul JavaScript în timpul compilării aplicației (build time), nu în timpul execuției (runtime). Generează un bytecode optimizat, ceea ce reduce semnificativ timpul necesar pentru ca aplicația să se încarce inițial.

- **Consum Redus de Memorie**: A fost proiectat pentru a fi eficient din punct de vedere al memoriei, un factor critic pe dispozitivele mobile, în special cele cu resurse limitate.

- **Dimensiune Redusă a Aplicației**: Dimensiunea motorului Hermes este mai mică, contribuind la o dimensiune totală mai redusă a fișierului `.apk` sau `.ipa`.

</div>

<AdmonitionType type="tip">

Activarea Hermes este una dintre cele mai simple și mai impactante optimizări de performanță pe care le puteți face. Pentru proiectele existente, urmați ghidul oficial de migrare.

</AdmonitionType>

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Profilarea în Acțiune cu Flipper

:: content ::

**React Profiler** din Flipper este unealta vizuală care te ajută să răspunzi la întrebarea: "**De ce s-a re-randat această componentă?**".

După ce înregistrezi o interacțiune, Profiler-ul generează un **"flamegraph"**. Fiecare bară din grafic reprezintă o componentă care s-a randat în timpul înregistrării.

**Cum să interpretezi graficul:**

<div class="ns-c-tight">

- **Lățimea barei**: Indică cât timp a durat randarea acelei componente și a copiilor săi. Barele late sunt primele pe care trebuie să le investighezi.
- **Culoarea barei**: Barele mai calde (galben, portocaliu) indică un timp de randare mai lung. Barele gri indică componente care nu s-au re-randat.
- **Inspectarea unei componente**: Dând click pe o bară, panoul din dreapta îți va arăta exact ce `props` sau ce `hook` a cauzat re-randarea. Aceasta este informația crucială pentru a decide dacă să aplici `React.memo`, `useCallback` sau `useMemo`.

</div>

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Exemplu Complet de Optimizare a Listei

:: content ::

Să combinăm mai multe tehnici pentru a optimiza o `FlatList`. Vom folosi `React.memo` pentru elemente, `useCallback` pentru funcțiile pasate ca `props` și `getItemLayout` pentru o derulare fluidă.

<div class="ns-c-tight">

1.  **`ListItem`** este învelit în `React.memo`. Se va re-randa doar dacă `item` sau `onPress` se schimbă.
2.  **`onItemPress`** este memoizată cu `useCallback`. Referința sa nu se va schimba la re-randarea componentei părinte, deci `ListItem` nu se va re-randa inutil.
3.  **`getItemLayout`** este furnizată, deoarece toate elementele noastre au o înălțime fixă de `50`. Acest lucru elimină calculele de layout în timpul derulării.

</div>
Această combinație previne re-randările inutile și asigură cea mai fluidă experiență de derulare posibilă.

---
layout: cover
---

<script setup>
const code = `
import { useState, useCallback, memo } from 'react';
import { SafeAreaView, FlatList, StyleSheet, Text, Pressable, Alert, View } from 'react-native';

const ITEM_HEIGHT = 50;

const createData = (count) => Array.from({ length: count }, (_, i) => ({
  id: \`\${i}\`,
  text: \`Element \${i + 1}\`,
}));

// 1. Elementul listei este memoizat
const ListItem = memo(({ item, onPress }) => {
  console.log(\`Randare element: \${item.text}\`);
  return (
    <Pressable onPress={() => onPress(item.id)} style={styles.item}>
      <Text>{item.text}</Text>
    </Pressable>
  );
});

export default function OptimizedList() {
  const [data, setData] = useState(createData(50));
  const [counter, setCounter] = useState(0);

  // 2. Funcția de apăsare este memoizată
  const onItemPress = useCallback((id) => {
    Alert.alert('Apăsat', \`Ai apăsat elementul cu ID-ul: \${id}\`);
  }, []);

  // 3. Funcția pentru layout-ul elementelor
  const getItemLayout = useCallback((data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  }), []);

  const renderItem = useCallback(({ item }) => (
    <ListItem item={item} onPress={onItemPress} />
  ), [onItemPress]);


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text>Contor Părinte: {counter}</Text>
        <Button title="Incrementează" onPress={() => setCounter(c => c + 1)} />
        <Text style={styles.info}>Când contorul se schimbă, elementele NU se re-randează.</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        getItemLayout={getItemLayout}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1 
  },
  header: { 
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc'
  },
  info: {
      fontSize: 10,
      color: 'gray'
  },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
`
</script>

<ExpoPreview :code="code" name="Exemplu Listă Optimizată" />

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Performanța Animațiilor: `useNativeDriver`

:: content ::

Cea mai importantă optimizare pentru API-ul `Animated` este utilizarea driver-ului nativ. Prin setarea `useNativeDriver: true`, delegăm întreaga logică a animației către firul de execuție al interfeței (UI Thread).

**Cum funcționează?**

<div class="grid grid-cols-2 gap-8 mt-8 text-center">
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-admon-bg-color)] p-6 rounded-lg border border-[var(--neversink-admon-border-color)]">
    <h3 class="text-xl font-bold text-[var(--neversink-text-color)]">❌ `useNativeDriver: false`</h3>
    <p class="mt-4">
    
La fiecare cadru al animației, firul JS calculează noua valoare, o serializează și o trimite prin bridge către firul de UI. Dacă firul JS este ocupat, animația va sacada.

</p>
  </div>
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-admon-bg-color)] p-6 rounded-lg border border-[var(--neversink-admon-border-color)]">
    <h3 class="text-xl font-bold text-[var(--neversink-text-color)]">✅ `useNativeDriver: true`</h3>
    <p class="mt-4">
    
Configurația animației este trimisă o singură dată prin bridge. Apoi, firul de UI se ocupă de executarea animației de la început până la sfârșit, fără nicio altă comunicare cu JS. Animația va fi fluidă, chiar dacă firul JS este blocat.

</p>
  </div>
</div>

---
layout: center
---

<AdmonitionType type="warning">

# Driver-ul nativ poate anima doar proprietăți non-layout: `transform` (translateX, scale, rotate) și `opacity`. Nu poate anima `width`, `height`, `backgroundColor`, etc. Pentru acestea, folosiți **React Native Reanimated**.

</AdmonitionType>

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Calcule Grele: Descărcarea pe Firul Nativ

:: content ::

Firul de execuție JavaScript este "inima" aplicației tale React Native, dar este și unicul. Orice operațiune CPU-intensivă blocat pe acest fir va îngheța întreaga interfață.

**Exemple de calcule grele:**
<div class="ns-c-tight">

- Procesarea complexă a datelor (ex: filtrarea, sortarea sau maparea unor seturi de date foarte mari).
- Criptarea sau decriptarea datelor.
- Procesarea de imagini sau audio direct în JS.
- Orice algoritm complex care necesită mult timp de calcul.

</div>

**Soluția: Module Native**

Pentru astfel de sarcini, soluția supremă de performanță este să muți logica de pe firul JS pe un fir de execuție din fundal, pe partea nativă.

<div class="ns-c-tight">

- **Ce este un Modul Nativ?**: O bucată de cod scrisă în limbajul nativ al platformei (Java/Kotlin pentru Android, Swift/Objective-C pentru iOS) care poate fi apelată din JavaScript.
- **Cum funcționează?**: Pasați datele către modulul nativ, acesta execută calculul pe un fir de execuție separat, și returnează rezultatul înapoi în JavaScript printr-un `Promise` sau un `callback`.
- **Rezultatul**: Firul JS rămâne liber, iar interfața aplicației rămâne perfect responsivă pe durata calculului.

</div>

<AdmonitionType type="info">

Crearea modulelor native este un subiect avansat, dar este unealta esențială atunci când optimizările la nivel de JS nu mai sunt suficiente.

</AdmonitionType>