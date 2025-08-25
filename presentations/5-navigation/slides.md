---
transition: slide-left
layout: cover
color: indigo-light
---

# Navigarea în React Native
React Navigation & Expo Router

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Fundamentele Navigării

:: content ::

<style>
.module-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
  margin-top: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: var(--neversink-fg-color);
}
.module-card {
  background-color: var(--neversink-admon-bg-color);
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  border: 1px solid var(--neversink-admon-border-color);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.module-icon {
  font-size: 3em;
  margin-bottom: 15px;
  color: var(--neversink-fg-code-color);
}
.module-title {
  font-size: 1.3em;
  font-weight: 600;
  margin-bottom: 10px;
  color: var(--neversink-highlight-color);
}
.module-description {
  font-size: 1.0em;
  opacity: 0.9;
  color: var(--neversink-admon-text-color);
  flex-grow: 1;
}
</style>

<div class="module-container neversink-indigo-light-scheme">
  <div class="module-card">
    <p class="module-title">Ce este Navigarea?</p>
    <p class="module-description">Călătoria utilizatorului prin aplicație. Structura care permite trecerea de la un ecran la altul, gestionând starea și istoricul interacțiunilor.</p>
  </div>
  <div class="module-card">
    <p class="module-title">Concepte Cheie</p>
    <p class="module-description">Ecrane (Screens), Rute (Routes) și Stiva de Navigare (Navigation Stack). Acestea sunt blocurile de construcție fundamentale.</p>
  </div>
  <div class="module-card">
    <p class="module-title">O Problemă Rezolvată</p>
    <p class="module-description">Datorită unor librării mature precum React Navigation și Expo Router, implementarea navigării a devenit un proces standardizat și robust.</p>
  </div>
</div>

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Stiva de Navigare (Navigation Stack)

:: content ::

Stiva este structura de date fundamentală care gestionează istoricul ecranelor. Gândiți-vă la ea ca la un pachet de cărți de joc.

<div class="ns-c-tight">

- **Push**: Când navigați la un ecran nou, acesta este "împins" (`push`) în vârful stivei. Utilizatorul vede acum noul ecran.
- **Pop**: Când apăsați butonul "înapoi", ecranul curent este "scos" (`pop`) din stivă, dezvăluind ecranul de dedesubt.

</div>

<style>
.stack-container {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  margin-top: 2rem;
  height: 250px;
  perspective: 1000px;
}
.stack-item {
  background-color: var(--neversink-bg-code-color);
  border: 2px solid var(--neversink-border-color);
  border-radius: 10px;
  width: 150px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2em;
  font-weight: bold;
  color: var(--neversink-fg-code-color);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  position: absolute;
  transition: transform 0.5s ease-in-out, opacity 0.5s;
}
</style>

<div class="stack-container neversink-indigo-light-scheme">
  <div class="stack-item" style="transform: translate(-120px, 0px) rotateY(15deg) translateZ(-80px); opacity: 0.7;">Acasă</div>
  <div class="stack-item" style="transform: translate(0px, -20px) rotateY(5deg) translateZ(-40px); opacity: 0.9;">Profil</div>
  <div class="stack-item" style="transform: translate(120px, -40px) translateZ(0px);">Setări</div>
</div>

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Cele Două Filosofii

:: content ::

În ecosistemul React Native, navigarea este dominată de două abordări principale, ambele construite pe aceeași fundație solidă (React Navigation), dar cu filosofii diferite.

<div class="grid grid-cols-2 gap-8 mt-8 text-center">
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-admon-bg-color)] p-6 rounded-lg border border-[var(--neversink-admon-border-color)]">
    <h3 class="text-xl font-bold text-[var(--neversink-text-color)]">Navigare Declarativă</h3>
    <p class="mt-2 text-sm font-semibold">(React Navigation)</p>
    <p class="mt-4">Definiți explicit structura de navigare a aplicației în codul JavaScript. Creați navigatori (Stack, Tabs) și îi compuneți pentru a forma arborele de navigare.</p>
    <p class="mt-4 text-sm"><strong>Avantaj:</strong> Control granular și flexibilitate maximă pentru scenarii complexe.</p>
  </div>
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-admon-bg-color)] p-6 rounded-lg border border-[var(--neversink-admon-border-color)]">
    <h3 class="text-xl font-bold text-[var(--neversink-text-color)]">Navigare Bazată pe Convenții</h3>
    <p class="mt-2 text-sm font-semibold">(Expo Router)</p>
    <p class="mt-4">
    Structura de fișiere și foldere din directorul `app/` definește automat rutele aplicației. O abordare "convention over configuration".
    </p>
    <p class="mt-4 text-sm"><strong>Avantaj:</strong> Viteză de dezvoltare, organizare intuitivă și suport excelent pentru aplicații universale (iOS, Android, Web).</p>
  </div>
