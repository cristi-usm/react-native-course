---
transition: slide-left
layout: cover
color: indigo-light
---

### Persistența Datelor & Strategii Offline-First

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Introducere în Persistența Datelor

:: content ::

**Persistența datelor** în contextul mobil se referă la capacitatea unei aplicații de a salva informații pe dispozitivul utilizatorului, astfel încât acestea să fie disponibile și după ce aplicația este închisă și redeschisă.

**De ce este critică o strategie offline?**

<div class="grid grid-cols-3 gap-4 mt-8">
<div class="neversink-indigo-light-scheme bg-[var(--neversink-bg-color)] p-4 rounded-lg text-center">
<h3 class="text-lg font-bold text-[var(--neversink-text-color)]">Experiența Utilizatorului</h3>
<p class="text-sm">Aplicația rămâne funcțională în zone cu semnal slab sau inexistent (metrou, avion), eliminând frustrarea.</p>
</div>
<div class="neversink-indigo-light-scheme bg-[var(--neversink-bg-color)] p-4 rounded-lg text-center">
<h3 class="text-lg font-bold text-[var(--neversink-text-color)]">Performanță</h3>
<p class="text-sm">Citirea datelor de pe disc este exponențial mai rapidă decât o cerere de rețea, rezultând o interfață fluidă și receptivă.</p>
</div>
<div class="neversink-indigo-light-scheme bg-[var(--neversink-bg-color)] p-4 rounded-lg text-center">
<h3 class="text-lg font-bold text-[var(--neversink-text-color)]">Consum Redus</h3>
<p class="text-sm">Reduce consumul de date mobile și prelungește durata de viață a bateriei prin minimizarea operațiunilor de rețea.</p>
</div>
</div>

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Strategii: Cache-First vs. Offline-First

:: content ::

<div class="grid grid-cols-2 gap-8 mt-8 text-center">
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-admon-bg-color)] p-6 rounded-lg border border-[var(--neversink-admon-border-color)]">
    <h3 class="text-xl font-bold text-[var(--neversink-text-color)]">Cache-First</h3>
    <p class="mt-4">Datele sunt stocate local (în cache) pentru a accelera încărcările viitoare. Sursa principală de adevăr rămâne serverul. Aplicația încearcă mai întâi să obțină date proaspete de pe server.</p>
    <p class="mt-4 text-sm"><strong>Caz de utilizare:</strong> Feed-uri de știri, unde datele proaspete sunt importante, dar un cache ajută la performanță.</p>
  </div>
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-admon-bg-color)] p-6 rounded-lg border border-[var(--neversink-admon-border-color)]">
    <h3 class="text-xl font-bold text-[var(--neversink-text-color)]">Offline-First</h3>
    <p class="mt-4">Sursa principală de adevăr este baza de date locală. UI-ul citește și scrie întotdeauna local, instantaneu. Sincronizarea cu serverul se face în fundal, când există conexiune.</p>
    <p class="mt-4 text-sm"><strong>Caz de utilizare:</strong> Aplicații de notițe, to-do lists, unde utilizatorul trebuie să poată modifica date oricând.</p>
  </div>
</div>

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Alternative

:: content ::

<div class="grid grid-cols-3 gap-6 mt-8">
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-bg-color)] p-5 rounded-lg text-center">
    <h3 class="text-lg font-bold text-[var(--neversink-text-color)]">AsyncStorage</h3>
    <p class="text-sm mt-2">Stocare simplă, asincronă, de tip cheie-valoare. Ideală pentru date non-sensibile precum setări sau preferințe.</p>
  </div>
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-bg-color)] p-5 rounded-lg text-center">
    <h3 class="text-lg font-bold text-[var(--neversink-text-color)]">SecureStore</h3>
    <p class="text-sm mt-2">Stocare criptată pentru date sensibile. Perfectă pentru token-uri de autentificare, chei API sau informații personale.</p>
  </div>
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-bg-color)] p-5 rounded-lg text-center">
    <h3 class="text-lg font-bold text-[var(--neversink-text-color)]">SQLite</h3>
    <p class="text-sm mt-2">O bază de date relațională, locală și puternică. Necesară pentru a gestiona date complexe, structurate și volume mari de date.</p>
  </div>
</div>

---
layout: cover
---

### Ce aplicații pe care le folosiți funcționează bine offline? 

Cum credeți că se gestionează aceste date?