</div>


---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Inițierea cu React Navigation

:: content ::

Pentru a începe, trebuie să instalăm pachetul de bază și câteva dependențe esențiale care fac legătura cu elementele native ale platformei.

1.  **Instalare Pachet Principal**:
    ```bash
    npm install @react-navigation/native
    ```

2.  **Instalare Dependențe**:
    ```bash
    npx expo install react-native-screens react-native-safe-area-context
    ```

<AdmonitionType type="info">

Folosirea `npx expo install` în locul `npm install` asigură instalarea unor versiuni ale pachetelor care sunt compatibile cu versiunea de Expo SDK a proiectului dumneavoastră.

</AdmonitionType>

3.  **NavigationContainer**: Orice structură de navigare trebuie imbricată în componenta `NavigationContainer`. Aceasta gestionează starea internă a navigării și leagă navigatorii de mediul aplicației.
    
---
layout: center
---

```js
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      {/* Aici vor veni navigatorii: Stack, Tabs, etc. */}
    </NavigationContainer>
  );
}
```

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Stack Navigator

:: content ::

Navigatorul de tip **Stack** (stivă) este cel mai comun. Gestionează un istoric de ecrane, unde fiecare ecran nou este plasat deasupra celui anterior.

**Caz de Utilizare**: Perfect pentru fluxuri în care utilizatorul "intră" mai adânc în aplicație, cum ar fi: `Listă Produse` -> `Detalii Produs` -> `Recenzii`.

**Instalare**:
```bash
npm install @react-navigation/native-stack
```

**Concepte**:
<div class="ns-c-tight">

- `createNativeStackNavigator`: O funcție care returnează un obiect conținând două componente: `Screen` și `Navigator`.
- `<Stack.Navigator>`: Componenta părinte care definește stiva.
- `<Stack.Screen>`: Componenta care definește un ecran individual în cadrul stivei, specificând numele rutei (`name`) și componenta de randat (`component`).

</div>

---
layout: cover
---

<script setup>
const code = `
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Ecranul Acasă</Text>
      <Button
        title="Mergi la Profil"
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
}

function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Ecranul de Profil</Text>
      <Button title="Înapoi Acasă" onPress={() => navigation.goBack()} />
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Acasă' }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profil Utilizator' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: 10 
  }
});
`
const dependencies = '@react-navigation/native,react-native-screens,react-native-safe-area-context,@react-navigation/native-stack,expo-font,@expo/vector-icons/Ionicons'
</script>

<ExpoPreview :code="code" :dependencies="dependencies" name="Exemplu Stack Navigator" />

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Bottom Tab Navigator

:: content ::

Navigatorul cu tab-uri în partea de jos este modelul principal de navigare la nivel superior pentru majoritatea aplicațiilor. Permite comutarea rapidă între secțiunile principale.

**Caz de Utilizare**: `Acasă`, `Căutare`, `Notificări`, `Profil`.

**Instalare**:
```bash
npm install @react-navigation/bottom-tabs
```

**Concepte**:
Similar cu Stack, `createBottomTabNavigator` oferă un `Navigator` și un `Screen`. Opțiunile de personalizare (`options`) permit setarea iconițelor, etichetelor și culorilor pentru fiecare tab.

---
layout: cover
---

<script setup>
const code = `
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

function HomeScreen() {
  return <View style={styles.container}><Text>Acasă!</Text></View>;
}

function SettingsScreen() {
  return <View style={styles.container}><Text>Setări!</Text></View>;
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Acasă' }}/>
        <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Setări' }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
});
`
const dependencies = '@react-navigation/native,react-native-screens,react-native-safe-area-context,@react-navigation/bottom-tabs,@expo/vector-icons,@expo/vector-icons/Ionicons,expo-font'
</script>

<ExpoPreview :code="code" :dependencies="dependencies" name="Exemplu Bottom Tabs" />

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Drawer Navigator

:: content ::

Navigatorul de tip "sertar" (Drawer) prezintă un meniu care glisează din marginea ecranului. Este util pentru aplicațiile cu multe destinații de navigare care nu ar încăpea într-o bară de tab-uri.

**Caz de Utilizare**: Existența multor categorii sau resurse, ca exemplu un client de e-mail cu foldere precum `Inbox`, `Sent`, `Drafts`, `Spam`, plus `Settings` și `Help`.

**Instalare**:
```bash
npm install @react-navigation/drawer
npx expo install react-native-gesture-handler react-native-reanimated
```
<AdmonitionType type="warning">