---
transition: slide-left
layout: cover
color: indigo-light
---

## Stocare Simplă cu AsyncStorage

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Ce este AsyncStorage?

:: content ::

`AsyncStorage` este un sistem de stocare **asincron**, **necriptat**, **persistent**, de tip **cheie-valoare**. Este o abstracție peste stocarea nativă a platformei, oferind o interfață simplă, similară cu `localStorage` din web.

<div class="ns-c-tight">

- **Asincron**: Toate operațiile (`setItem`, `getItem`, etc.) returnează un `Promise`, asigurând că nu blochează firul de execuție principal.
- **Persistent**: Datele salvate cu AsyncStorage rămân pe dispozitiv chiar dacă aplicația este închisă sau dispozitivul este repornit.
- **Cheie-Valoare**: Datele sunt stocate ca perechi de string-uri. Pentru a stoca obiecte sau array-uri, trebuie să le serializăm (ex: `JSON.stringify`) înainte de a le salva și să le deserializăm (`JSON.parse`) la citire.
- **Necriptat**: Datele sunt stocate în text clar. Nu este potrivit pentru informații sensibile.

</div>

<AdmonitionType type="tip">

**Când să-l folosim?** 

Setări ale utilizatorului (ex: tema dark/light), preferințe, un cache simplu pentru date non-sensibile.

</AdmonitionType>

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Operații de Bază cu AsyncStorage

:: content ::

Mai întâi, trebuie să instalăm pachetul oficial:
```bash
npx expo install @react-native-async-storage/async-storage
```

Apoi, putem importa și folosi metodele sale.

<div class="flex gap-4">
<div class="flex-1">

### Salvarea Datelor (`setItem`)
Salvează o valoare (string) asociată cu o cheie.
```js
import AsyncStorage from '@react-native-async-storage/async-storage';

const saveData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
};
```

</div>

<div class="flex-1">

### Citirea Datelor (`getItem`)
Citește valoarea asociată cu o cheie. Returnează `null` dacă cheia nu există.

```js
const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // value previously stored
    }
  } catch (e) {
    // error reading value
  }
};
```

</div>
</div>

---
layout: default
---

<div class="grid grid-cols-2 gap-8 mt-4">

<div>

### Ștergerea Datelor (`removeItem`)
Șterge perechea cheie-valoare.
```js
const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // remove error
  }
};
```

</div>

<div>

### Gestionarea Obiectelor (JSON)
Pentru a stoca obiecte, le transformăm în string.
```js
const saveObject = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
  }
};
```
</div>

</div>

---
layout: cover
---

<script setup>
const code = `
import { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_KEY = '@theme_preference';

export default function AsyncStorageExample() {
  const [theme, setTheme] = useState('light');
  const isDarkMode = theme === 'dark';

  // Funcție pentru a salva preferința
  const saveThemePreference = async (newTheme) => {
    try {
      await AsyncStorage.setItem(THEME_KEY, newTheme);
      setTheme(newTheme);
    } catch (e) {
      console.error("Failed to save theme preference.", e);
    }
  };

  // Funcție pentru a citi preferința la încărcarea componentei
  const getThemePreference = async () => {
    try {
      const storedTheme = await AsyncStorage.getItem(THEME_KEY);
      if (storedTheme !== null) {
        setTheme(storedTheme);
      }
    } catch (e) {
      console.error("Failed to fetch theme preference.", e);
    }
  };
  
  useEffect(() => {
    getThemePreference();
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    saveThemePreference(newTheme);
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.text, isDarkMode && styles.darkText]}>
        Tema curentă este: {theme}
      </Text>
      <View style={styles.switchContainer}>
        <Text style={[styles.text, isDarkMode && styles.darkText]}>Mod Întunecat</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={toggleTheme}
          value={isDarkMode}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  text: {
    fontSize: 20,
    color: '#333',
  },
  darkText: {
    color: '#fff',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  }
});
`
const dependencies = '@react-native-async-storage/async-storage'
</script>

<ExpoPreview :code="code" :dependencies="dependencies" name="Exemplu AsyncStorage" />

---
transition: slide-left
layout: cover
color: indigo-light
---

## Stocare Securizată cu SecureStore

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Necesitatea Stocării Securizate

:: content ::