Navigatorul Drawer necesită `react-native-gesture-handler` și `react-native-reanimated`. Adăugați `react-native-reanimated/plugin` la `babel.config.js`.

</AdmonitionType>

---
layout: cover
---

<script setup>
const code = `
import 'react-native-gesture-handler';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Ecran Acasă</Text>
      <Button onPress={() => navigation.openDrawer()} title="Deschide Meniu" />
    </View>
  );
}

function NotificationsScreen() {
  return (
    <View style={styles.container}><Text>Ecran Notificări</Text></View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
});
`
const dependencies = '@react-navigation/native,react-native-screens,react-native-safe-area-context,@react-navigation/drawer,react-native-gesture-handler,react-native-reanimated'
</script>

<ExpoPreview :code="code" :dependencies="dependencies" name="Exemplu Drawer Navigator" />

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Material Top & Bottom Tabs

:: content ::

Acestea sunt alternative la navigatorul de tab-uri standard, care implementează specificațiile Google Material Design.

<div class="grid grid-cols-2 gap-8 mt-8 text-center">
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-admon-bg-color)] p-6 rounded-lg border border-[var(--neversink-admon-border-color)]">
    <h3 class="text-xl font-bold text-[var(--neversink-text-color)]">Material Top Tabs</h3>
    <p class="mt-4">Afișează tab-urile în partea de sus a ecranului și permite glisarea (swipe) între ele. Foarte comun în aplicațiile Android.</p>
    <p class="mt-4 font-mono text-sm bg-[var(--neversink-bg-code-color)] p-2 rounded">`@react-navigation/material-top-tabs`</p>
  </div>
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-admon-bg-color)] p-6 rounded-lg border border-[var(--neversink-admon-border-color)]">
    <h3 class="text-xl font-bold text-[var(--neversink-text-color)]">Material Bottom Tabs</h3>
    <p class="mt-4">O implementare Material Design a tab-urilor de jos, cu animații specifice (ripple effect, shifting icons) și un aspect distinct.</p>
    <p class="mt-4 font-mono text-sm bg-[var(--neversink-bg-code-color)] p-2 rounded"> `@react-navigation/material-bottom-tabs`</p>
  </div>
</div>

<AdmonitionType type="tip">

Ambele necesită dependențe suplimentare: `react-native-tab-view` pentru top tabs și `react-native-paper` pentru bottom tabs.

</AdmonitionType>

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Tehnici Esențiale de Navigare

:: content ::

<div class="ns-c-tight">

- **`navigation.navigate(numeRuta, params?)`**: Metoda principală de navigare. Dacă ecranul există deja în stivă, va merge înapoi la el. Dacă nu, îl va adăuga.
- **`navigation.push(numeRuta, params?)`**: Forțează adăugarea unui nou ecran în stivă, chiar dacă un ecran de același tip există deja. Util pentru a naviga la `DetaliiProdus` -> `DetaliiProdusSimilar`.
- **`navigation.goBack()`**: Merge înapoi cu un pas în stivă.
- **Transmiterea parametrilor**: `Maps('Detalii', { itemId: 86 })`.
- **Accesarea parametrilor**: În componenta ecran, parametrii sunt disponibili prin `route.params`. `const { itemId } = route.params;`.
- **Personalizare**: Folosiți prop-ul `options` pe `Screen` pentru a personaliza anteturi, tab-uri, etc. (ex: `options={{ title: 'Titlu Personalizat' }}`).

</div>

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Concepte Avansate

:: content ::

<div class="grid grid-cols-2 gap-8">
<div>

### Imbricarea Navigatorilor

Un model foarte comun este să avem un `TabNavigator` ca navigator principal, iar fiecare tab să conțină propriul său `StackNavigator`. Acest lucru permite utilizatorului să navigheze într-o stivă de ecrane în interiorul unui tab, fără a pierde tab-urile principale.

</div>
<div>

### Fluxul de Autentificare

O abordare modernă este redarea condiționată a navigatorilor. În fișierul principal (ex: `App.js`), verificăm dacă utilizatorul este autentificat (dintr-un `state` sau `Context`).

- **Dacă DA**: Randăm navigatorul principal al aplicației (ex: `TabNavigator`).
- **Dacă NU**: Randăm un `StackNavigator` simplu, doar cu ecranele de `Login` și `Register`.

</div>
</div>

### Hook-uri Utile

<div class="ns-c-tight">

- **`useNavigation()`**: Oferă acces la obiectul `navigation` din orice componentă, fără a fi nevoie să-l primiți prin `props`.
- **`useRoute()`**: Oferă acces la obiectul `route` (care conține `params`), util în componentele care nu sunt definite direct ca `Screen`.

</div>

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Prop-urile Esențiale: `navigation` & `route`

:: content ::

Fiecare componentă definită ca un `Screen` într-un navigator primește automat două prop-uri fundamentale care controlează și descriu starea de navigare. Înțelegerea acestora este cheia pentru a construi aplicații interactive.

<div class="grid grid-cols-2 gap-8 mt-8 text-center">
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-admon-bg-color)] p-6 rounded-lg border border-[var(--neversink-admon-border-color)]">
    <h3 class="text-xl font-bold text-[var(--neversink-text-color)]">`navigation`</h3>
    <p class="mt-4">Este <strong>acțiunea</strong>. Acest obiect conține metode pentru a declanșa evenimente de navigare, cum ar fi trecerea la un alt ecran sau întoarcerea la ecranul anterior. Este "telecomanda" ta.</p>
  </div>
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-admon-bg-color)] p-6 rounded-lg border border-[var(--neversink-admon-border-color)]">
    <h3 class="text-xl font-bold text-[var(--neversink-text-color)]">`route`</h3>
    <p class="mt-4">Este <strong>contextul</strong>. Acest obiect conține informații despre starea curentă a ecranului, cel mai important fiind parametrii (`params`) cu care a fost apelat. Este "harta" care îți spune unde ești.</p>
  </div>
</div>

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Prop-ul `navigation`

:: content ::

Acest obiect este "motorul" care permite deplasarea între ecrane. Este pasat automat oricărei componente definite în `prop`-ul `component` al unui `Screen`.

**Metode Cheie:**

<div class="ns-c-tight">

- **`navigation.navigate('NumeRuta', { params })`**: Metoda principală. Navighează la un ecran. Dacă ecranul este deja în stivă, se va întoarce la el. Dacă nu, îl adaugă.
- **`navigation.push('NumeRuta', { params })`**: Adaugă mereu un nou ecran în stivă, chiar dacă unul de același tip există deja. Util pentru ecrane care se pot apela pe ele însele (ex: `Profil Utilizator A` -> `Profil Utilizator B`).
- **`navigation.goBack()`**: Se întoarce la ecranul anterior din stivă.
- **`navigation.popToTop()`**: Golește întreaga stivă de navigare și se întoarce la primul ecran.

</div>

```js
function HomeScreen({ navigation }) {
  return (
    <View>
      <Text>Acasă</Text>
      <Button title="Mergi la Detalii cu ID 42"
        onPress={() => navigation.navigate('Details', { itemId: 42, user: 'Ana' })}
      />
    </View>
  );}
```

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Hook-ul `useNavigation`

:: content ::

Dar ce facem când avem nevoie să navigăm dintr-o componentă care **nu** este un ecran (ex: un buton dintr-un header custom, o componentă dintr-un card)?

Hook-ul **`useNavigation`** rezolvă această problemă. Acesta returnează obiectul `navigation` pentru navigatorul părinte, permițând oricărei componente copil să declanșeze acțiuni de navigare.

<AdmonitionType type="info">

`useNavigation` eliberează componentele de nevoia de a primi prop-ul `navigation` manual ("prop drilling"), făcând codul mai curat și mai decuplat.

</AdmonitionType>

```js
import { useNavigation } from '@react-navigation/native';

function ButonCustomSpreProfil() {
  const navigation = useNavigation();

  return (
    <Button
      title="Vezi Profilul Meu"
      onPress={() => navigation.navigate('Profile')}
    />
  );
}
```

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Prop-ul `route`

:: content ::

Acest obiect conține informații esențiale despre starea curentă a rutei pe care se află componenta.

**Proprietăți Cheie:**

<div class="ns-c-tight">

- **`route.params`**: Un obiect care conține parametrii transmiși la navigare. Acesta este cel mai utilizat.
- **`route.name`**: Numele rutei, așa cum a fost definit în navigator (ex: `'Details'`).
- **`route.key`**: O cheie unică pentru instanța curentă a ecranului. Devine important când folosiți `push` pentru a deschide mai multe ecrane de același tip.

</div>

```js
function DetailsScreen({ route, navigation }) {
  // Extragem parametrii din prop-ul 'route'
  const { itemId, user } = route.params;

  return (
    <View>
      <Text>Detalii pentru Item ID: {itemId}</Text>
      <Text>Utilizator: {user}</Text>
      <Button
        title="Mergi la alte detalii (Push)"
        onPress={() => navigation.push('Details', { itemId: Math.random() })}
      />
    </View>
  );
}
```

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Hook-ul `useRoute`

:: content ::