Anumite date gestionate de o aplicație mobilă sunt extrem de sensibile și nu trebuie niciodată stocate în text clar. `AsyncStorage` este vizibil pentru oricine are acces fizic la dispozitiv și cunoștințe tehnice minime.

**Date Sensibile Comprise:**

<div class="ns-c-tight">

- **Token-uri de Autentificare (JWT, OAuth)**: Expunerea acestora poate oferi unui atacator acces complet la contul utilizatorului.
- **Chei API**: Chei private pentru servicii terțe, care pot fi abuzate.
- **Date Personale**: Informații de identificare personală (PII).
- **Informații Financiare**: Detalii despre carduri de credit sau conturi bancare.
- **Date Biometrice**: Informații legate de amprentă sau recunoaștere facială.

</div>

<AdmonitionType type="warning">

Stocarea acestor date într-un mod necriptat reprezintă o vulnerabilitate majoră de securitate.

</AdmonitionType>

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# `expo-secure-store`

:: content ::

**`expo-secure-store`** este o soluție oferită de Expo pentru a stoca date de tip cheie-valoare într-un mod **criptat**. Utilizează mecanismele de stocare sigure, native ale platformei:

- **Pe iOS**: Utilizează **Keychain Services**, un sistem centralizat și securizat pentru gestionarea datelor sensibile.
- **Pe Android**: Utilizează **SharedPreferences**, criptate cu sistemul `Android Keystore`.

Interfața sa este foarte similară cu cea a `AsyncStorage`, toate operațiile sunt asincrone și returnează `Promises`.

**Diferențe Cheie față de AsyncStorage:**
- **Criptare**: Datele sunt criptate automat înainte de a fi scrise pe disc.
- **Limitare de Dimensiune**: Poate stoca doar valori de dimensiuni mici (câțiva KB), fiind optimizat pentru secrete precum token-uri, nu pentru fișiere mari.
- **Doar String-uri**: La fel ca AsyncStorage, stochează doar string-uri. Obiectele trebuie serializate.

---
layout: cover
---

<script setup>
const code = `
import { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'authToken';

export default function SecureStoreExample() {
  const [tokenInput, setTokenInput] = useState('');
  const [storedToken, setStoredToken] = useState('');

  // Salvarea unui token de autentificare
  async function saveAuthToken() {
    if (!tokenInput) {
      Alert.alert('Eroare', 'Introduceți un token pentru a-l salva.');
      return;
    }
    try {
      await SecureStore.setItemAsync(TOKEN_KEY, tokenInput);
      Alert.alert('Succes', 'Token-ul a fost salvat în siguranță!');
      setTokenInput('');
    } catch (error) {
      console.error('Eroare la salvarea token-ului:', error);
    }
  }

  // Obținerea token-ului
  async function getAuthToken() {
    try {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      if (token) {
        setStoredToken(token);
      } else {
        Alert.alert('Info', 'Niciun token nu a fost găsit.');
        setStoredToken('');
      }
    } catch (error) {
      console.error('Eroare la citirea token-ului:', error);
    }
  }

  // Ștergerea token-ului
  async function deleteAuthToken() {
     try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      setStoredToken('');
      Alert.alert('Succes', 'Token-ul a fost șters.');
    } catch (error) {
      console.error('Eroare la ștergerea token-ului:', error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Introduceți un token pentru a-l salva:</Text>
      <TextInput
        style={styles.input}
        placeholder="ex: xyz.123.abc"
        value={tokenInput}
        onChangeText={setTokenInput}
      />
      <Button title="Salvează Token" onPress={saveAuthToken} />
      <View style={styles.separator} />
      <Button title="Citește Token" onPress={getAuthToken} />
      {storedToken ? (
        <Text style={styles.tokenText}>Token Stocat: {storedToken}</Text>
      ) : null}
      <Button title="Șterge Token" onPress={deleteAuthToken} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 20 
  },
  label: { 
    fontSize: 16, 
    marginBottom: 10 
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  separator: {
    marginVertical: 15
  },
  tokenText: {
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
    color: 'green'
  }
});
`
const dependencies = 'expo-secure-store'
</script>

<ExpoPreview :code="code" :dependencies="dependencies" name="Exemplu SecureStore" />

---
transition: slide-left
layout: cover
color: indigo-light
---

## Baze de Date Locale cu `expo-sqlite`

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Când este Necesară o Bază de Date?

:: content ::

`AsyncStorage` și `SecureStore` sunt excelente pentru date simple, dar devin ineficiente și greu de gestionat atunci când avem de-a face cu:

<div class="ns-c-tight">

- **Date Complexe și Relaționate**: De exemplu, o aplicație de e-commerce cu utilizatori, produse, comenzi și recenzii, unde un utilizator are mai multe comenzi, iar o comandă conține mai multe produse.
- **Volume Mari de Date**: Stocarea a mii de înregistrări (ex: mesaje dintr-un chat, articole de știri) într-un singur fișier JSON în `AsyncStorage` ar fi extrem de lentă.
- **Necesitatea de a Interoga Datele**: Când trebuie să căutăm, sortăm, filtrăm sau agregăm date (ex: "afișează toate sarcinile nefinalizate, sortate după prioritate").
- **Consistența Datelor**: O bază de date relațională impune o schemă și asigură integritatea datelor, prevenind stocarea de informații invalide.

</div>

<AdmonitionType type="info">

Pentru aceste scenarii, **SQLite** este soluția standard. Este un motor de baze de date relaționale, compact, rapid și integrat direct în Android și iOS.

</AdmonitionType>

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# `expo-sqlite`

:: content ::

**`expo-sqlite`** este o librărie care oferă o interfață JavaScript simplă pentru a interacționa cu baza de date SQLite a dispozitivului.

**Pașii de Bază:**

1.  **Instalare**:
    ```bash
    npx expo install expo-sqlite
    ```
2.  **Deschiderea Bazei de Date**:
    Se folosește `SQLite.openDatabaseAsync('nume.db')`. Dacă baza de date nu există, va fi creată. Metoda este asincronă și returnează o promisiune.
3.  **Executarea Operațiunilor SQL**:
    Noua versiune oferă metode asincrone directe:
    - `database.execAsync()` - pentru comenzi DDL (CREATE TABLE)
    - `database.runAsync()` - pentru INSERT, UPDATE, DELETE
    - `database.getAllAsync()` - pentru SELECT (returnează toate rezultatele)
    - `database.getFirstAsync()` - pentru SELECT (returnează primul rezultat)

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Operații CRUD cu `expo-sqlite`

:: content ::

Cu noua API, folosim metodele asincrone ale instanței de bază de date pentru a executa comenzi SQL într-un mod mai simplu și mai lizibil.

<div class="flex gap-2">
<div>

### CREATE TABLE (Crearea unui tabel)
Definește structura unui tabel. Se execută de obicei o singură dată cu `execAsync`.

```js
await database.execAsync(`
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY NOT NULL,
    value TEXT NOT NULL,
    done INT DEFAULT 0
  );
`);
```

</div>
<div>

### INSERT INTO (Adăugare)
Adaugă o nouă înregistrare cu `runAsync`. Folosim `?` ca placeholder pentru a preveni SQL Injection.

```js
await database.runAsync(
  "INSERT INTO items (value) VALUES (?)",
  ['item nou']
);
```

</div>

</div>

---
layout: center
---

<div class="flex gap-2">
<div>

### SELECT (Citire)
Selectează date cu `getAllAsync` sau `getFirstAsync`. Rezultatele sunt returnate direct.

```js
// Toate rezultatele
const allItems = await database.getAllAsync("SELECT * FROM items");

// Primul rezultat
const firstItem = await database.getFirstAsync(
  "SELECT * FROM items WHERE id = ?", [1]
);
```

</div>
<div>

### UPDATE & DELETE (Actualizare și Ștergere)
Modifică sau șterge înregistrări existente cu `runAsync`.

```js
// Actualizare
await database.runAsync(
  "UPDATE items SET done = 1 WHERE id = ?",
  [itemId]
);

// Ștergere
await database.runAsync(
  "DELETE FROM items WHERE id = ?",
  [itemId]
);
```
</div>
</div>

---
layout: cover
---