Similar cu `useNavigation`, hook-ul **`useRoute`** oferă acces la obiectul `route` din orice componentă, fără a fi nevoie să-l primești prin `props`.

Este deosebit de util pentru componentele de header sau alte elemente de UI care trebuie să se adapteze în funcție de datele ecranului curent.

```js
import { useRoute } from '@react-navigation/native';

function HeaderDinamic() {
  const route = useRoute();

  // Verificăm dacă există un parametru 'title' în ruta curentă
  const pageTitle = route.params?.title ?? 'Titlu Implicit';

  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{pageTitle}</Text>
    </View>
  );
}
```

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Personalizarea Antetelor (Headers)

:: content ::

Navigatorul Stack oferă opțiuni extinse pentru a personaliza antetul fiecărui ecran. Acestea se configurează prin prop-ul `options` al componentei `<Stack.Screen>`.

**Opțiuni Comune:**
<div class="ns-c-tight">

- **`title`**: Schimbă textul afișat în centrul antetului.
- **`headerStyle`**: Un obiect de stil pentru a personaliza containerul antetului (ex: `backgroundColor`).
- **`headerTintColor`**: Culoarea butonului de "înapoi" și a titlului.
- **`headerTitleStyle`**: Un obiect de stil pentru a personaliza componenta de text a titlului (ex: `fontFamily`, `fontWeight`).

</div>

```js
<Stack.Screen
  name="Home"
  component={HomeScreen}
  options={{
    title: 'Pagina Principală',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }}/>

```
---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Adăugarea de Butoane în Antet

:: content ::

Puteți adăuga componente interactive în stânga sau dreapta titlului folosind opțiunile `headerLeft` și `headerRight`.

Acestea acceptă o funcție care returnează o componentă React.

```js
import { Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//...

function HomeScreen() {
    const navigation = useNavigation();
    
    React.useLayoutEffect(() => {
        navigation.setOptions({
             headerRight: () => (
                <Button onPress={() => Alert.alert('Salut!')} title="Info" color="#fff" />
             ),
        });
    }, [navigation])

    // ...
}
```

---
layout: center
---

<AdmonitionType type="info">

# Folosind `navigation.setOptions` în interiorul componentei (într-un `useEffect` sau `useLayoutEffect`), putem face butoanele din header să interacționeze cu starea și metodele componentei ecranului.

</AdmonitionType>
---
layout: cover
---

<script setup>
const code = `
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Componentă copil care folosește hook-ul useNavigation
const NavigateToProfileButton = () => {
  const navigation = useNavigation();
  return <Button title="Mergi la profil (din componentă)" onPress={() => navigation.navigate('Profile')} />;
};

// Componentă copil care folosește hook-ul useRoute
const DynamicHeaderInfo = () => {
  const route = useRoute();
  const info = route.params?.info ?? 'Nicio informație';
  return <Text style={{marginRight: 10}}>{info}</Text>;
}

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Ecran Acasă</Text>
      <Button
        title="Mergi la Detalii"
        onPress={() => navigation.navigate('Details', { itemId: 1, info: 'Produs' })}
      />
      <NavigateToProfileButton />
    </View>
  );
}

function DetailsScreen({ route }) {
  const { itemId } = route.params;
  return (
    <View style={styles.container}>
      <Text>Ecran Detalii pentru ID: {itemId}</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text>Ecran Profil</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: 'tomato' },
          headerTintColor: '#fff',
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ 
            title: 'Acasă',
            headerRight: () => <Button onPress={() => Alert.alert('Acesta este un buton!')} title="Info" color="#fff" />,
          }} 
        />
        <Stack.Screen 
          name="Details" 
          component={DetailsScreen}
          options={{
            title: 'Detalii',
            // Antet personalizat care folosește un hook pentru a citi parametrii
            headerRight: () => <DynamicHeaderInfo />
          }}
        />
         <Stack.Screen 
          name="Profile" 
          component={ProfileScreen}
          options={{
            // Un antet complet personalizat
            header: ({ navigation }) => (
              <View style={{padding: 10, backgroundColor: 'lightblue', paddingTop: 40}}>
                <Text style={{textAlign: 'center', fontSize: 18}}>Antet Complet Personalizat</Text>
                <Button title="Înapoi" onPress={() => navigation.goBack()} />
              </View>
            )
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: 10 
}
});
`
const dependencies = '@react-navigation/native,react-native-screens,react-native-safe-area-context,@react-navigation/native-stack'
</script>

<ExpoPreview :code="code" :dependencies="dependencies" name="Exemple Avansate de Navigare" />


---
layout: cover
---