<script setup>
const code = `
import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';

export default function SQLiteExample() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [database, setDatabase] = useState(null);

  useEffect(() => {
    const initDatabase = async () => {
      try {
        const database = await SQLite.openDatabaseAsync('tasks.db');
        await database.execAsync(
          'CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, completed INTEGER);'
        );
        setDatabase(database);
        fetchTasks(database);
      } catch (error) {
        console.error('Database initialization error:', error);
      }
    };
    initDatabase();
  }, []);

  const fetchTasks = async (db = database) => {
    if (!db) return;
    try {
      const result = await db.getAllAsync('SELECT * FROM tasks');
      setTasks(result);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async () => {
    if (!task || !database) return;
    try {
      await database.runAsync('INSERT INTO tasks (text, completed) VALUES (?, 0)', [task]);
      await fetchTasks();
      setTask('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const deleteTask = async (id) => {
    if (!database) return;
    try {
      await database.runAsync('DELETE FROM tasks WHERE id = ?', [id]);
      await fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lista de Sarcini (SQLite)</Text>
      <TextInput
        placeholder="Adaugă o sarcină nouă"
        value={task}
        onChangeText={setTask}
        style={styles.input}
      />
      <Button title="Adaugă" onPress={addTask} />
      <FlatList
        data={tasks}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskText}>{item.text}</Text>
            <Button title="Șterge" onPress={() => deleteTask(item.id)} color="red" />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    paddingTop: 40, 
    paddingHorizontal: 20 
  },
  header: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 20 
  },
  input: { 
    borderWidth: 1, 
    borderColor: 'gray', 
    padding: 10, 
    marginBottom: 10 
  },
  taskItem: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 10, 
    borderBottomWidth: 1, 
    borderBottomColor: '#ccc' 
  },
  taskText: { 
    fontSize: 18 
  }
});
`
const dependencies = 'expo-sqlite'
</script>

<ExpoPreview :code="code" :dependencies="dependencies" name="Exemplu SQLite" />

---
transition: slide-left
layout: cover
color: indigo-light
---

## Implementarea unei Strategii Offline-First

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Detectarea Stării Conexiunii

:: content ::

Pentru a implementa o strategie offline-first, primul pas este să știm **când** aplicația este online sau offline. Librăria `@react-native-community/netinfo` este standardul pentru această funcționalitate.

**Instalare:**
```bash
npx expo install @react-native-community/netinfo
```

Hook-ul **`useNetInfo`** este cea mai simplă metodă de a accesa starea rețelei în componentele React. Acesta se abonează la schimbările de stare și re-randează componenta automat.

`useNetInfo` returnează un obiect cu informații detaliate, cele mai importante fiind:
<div class="ns-c-tight">

- **`isConnected`**: Un boolean care este `true` dacă dispozitivul are o conexiune la internet activă.
- **`isInternetReachable`**: Un boolean care verifică nu doar dacă există o conexiune (ex: Wi-Fi), ci și dacă aceasta poate accesa internetul. Este adesea mai fiabil decât `isConnected`.
- **`type`**: Tipul conexiunii (ex: `'wifi'`, `'cellular'`, `'none'`).

</div>

---
layout: cover
---

<script setup>
const code = `
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';

export default function NetInfoExample() {
  const netInfo = useNetInfo();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Informații Rețea</Text>
      <Text>Tip Conexiune: {netInfo.type}</Text>
      <Text>Conectat la Internet? {netInfo.isInternetReachable ? 'Da' : 'Nu'}</Text>
      
      <View style={[
        styles.statusIndicator, 
        { backgroundColor: netInfo.isInternetReachable ? 'green' : 'red' }
      ]}>
        <Text style={styles.statusText}>
          {netInfo.isInternetReachable ? 'ONLINE' : 'OFFLINE'}
        </Text>
      </View>
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
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10
  },
  statusIndicator: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  statusText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
  }
});
`
const dependencies = '@react-native-community/netinfo'
</script>

<ExpoPreview :code="code" :dependencies="dependencies" name="Exemplu NetInfo" />

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Arhitectura Offline-First

:: content ::

O arhitectură robustă offline-first se bazează pe principiul că interfața utilizatorului interacționează **exclusiv** cu sursa de date locală (SQLite, de exemplu). Sincronizarea cu serverul este un proces secundar, care are loc în fundal.

1.  **UI-ul Citește Doar Local**: Componentele citesc datele direct din SQLite. Acest lucru asigură o încărcare instantanee și o experiență fluidă, indiferent de starea conexiunii.

2.  **Acțiunile se Execută Local Întâi**: Orice modificare a datelor (creare, actualizare, ștergere) se aplică mai întâi în baza de date locală. Utilizatorul vede imediat rezultatul acțiunii sale.