<script setup>
const code = `
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons'; 

// Stack-ul pentru primul tab
const HomeStack = createNativeStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} options={{title: "Acasă"}}/>
      <HomeStack.Screen name="Details" component={DetailsScreen} options={{title: "Detalii"}}/>
    </HomeStack.Navigator>
  );
}

// Stack-ul pentru al doilea tab
const SettingsStack = createNativeStackNavigator();
function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="SettingsMain" component={SettingsScreen} options={{title: "Setări"}}/>
      <SettingsStack.Screen name="Profile" component={ProfileScreen} options={{title: "Profil"}}/>
    </SettingsStack.Navigator>
  );
}

// -- Definirea Ecranelor --
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Ecran Acasă</Text>
      <Button title="Mergi la Detalii" onPress={() => navigation.navigate('Details')} />
    </View>
  );
}

function DetailsScreen() {
  return <View style={styles.container}><Text>Ecran Detalii</Text></View>;
}

function SettingsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Ecran Setări</Text>
      <Button title="Mergi la Profil" onPress={() => navigation.navigate('Profile')} />
    </View>
  );
}

function ProfileScreen() {
  return <View style={styles.container}><Text>Ecran Profil</Text></View>;
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
  <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} options={{ title: 'Acasă' }}/>
        <Tab.Screen name="Settings" component={SettingsStackScreen} options={{ title: 'Setări' }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
});
`
const dependencies = '@react-navigation/native,react-native-screens,react-native-safe-area-context,@react-navigation/bottom-tabs,@react-navigation/native-stack,@expo/vector-icons/Ionicons,expo-font,@expo/vector-icons'
</script>

<ExpoPreview :code="code" :dependencies="dependencies" name="Exemplu Navigatori Imbricați" />



---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# De ce Expo Router?

:: content ::

Expo Router este o librărie de navigare care folosește convențiile de denumire a fișierelor pentru a defini rutele aplicației. Este construită peste React Navigation, beneficiind de puterea și fiabilitatea acesteia, dar oferind o experiență de dezvoltare mult mai simplă și rapidă.

<div class="grid grid-cols-3 gap-4 mt-8">
<div class="neversink-indigo-light-scheme bg-[var(--neversink-bg-color)] p-4 rounded-lg text-center">
<h3 class="text-lg font-bold text-[var(--neversink-text-color)]">Viteză și Simplitate</h3>
<p class="text-sm">Convenție peste Configurare. Adaugi un fișier în directorul `app` și ai o nouă rută. Fără configurare manuală a navigatorilor.</p>
</div>
<div class="neversink-indigo-light-scheme bg-[var(--neversink-bg-color)] p-4 rounded-lg text-center">
<h3 class="text-lg font-bold text-[var(--neversink-text-color)]">Aplicații Universale</h3>
<p class="text-sm">Proiectat de la zero pentru a oferi o experiență de rutare unificată pe iOS, Android și Web, inclusiv optimizări pentru SEO.</p>
</div>
<div class="neversink-indigo-light-scheme bg-[var(--neversink-bg-color)] p-4 rounded-lg text-center">
<h3 class="text-lg font-bold text-[var(--neversink-text-color)]">Construit pe React Navigation</h3>
<p class="text-sm">Beneficiezi de toate optimizările de performanță și de ecosistemul matur al React Navigation, dar cu o interfață mai prietenoasă.</p>
</div>
</div>

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Setup și Directorul `app`

:: content ::

Inițierea unui proiect cu Expo Router este simplă:

```bash
npx create-expo-app my-app -t expo-router
```

Directorul **`app`** este inima Expo Router. Orice fișier `.js`, `.jsx`, `.ts`, sau `.tsx` din acest director devine automat o rută în aplicație.

<div class="grid grid-cols-2 gap-8">
<div>

### Structura de Bază
```js
app/
├── _layout.js    // Layout-ul rădăcină (ex: Stack)
├── index.js      // Ecranul principal (ruta '/')
├── home.js       // Ruta '/home'
└── settings/
    ├── index.js  // Ruta '/settings'
    └── user.js   // Ruta '/settings/user'
```
</div>
<div>

### `_layout.js`
Fișierele numite `_layout.js` sunt speciale. Ele definesc un "layout" pentru un segment de rute. Layout-ul rădăcină (`app/_layout.js`) definește navigatorul principal al întregii aplicații (de obicei un Stack, Tabs, sau Drawer).

</div>
</div>

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Implementarea Navigatorilor cu Layouts

:: content ::

Cu Expo Router, nu mai importați `create...Navigator`. În schimb, importați direct navigatorul dorit din `expo-router` și îl exportați ca `default` din fișierul `_layout.js` corespunzător.

---
layout: center
---

### Crearea unui Stack Layout

Pentru a face ca toate ecranele din directorul `app` să fie parte dintr-un Stack Navigator, creați `app/_layout.js`:

```js
// app/_layout.js
import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Acasă' }} />
      <Stack.Screen name="home" options={{ title: 'Pagina Home' }} />
    </Stack>
  );
}
```
<AdmonitionType type="info">

Expo Router abstractizează inteligent pachetele `@react-navigation/*` pentru tine.

</AdmonitionType>

---
layout: center
---

### Crearea unui Tab Layout

Să presupunem că vrem un grup de rute (`/one`, `/two`) să fie gestionate de un Tab Navigator. Creăm un folder și un fișier de layout în interiorul său:

<br/>

**Structura Fișierelor**:
```js
app/
├── (tabs)/
│   ├── _layout.js  // Aici definim Tab Navigator-ul
│   ├── one.js      // Ecranul pentru primul tab
│   └── two.js      // Ecranul pentru al doilea tab
└── _layout.js      // Layout-ul rădăcină (Stack)
```

---
layout: center
---

**Codul pentru Layout-ul Tab-urilor**:
```js
// app/(tabs)/_layout.js
import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="one"
        options={{
          title: 'Tab Unu',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tab Doi',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
        }}
      />
    </Tabs>
  );
}
```

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Definirea Rutelor

:: content ::

<div class="ns-c-tight">

- **Rute Statice**: `app/settings.js` creează ruta `/settings`.
- **Rute Dinamice**: `app/users/[id].js` creează o rută care acceptă un parametru. `[id]` devine un wildcard. URL-uri precum `/users/123` sau `/users/abc` vor randa acest ecran, iar valoarea (`123`, `abc`) va fi disponibilă ca parametru.
- **Rute Grupate**: `app/(group)/...` - Folderele cu paranteze rotunde (`(group)`) organizează fișierele fără a adăuga un segment la URL. Acest lucru este perfect pentru a grupa ecranele unui anumit layout (ex: `(tabs)`) sau pentru organizare logică.
- **Rute Catch-all**: `app/[...slug].js` va prinde orice rută care nu a fost deja definită, util pentru pagini de eroare 404.

</div>

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Navigarea cu Expo Router

:: content ::

Expo Router oferă metode declarative și imperative pentru a naviga.

<div class="grid grid-cols-2 gap-8">
<div>

### Componenta `<Link>`

Este metoda declarativă, similară cu tag-ul `<a>` din web. Se folosește pentru navigare simplă, declanșată de utilizator.

```js
import { Link } from 'expo-router';

// Navigare simplă
<Link href="/settings">Mergi la Setări</Link>

// Navigare cu parametri
<Link href={{ pathname: "/Fusers/[id]", params: { id: '123' } }}>
  Vezi Utilizator 123
</Link>

// Înlocuiește ecranul curent în stivă
<Link href="/home" replace>Acasă</Link>
```

</div>
<div>

### Hook-ul `useRouter`

Este metoda imperativă, pentru navigare programatică (ex: după un login reușit).

```js
import { useRouter } from 'expo-router';

const router = useRouter();

// Navigare
router.push('/settings');

// Navigare înapoi
router.back();

// Înlocuire
router.replace('/dashboard');
```

</div>
</div>

---
layout: center
---

### Accesarea Parametrilor

Folosiți hook-ul `useLocalSearchParams` pentru a accesa parametrii dintr-o rută dinamică.

```js
// În app/users/[id].js
import { useLocalSearchParams } from 'expo-router';

export default function UserProfile() {
  const { id } = useLocalSearchParams();
  return <Text>Profil pentru Utilizatorul: {id}</Text>;
}
```

---
layout: cover
---

<script setup>
const code = `
import { View, Text, StyleSheet } from 'react-native';
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router';

// Acest fișier simulează ecrane multiple pentru a demonstra navigarea.
// Într-un proiect real, fiecare ar fi în fișierul său.

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Acasă' }} />
      <Text style={styles.text}>Ecranul Principal</Text>
      <Link href="/about" style={styles.link}>Despre Noi</Link>
      <Link href="/users/42" style={styles.link}>Vezi Profilul Utilizatorului 42</Link>
    </View>
  );
}

function AboutScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Despre' }} />
      <Text style={styles.text}>Pagină Despre</Text>
      <Text style={styles.link} onPress={() => router.back()}>Înapoi</Text>
    </View>
  );
}

function UserProfile() {
    const { id } = {id: 42}; // Simulăm hook-ul pentru Snack
  // const { id } = useLocalSearchParams(); 
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: \`Utilizator \${id}\` }} />
      <Text style={styles.text}>Profil pentru Utilizatorul cu ID: {id}</Text>
      <Link href="/" style={styles.link}>Înapoi la Acasă</Link>
    </View>
  );
}

// În Snack, nu putem folosi Expo Router, dar putem simula componentele
// Aici, vom afișa doar ecranul "Acasă" pentru a arăta componenta <Link>
export default function App() {
  return <HomeScreen />;
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    gap: 15 
  },
  text: { 
    fontSize: 18 
  },
  link: { 
    fontSize: 16, 
    color: 'blue', 
    textDecorationLine: 'underline' 
  }
});
`
const dependencies = 'expo-router,react-native-safe-area-context,react-native-screens,expo-linking,expo-constants,expo-status-bar'
</script>