3.  **Sincronizarea în Fundal**:
    -   **Dacă este Online**: După ce acțiunea a fost salvată local, se încearcă imediat trimiterea ei către server.
    -   **Dacă este Offline**: Acțiunea este adăugată într-o "coadă de sincronizare" (o tabelă separată în SQLite sau o listă în AsyncStorage).

---
layout: image
image: /7-data-persistence/offline-first-diagram.png
backgroundSize: contain
---

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Sincronizarea și Gestionarea Conflictelor

:: content ::

**Procesul de Sincronizare**

Coada de sincronizare (`sync_queue`) este inima procesului. O intrare în această coadă ar putea conține:
- ID-ul local al resursei modificate.
- Tipul operațiunii (`'create'`, `'update'`, `'delete'`).
- Datele necesare pentru operațiune (payload-ul).
- Un timestamp.

---
layout: center
---

**Când aplicația detectează că a revenit online:**

1.  Se verifică dacă există acțiuni în `sync_queue`.
2.  Se procesează acțiunile în ordine cronologică, trimițând cererile corespunzătoare către server.
3.  La succes, acțiunea este eliminată din coadă.
4.  La eșec, acțiunea poate fi marcată pentru o reîncercare ulterioară.

---
layout: center
---

**Gestionarea Conflictelor**
Conflictele apar când aceeași resursă este modificată atât local (offline), cât și pe server, înainte de sincronizare.
- **Strategia Simplă: "Last Write Wins" (Ultimul câștigă)**: Cea mai recentă modificare (bazată pe timestamp) suprascrie celelalte. Este cea mai simplă strategie de implementat.
- **Strategii Complexe**: Implică algoritmi de "merge" sau solicitarea intervenției utilizatorului pentru a rezolva conflictul.

---
transition: slide-left
layout: cover
color: indigo-light
---

### Workshop Practic: Aplicație de "Notițe" Offline

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Workshop: Pașii Proiectului

:: content ::

<div class="text-base">

**Scop**: Construirea unei aplicații simple de notițe care funcționează complet offline și se sincronizează cu un server (mock) atunci când este online.

<div class="ns-c-tight">

1.  **Setup Proiect**: Crearea unui nou proiect Expo și instalarea dependențelor: `expo-sqlite`, `@react-native-community/netinfo`, `axios`.

2.  **UI Simplu**: Crearea unei interfețe pentru a afișa o listă de notițe și un `TextInput` pentru a adăuga notițe noi.

3.  **Stocare Locală (SQLite)**: Implementarea bazei de date cu două tabele: `notes` și `sync_queue`. UI-ul va citi și scrie direct în tabela `notes`.

4.  **Detectare Conexiune**: Integrarea `useNetInfo` pentru a afișa vizual statusul conexiunii.

5.  **Logica Offline**: Modificarea funcției de adăugare a notițelor:
    -   Se adaugă mereu notița în tabela locală `notes`.
    -   Dacă aplicația este offline, se adaugă o intrare în `sync_queue`.
    -   Dacă este online, se trimite direct la server.