<ExpoPreview :code="code" :dependencies="dependencies" name="Simulare Expo Router" />



---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Comparație Directă

:: content ::

<div class="text-base">

| Caracteristică | React Navigation | Expo Router |
| :--- | :--- | :--- |
| **Abordare** | Declarativă (configurare în cod) | Convenție peste Configurare |
| **Setup Inițial** | Manual (instalare pachete, creare navigatori) | Automat (bazat pe structura de fișiere) |
| **Viteză Dezvoltare** | Mai lent la început, necesită boilerplate | Extrem de rapid, adaugi fișiere și funcționează |
| **Flexibilitate** | Maximă, control total asupra oricărui aspect | Foarte flexibil, dar ghidat de convenții |
| **Organizare Cod** | Centralizată (un fișier de navigare) sau distribuită | Co-locată (ecranul și ruta sa sunt același fișier) |
| **Suport Web** | Posibil, dar necesită configurare suplimentară | Nativ, de primă clasă, cu optimizări SEO |
| **Complexitate**| Medie spre ridicată pentru scenarii complexe | Scăzută spre medie |

</div>

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Când să Alegi Fiecare Librărie?

:: content ::

<div class="grid grid-cols-2 gap-8 mt-8 text-center">
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-bg-color)] p-6 rounded-lg border border-[var(--neversink-admon-border-color)]">
    <h3 class="text-xl font-bold text-[var(--neversink-text-color)]">Alege React Navigation Când...</h3>
    <div class="ns-c-tight text-left mt-4">
    <ul>
<li> Ai nevoie de o logică de rutare extrem de complexă și dinamică, greu de modelat prin structura de fișiere. </li>
<li>Lucrezi la un proiect "brownfield" (integrezi React Native într-o aplicație nativă existentă) sau nu folosești Expo.</li>
<li>Echipa ta este deja foarte familiarizată cu configurarea declarativă și preferă acest stil.</li>
<li>Trebuie să gestionezi navigatori modali sau de alt tip într-un mod foarte specific, care nu se aliniază cu convențiile.</li>
    </ul>
    </div>
  </div>
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-bg-color)] p-6 rounded-lg border border-[var(--neversink-admon-border-color)]">
    <h3 class="text-xl font-bold text-[var(--neversink-text-color)]">Alege Expo Router Când...</h3>
    <div class="ns-c-tight text-left mt-4">
    <ul>
<li>

Începi un proiect nou cu Expo (**alegerea implicită și recomandată**).
</li>
<li>Construiești o aplicație universală care trebuie să ruleze excelent pe iOS, Android și Web. </li>
<li>Prețuiești viteza de dezvoltare și un boilerplate redus.</li>
<li>Preferi co-locarea logicii (codul pentru o rută stă în fișierul care definește ruta).</li>
<li>Aplicația ta urmează modele de navigare standard (stack, tabs, drawer), chiar dacă sunt imbricate.</li>
  </ul>
    </div>
  </div>
</div>

---
layout: center
---

# Atelier Practic: Construirea unei Aplicații Sociale Simple

**Obiectiv**: Aprofundarea cunoștințelor prin implementarea aceleiași aplicații folosind ambele librării pentru a compara direct procesul și structura codului.

**Structura Aplicației**:
<div class="ns-c-tight">

- **Drawer Navigator** (principal)
  - **Feed** (Ecran implicit)
  - **Profil**
- Fiecare opțiune din Drawer deschide un **Tab Navigator**
  - **Feed Tabs**: `Feed Principal`, `Feed Prieteni`
  - **Profil Tabs**: `Postările Mele`, `Informații`
- Fiecare Tab conține un **Stack Navigator** pentru a naviga la ecrane de detalii (ex: `Detalii Postare`).

</div>

<br/>

<div class="grid grid-cols-2 gap-8">
<div>

**Partea 1**: Construiți aplicația folosind **React Navigation**.

</div>
<div>

**Partea 2**: Reconstruiți exact aceeași aplicație folosind **Expo Router**.

</div>
</div>