6.  **Sincronizare**: Implementarea unei funcții care:
    -   Este declanșată de un `useEffect` care ascultă schimbările de stare a conexiunii.
    -   Când aplicația devine online, citește `sync_queue`, trimite datele la un API mock (ex: [mockapi.io](https://mockapi.io/)) și golește coada la succes.

</div>
</div>

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Workshop: Schema Bazei de Date

:: content ::

Vom folosi două tabele în baza noastră de date `notes.db`.

<div class="grid grid-cols-2 gap-8 mt-4">
<div>

### Tabela `notes`
Stochează conținutul notițelor.
```sql
CREATE TABLE IF NOT EXISTS notes (
  -- ID local, generat pe dispozitiv
  id INTEGER PRIMARY KEY AUTOINCREMENT,

  -- Conținutul notiței
  content TEXT NOT NULL,

  -- Un flag pentru a marca dacă notița
  -- a fost sincronizată cu serverul
  synced INTEGER DEFAULT 0, -- 0 = false, 1 = true
  
  -- Timestamp pentru crearea locală
  createdAt TEXT NOT NULL
);
```

</div>
<div>

### Tabela `sync_queue`
Stochează operațiunile care trebuie trimise la server.
```sql
CREATE TABLE IF NOT EXISTS sync_queue (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  
  -- ID-ul notiței din tabela locală 'notes'
  note_id INTEGER NOT NULL,
  
  -- Tipul operațiunii (pentru acest exemplu, doar 'create')
  operation TEXT NOT NULL,
  
  -- Datele necesare pentru a trimite la server (în format JSON)
  payload TEXT NOT NULL,
  
  FOREIGN KEY (note_id) REFERENCES notes(id)
);
```
</div>
</div>

---
layout: cover
---

<script setup>
const code = `
import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useNetInfo } from '@react-native-community/netinfo';
import axios from 'axios';

// --- CONFIG ---
// Înlocuiește cu endpoint-ul tău de pe mockapi.io sau alt serviciu
const API_URL = 'https://63a1c51fba35b96522e70390.mockapi.io/notes'; 

export default function App() {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);
  const [database, setDatabase] = useState(null);
  const netInfo = useNetInfo();

  // --- SETUP DB & SYNC ---
  useEffect(() => {
    const initDatabase = async () => {
      try {
        const db = await SQLite.openDatabaseAsync('offline-notes.db');
        await db.execAsync(\`
          CREATE TABLE IF NOT EXISTS notes (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            content TEXT, 
            createdAt TEXT
          );
          CREATE TABLE IF NOT EXISTS sync_queue (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            note_id INTEGER, 
            operation TEXT, 
            payload TEXT
          );
        \`);
        setDatabase(db);
        fetchNotes(db);
      } catch (error) {
        console.error('Database initialization error:', error);
      }
    };
    initDatabase();
  }, []);
  
  // --- SYNC LOGIC ---
  useEffect(() => {
    if (netInfo.isInternetReachable && database) {
      console.log('Online, attempting to sync...');
      syncPendingNotes();
    }
  }, [netInfo.isInternetReachable, database]);

  const syncPendingNotes = async () => {
    if (!database) return;
    try {
      const pendingOps = await database.getAllAsync('SELECT * FROM sync_queue');
      for (const op of pendingOps) {
        try {
          const payload = JSON.parse(op.payload);
          await axios.post(API_URL, payload);
          await database.runAsync('DELETE FROM sync_queue WHERE id = ?', [op.id]);
          console.log('Synced note:', op.note_id);
        } catch (error) {
          console.error('Sync failed for note:', op.note_id, error);
        }
      }
    } catch (error) {
      console.error('Sync process error:', error);
    }
  };

  // --- CRUD OPERATIONS ---
  const fetchNotes = async (db = database) => {
    if (!db) return;
    try {
      const result = await db.getAllAsync('SELECT * FROM notes ORDER BY createdAt DESC');
      setNotes(result);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const addNote = async () => {
    if (!note || !database) return;
    const createdAt = new Date().toISOString();
    
    try {
      // 1. Adaugă notița local
      const result = await database.runAsync(
        'INSERT INTO notes (content, createdAt) VALUES (?, ?)', 
        [note, createdAt]
      );
      
      console.log('Note added locally with id:', result.lastInsertRowId);
      await fetchNotes();
      setNote('');

      const payload = { content: note, createdAt: createdAt };

      if (netInfo.isInternetReachable) {
        // 2a. Dacă suntem online, trimitem direct
        try {
          await axios.post(API_URL, payload);
        } catch (e) {
          console.error("Direct sync failed", e);
        }
      } else {
        // 2b. Dacă suntem offline, adăugăm în coada de sincronizare
        console.log('Offline, adding to sync queue...');
        await database.runAsync(
          'INSERT INTO sync_queue (note_id, operation, payload) VALUES (?, ?, ?)',
          [result.lastInsertRowId, 'create', JSON.stringify(payload)]
        );
      }
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notițe Offline-First</Text>
      <Text style={styles.status}>
        Status: {netInfo.isInternetReachable ? 'Online' : 'Offline'}
      </Text>
      <TextInput
        placeholder="Scrie o notiță..."
        value={note}
        onChangeText={setNote}
        style={styles.input}
      />
      <Button title="Adaugă Notiță" onPress={addNote} />
      <FlatList
        data={notes}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.noteItem}>
            <Text>{item.content}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, paddingHorizontal: 20 },
  header: { fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
  status: { textAlign: 'center', color: 'gray', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 10 },
  noteItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#ccc' },
});
`
const dependencies = 'expo-sqlite,@react-native-community/netinfo,axios'
</script>

<ExpoPreview :code="code" :dependencies="dependencies" name="Workshop: Aplicație de Notițe" />