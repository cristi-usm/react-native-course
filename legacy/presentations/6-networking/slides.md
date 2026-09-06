---
transition: slide-left
layout: cover
color: indigo-light
---

## Operații Asincrone & Networking

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Asincronicitatea în JavaScript

:: content ::

JavaScript este **single-threaded**, ceea ce înseamnă că poate executa o singură sarcină la un moment dat. Pentru a preveni blocarea interfeței în timpul operațiunilor lente (ex: cereri de rețea), JS folosește un model asincron, non-blocant, orchestrat de **Event Loop**.

<div class="grid grid-cols-3 gap-8 mt-8 text-center">
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-bg-color)] p-4 rounded-lg border border-[var(--neversink-admon-border-color)]">
    <h3 class="font-bold text-[var(--neversink-text-color)]">Callbacks</h3>
    <span class="text-sm">Modelul original, dar poate duce la cod greu de citit și întreținut, cunoscut ca "Callback Hell".</span>
  </div>
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-bg-color)] p-4 rounded-lg border border-[var(--neversink-admon-border-color)]">
    <h3 class="font-bold text-[var(--neversink-text-color)]">Promises</h3>
    <span class="text-sm">Un obiect ce reprezintă finalizarea (sau eșecul) unei operațiuni asincrone. Permite un cod mai curat și înlănțuirea operațiilor.</span>
  </div>
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-bg-color)] p-4 rounded-lg border border-[var(--neversink-admon-border-color)]">
    <h3 class="font-bold text-[var(--neversink-text-color)]">Async/Await</h3>
    <span class="text-sm">O sintaxă modernă, construită peste Promises, care face codul asincron să pară sincron, fiind mult mai intuitiv.</span>
  </div>
</div>

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Promises (Promisiuni)

:: content ::

Un `Promise` este un obiect care acționează ca un substituent pentru o valoare care va fi disponibilă în viitor. O promisiune poate avea una dintre următoarele trei stări:

<div class="ns-c-tight">

- **`pending`**: Starea inițială, operațiunea nu s-a finalizat încă.
- **`fulfilled`**: Operațiunea s-a finalizat cu succes, iar promisiunea are o valoare.
- **`rejected`**: Operațiunea a eșuat, iar promisiunea are un motiv (o eroare).

</div>

Interacționăm cu o promisiune folosind metodele `.then()`, `.catch()` și `.finally()`.

---
layout: center
---

```js
const myPromise = new Promise((resolve, reject) => {
  const succes = true; // Simulam o operatiune
  setTimeout(() => {
    if (succes) {
      resolve("Operațiune finalizată cu succes!");
    } else {
      reject("Ceva nu a mers bine.");
    }
  }, 1000);
});

myPromise
  .then(rezultat => {
    console.log(rezultat); // Va afișa mesajul de succes
  })
  .catch(eroare => {
    console.error(eroare); // Va afișa mesajul de eroare
  })
  .finally(() => {
    console.log("Operațiunea s-a încheiat."); // Se execută oricum
  });
```

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Async/Await

:: content ::

`Async/Await` este o abordare modernă care simplifică dramatic lucrul cu promisiunile.

<div class="ns-c-tight">

- **`async`**: Cuvântul cheie `async` se plasează înaintea unei declarații de funcție pentru a o transforma într-o funcție asincronă. O astfel de funcție returnează **întotdeauna** o promisiune.
- **`await`**: Operatorul `await` poate fi folosit **doar în interiorul** unei funcții `async`. Acesta "pune pe pauză" execuția funcției până când promisiunea de lângă el este rezolvată ( `fulfilled` sau `rejected` ) și apoi reia execuția.

</div>

Gestionarea erorilor se face elegant cu un bloc `try...catch`, similar cu codul sincron.

---
layout: center
---

```js
async function handlePromise() {
  try {
    console.log("Așteptăm rezultatul...");
    // Await "despachetează" valoarea din promisiune
    const rezultat = await myPromise; 
    console.log(rezultat);
  } catch (eroare) {
    console.error("A apărut o eroare:", eroare);
  } finally {
    console.log("Operațiunea s-a încheiat.");
  }
}

handlePromise();
```

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Modelul Asincron în Componente React

:: content ::

În React Native, cel mai comun model pentru a gestiona operațiunile asincrone (precum preluarea datelor) implică o combinație între `useState` și `useEffect`.

**Pașii Esențiali:**

<div class="ns-c-tight">

1.  **Definirea Stărilor (States)**: Se folosește `useState` pentru a gestiona stările cheie ale procesului:
    -   `data`: Pentru a stoca datele primite cu succes.
    -   `loading`: Un boolean pentru a afișa un indicator de încărcare.
    -   `error`: Pentru a stoca orice eroare apărută.

2.  **Declanșarea Efectului**: Se folosește `useEffect` cu un array de dependențe gol (`[]`) pentru a executa operațiunea asincronă o singură dată, la montarea componentei.

3.  **Execuția Logicii Asincrone**: În interiorul `useEffect`, se definește o funcție `async` care:
    -   Setează `loading` pe `true`.
    -   Execută operațiunea (ex: `fetch`) într-un bloc `try`.
    -   La succes, actualizează starea `data` și setează `loading` pe `false`.
    -   La eșec, actualizează starea `error` în blocul `catch` și setează `loading` pe `false`.

</div>

---
layout: cover
---

<script setup>
const code = `
import { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Button } from 'react-native';

export default function AsyncComponentPattern() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchTrigger, setFetchTrigger] = useState(0);

  useEffect(() => {
    // Definim o funcție asincronă în interiorul useEffect
    const fetchData = async () => {
      setLoading(true); // 1. Începe încărcarea
      setError(null);
      
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        if (!response.ok) {
          throw new Error('Eroare de rețea!');
        }
        const json = await response.json();
        setData(json); // 2. Datele au fost primite cu succes
      } catch (e) {
        setError(e.message); // 3. A apărut o eroare
      } finally {
        setLoading(false); // 4. Încărcarea s-a terminat (indiferent de rezultat)
      }
    };

    fetchData();
    
  }, [fetchTrigger]); // Rulează la montare și când fetchTrigger se schimbă

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }
    if (error) {
      return <Text style={styles.errorText}>Eroare: {error}</Text>;
    }
    if (data) {
      return <Text style={styles.dataText}>Titlu: {data.title}</Text>;
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {renderContent()}
      <Button title="Reîncarcă Datele" onPress={() => setFetchTrigger(c => c + 1)} />
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
  dataText: {
    fontSize: 18,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'red',
  }
});
`
</script>

<ExpoPreview :code="code" name="Modelul Async în Componente" />


## Modulul 2: Networking cu Fetch API

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Ce este Fetch API?

:: content ::

**Fetch API** este interfața modernă, nativă în React Native (și în browsere), pentru a efectua cereri de rețea. Este o unealtă puternică și flexibilă, bazată pe **Promises**, care a înlocuit vechiul `XMLHttpRequest`.

Fetch API oferă o metodă globală `fetch()` care reprezintă o modalitate simplă și logică de a prelua resurse de pe rețea în mod asincron.

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Structura de Bază a unei Cereri `GET`:

:: content ::
```js
fetch('https://api.example.com/data')
  .then(response => {
    // Verificăm dacă răspunsul este OK (status 200-299)
    if (!response.ok) {
      throw new Error('Răspunsul rețelei nu a fost ok');
    }
    return response.json(); // Parsăm corpul răspunsului ca JSON
  })
  .then(data => {
    console.log('Date primite:', data);
  })
  .catch(error => {
    console.error('A apărut o problemă cu operațiunea fetch:', error);
  });
```

<AdmonitionType type="info">

Metoda `fetch()` returnează o promisiune care se rezolvă cu un obiect `Response`, **nu** cu datele JSON efective. Pentru a extrage corpul JSON, trebuie să folosim metoda `response.json()`, care la rândul ei returnează o promisiune.

</AdmonitionType>

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Operațiuni de Bază: Citire (GET) și Creare (POST)

:: content ::

Metoda `fetch()` poate fi configurată pentru diferite metode HTTP printr-un al doilea argument, un obiect de opțiuni.

<div class="grid grid-cols-2 gap-8 mt-4">
<div>

### GET (Citire)

Este metoda implicită. Se folosește pentru a prelua date de la un server. Nu necesită configurări suplimentare pentru o cerere simplă.

```js
// Simplu și direct
fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(res => res.json())
  .then(data => console.log(data));
```

</div>
<div>

### POST (Creare)

Se folosește pentru a trimite date noi către server. Necesită configurarea `method`, `headers` și `body`.

```js
fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'foo',
    body: 'bar',
    userId: 1,
  }),
})
.then(res => res.json())
.then(data => console.log('Postare creată:', data));
```

</div>
</div>

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Operațiuni de Bază: Actualizare (PUT/PATCH) și Ștergere (DELETE)

:: content ::

Similar cu POST, actualizarea și ștergerea resurselor se fac prin specificarea metodei HTTP corespunzătoare în obiectul de configurare.

<div class="grid grid-cols-2 gap-8 mt-4">
<div>

### PUT (Actualizare/Înlocuire)

Se folosește pentru a actualiza o resursă existentă. De obicei, `PUT` înlocuiește întreaga resursă cu datele trimise.

```js
fetch('https://jsonplaceholder.typicode.com/posts/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    id: 1,
    title: 'titlu actualizat',
    body: 'corp actualizat',
    userId: 1,
  }),
});
```




</div>
<div>

### DELETE (Ștergere)

Se folosește pentru a șterge o resursă de pe server. De obicei, nu necesită un `body`.

```js
fetch('https://jsonplaceholder.typicode.com/posts/1', {
  method: 'DELETE',
});
```

<AdmonitionType type="tip">

`PATCH` este similar, dar se folosește pentru actualizări parțiale.
</AdmonitionType>
</div>
</div>

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Gestionarea Erorilor și Răspunsurilor

:: content ::

Gestionarea corectă a erorilor este crucială pentru a construi aplicații robuste.

**Tipuri de Erori:**

<div class="ns-c-tight">

- **Erori de Rețea**: Acestea apar atunci când cererea nu poate fi finalizată deloc (ex: fără conexiune la internet). Aceste erori vor face ca promisiunea `fetch` să fie respinsă (`rejected`), fiind prinse în blocul `.catch()`.

- **Erori HTTP (Status Codes)**: Un răspuns de la server cu un cod de stare `4xx` (ex: 404 Not Found) sau `5xx` (ex: 500 Internal Server Error) **NU** este considerat o eroare de rețea. Promisiunea `fetch` va fi îndeplinită (`fulfilled`). Este responsabilitatea noastră să verificăm proprietatea `response.ok` (care este `true` pentru statusuri între 200-299) și să aruncăm o eroare manual dacă este necesar.

</div>

---
layout: center
---

```js
async function fetchData() {
  try {
    const response = await fetch('https://httpstat.us/404'); // URL care returnează 404
    
    // Verificăm manual statusul răspunsului
    if (!response.ok) {
      throw new Error(`Eroare HTTP! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    
  } catch (error) {
    // Aici prindem atât erorile de rețea, cât și cele aruncate manual
    console.error('Eroare la preluarea datelor:', error.message);
  }
}
```

---
layout: cover
---

<script setup>
const code = `
import { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Button, FlatList, Alert } from 'react-native';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export default function FetchExample() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Funcție pentru a prelua postările
  const getPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Eroare la preluarea postărilor');
      const json = await response.json();
      setPosts(json.slice(0, 10)); // Afișăm doar primele 10
    } catch (error) {
      Alert.alert('Eroare', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Funcție pentru a adăuga o postare nouă
  const addPost = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Postare Nouă',
          body: 'Acesta este corpul postării.',
          userId: 1,
        }),
      });
      if (!response.ok) throw new Error('Nu s-a putut adăuga postarea');
      const newPost = await response.json();
      setPosts(prevPosts => [newPost, ...prevPosts]);
      Alert.alert('Succes', 'Postarea a fost adăugată!');
    } catch (error) {
      Alert.alert('Eroare', error.message);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  if (loading) {
    return <ActivityIndicator style={styles.container} size="large" />;
  }

  return (
    <View style={styles.container}>
      <Button title="Adaugă o Postare Nouă" onPress={addPost} />
      <FlatList
        data={posts}
        keyExtractor={({ id }) => id.toString()}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Text style={styles.title}>{item.id}. {item.title}</Text>
            <Text>{item.body}</Text>
          </View>
        )}
        style={{width: '100%25'}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f5f5f5'
  },
  post: {
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginVertical: 5,
    borderRadius: 5
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
`
</script>

<ExpoPreview :code="code" name="Exemplu Fetch API" />

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# De Ce Să Folosim o Librărie Externă?

:: content ::

Deși `Fetch API` este puternic și integrat, lucrul direct cu el poate deveni repetitiv, în special în aplicații complexe. Librăriile de networking, precum **Axios**, oferă un nivel de abstracție care simplifică dramatic codul.

**Avantajele Utilizării Axios:**

<div class="ns-c-tight">

- **API Mai Simplu și Intuitiv**: Metode dedicate (`axios.get`, `axios.post`) și o gestionare mai directă a configurației.
- **Transformare Automată a Datelor**: Convertește automat datele trimise în JSON și parsează răspunsurile JSON, eliminând pașii `JSON.stringify()` și `response.json()`.
- **Gestionare Superioară a Erorilor**: Spre deosebire de `fetch`, Axios respinge promisiunea automat la statusuri HTTP de eroare (4xx, 5xx), simplificând blocurile `catch`.
- **Configurare Globală și Instanțe**: Permite crearea de instanțe pre-configurate (ex: cu un `baseURL` și `headers` implicite) care pot fi refolosite în întreaga aplicație.
- **Interceptori (Interceptors)**: O funcționalitate extrem de puternică pentru a injecta logică în fiecare cerere sau răspuns (ex: adăugarea automată a token-urilor de autentificare).

</div>

**Instalare:**
```bash
npm install axios
```

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Axios: Cereri de Bază

:: content ::

Sintaxa pentru operațiunile de bază este mai concisă și mai lizibilă comparativ cu `fetch`.

<div class="grid grid-cols-2 gap-8 mt-4">
<div>

### GET cu Axios

```js
import axios from 'axios';

async function getPost() {
  try {
    // Răspunsul conține datele direct în proprietatea `data`
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    console.log(response.data);
  } catch (error) {
    // Prinde atât erorile de rețea, cât și cele HTTP (4xx, 5xx)
    console.error('Eroare Axios:', error.message);
  }
}
```

</div>
<div>

### POST cu Axios

```js
import axios from 'axios';

async function createPost() {
  try {
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
      title: 'foo',
      body: 'bar',
      userId: 1,
    });
    console.log('Postare creată:', response.data);
  } catch (error) {
    console.error(error);
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

# Interceptori Axios

:: content ::

Interceptorii sunt funcții care pot fi "atașate" unei instanțe Axios pentru a rula cod **înainte** ca o cerere să fie trimisă sau **înainte** ca un răspuns să fie procesat de `.then()` sau `.catch()`.

Acest mecanism este perfect pentru logica transversală (cross-cutting concerns).

**Cazuri de Utilizare Comune:**

<div class="ns-c-tight">

- **Interceptori de Cerere (Request Interceptors)**:
  - Adăugarea automată a unui `Authorization header` (ex: `Bearer token`) la fiecare cerere către un API protejat.
  - Adăugarea de log-uri pentru debugging.
  - Modificarea configurației cererii înainte de a fi trimisă.

- **Interceptori de Răspuns (Response Interceptors)**:
  - Gestionarea globală a erorilor (ex: redirectare la ecranul de login la un status `401 Unauthorized`).
  - Reîncercarea automată a cererilor eșuate.
  - Transformarea datelor primite într-un format specific, înainte de a ajunge în componentă.

</div>

---
layout: center
---

```js
import axios from 'axios';

// Creăm o instanță Axios cu configurare globală
const apiClient = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 1000,
});

// Adăugăm un interceptor de cerere
apiClient.interceptors.request.use(async (config) => {
  // Preluăm token-ul din AsyncStorage sau SecureStore
  const token = await getTokenFromStorage(); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Acum, orice cerere făcută cu `apiClient` va avea automat header-ul de autorizare
// apiClient.get('/profile');
```

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Comunicare în Timp Real: WebSockets

:: content ::

În timp ce HTTP este un protocol de tip "request-response" (clientul cere, serverul răspunde), **WebSockets** oferă o conexiune **bidirecțională** și **persistentă** între client și server. Odată stabilită, serverul poate trimite date clientului ("push") în orice moment, fără ca acesta să mai facă o cerere.

**Cazuri de Utilizare:**

<div class="grid grid-cols-2 gap-8 mt-4">
  <div>
    <ul class="ns-c-tight">
        <li>Aplicații de Chat</li>
        <li>Notificări Live</li>
        <li>Dashboard-uri cu date în timp real</li>
        <li>Jocuri Multiplayer</li>
        <li>Editare Colaborativă de Documente</li>
    </ul>
  </div>
  <div>
      <img src="/6-networking/websocket.jpg" class="w-60 rounded-lg" alt="Diagrama HTTP vs WebSocket"/>
  </div>
</div>

React Native oferă un API `WebSocket` nativ, dar pentru funcționalități avansate (reconectare automată, camere/canale), se folosesc adesea librării precum **Socket.IO**.

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Încărcarea de Fișiere (File Uploads)

:: content ::

Pentru a trimite fișiere (imagini, documente, video) către un server, nu putem folosi un simplu obiect JSON. Se utilizează un obiect special numit **`FormData`**, care poate încapsula atât câmpuri de text, cât și fișiere.

Standardul pentru trimiterea unor astfel de date este `multipart/form-data`.

**Pașii Esențiali:**

<div class="ns-c-tight">

1.  **Obținerea fișierului**: Folosind o librărie precum `expo-image-picker`, utilizatorul selectează un fișier de pe dispozitiv. Rezultatul este un obiect care conține URI-ul local al fișierului, tipul, numele, etc.

2.  **Crearea obiectului `FormData`**: Se creează o nouă instanță de `FormData`.

3.  **Adăugarea câmpurilor**: Se adaugă fișierul la obiectul `FormData` folosind metoda `.append()`. Este crucial să se structureze corect obiectul fișierului, inclusiv `uri`, `name` și `type`. Se pot adăuga și alte câmpuri de text.

4.  **Trimiterea cererii**: Se face o cerere `POST` (de obicei) cu `FormData` ca `body`. Librării precum `axios` sau `fetch` vor seta automat header-ul `Content-Type` la `multipart/form-data`.

</div>

---
layout: cover
---

<script setup>
const code = `
import { useState } from 'react';
import { View, Button, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function FileUploadExample() {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const uploadImage = async () => {
    if (!image) return;
    setUploading(true);

    const formData = new FormData();
    
    // Numele field-ului ('file') depinde de ce așteaptă server-ul
    formData.append('file', {
      uri: image.uri,
      name: \`photo_\${Date.now()}.jpg\`,
      type: 'image/jpeg',
    });
    formData.append('userId', '123'); // Exemplu de alt câmp

    try {
      // Într-o aplicație reală, înlocuiți cu URL-ul server-ului dvs.
      const response = await axios.post('https://httpbin.org/post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Răspuns upload:', response.data);
      Alert.alert('Succes', 'Imaginea a fost încărcată!');
    } catch (error) {
      console.error(error);
      Alert.alert('Eroare', 'Nu s-a putut încărca imaginea.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Alege o Imagine din Galerie" onPress={pickImage} />
      {image && <Image source={{ uri: image.uri }} style={styles.image} />}
      <Button 
        title={uploading ? "Se încarcă..." : "Încarcă Imaginea"} 
        onPress={uploadImage} 
        disabled={!image || uploading} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10
  },
});
`
const dependencies = 'axios,expo-image-picker'
</script>

<ExpoPreview :code="code" :dependencies="dependencies" name="Exemplu File Upload" />


---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Problema Stării de pe Server

:: content ::

Până acum, am folosit `useState` și `useEffect` pentru a gestiona datele de la server. Acest model funcționează, dar devine rapid complex și ineficient în aplicații reale.

**Dezavantajele modelului `useState` + `useEffect`:**

<div class="ns-c-tight">

- **Cod Repetitiv (Boilerplate)**: Pentru fiecare cerere, trebuie să scriem aceeași logică pentru a gestiona stările `loading`, `error` și `data`.
- **Fără Caching**: Dacă o componentă este demontată și remontată, datele sunt preluate din nou de la server, chiar dacă nu s-au schimbat.
- **Fără Reîmprospătare Automată**: Datele devin rapid "învechite" (`stale`). Nu există un mecanism automat pentru a le reîmprospăta în fundal.
- **Gestionare Dificilă a Stării Globale**: Sincronizarea datelor între mai multe componente care folosesc aceeași resursă este dificilă și poate duce la cereri multiple redundante.

</div>

<AdmonitionType type="info">

Trebuie să facem o distincție clară între **Client State** (starea UI-ului, ex: un formular) și **Server State** (datele care "trăiesc" pe backend-ul nostru și pe care noi doar le "oglindim" temporar).

</AdmonitionType>

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Soluția: TanStack Query (fostul React Query)

:: content ::

**TanStack Query** este o librărie specializată în gestionarea stării de pe server. Nu este o librărie de state management global (precum Redux), ci o unealtă puternică pentru preluarea, stocarea în cache și actualizarea datelor asincrone.

**Cum ne ajută?**

<div class="grid grid-cols-2 gap-8 mt-4">
<div>

### Simplifică Preluarea Datelor

Înlocuiește complet logica `useState` + `useEffect` cu un singur hook, `useQuery`, care gestionează automat stările de încărcare, eroare și succes.

</div>
<div>

### Caching Inteligent

Păstrează datele în cache. Când o componentă solicită din nou aceleași date, le primește instant din cache și declanșează o reîmprospătare în fundal (strategia "stale-while-revalidate").

</div>
<div>

### Sincronizare Automată

Reîmprospătează automat datele la evenimente precum re-focusarea ferestrei sau reconectarea la rețea, asigurând că utilizatorul vede mereu date actualizate.

</div>
<div>

### Performanță

Reduce dramatic numărul de cereri de rețea prin dedublarea cererilor identice și prin servirea datelor din cache.

</div>
</div>

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Setup-ul TanStack Query

:: content ::

Pentru a folosi librăria, trebuie să parcurgem doi pași simpli de configurare:

1.  **Instalarea Pachetului:**
    ```bash
    npm install @tanstack/react-query
    ```

2.  **Configurarea Provider-ului:**
    Similar cu Context API, întreaga aplicație trebuie învelită într-un `QueryClientProvider`. Acesta gestionează cache-ul și starea tuturor interogărilor (queries) din aplicație.

---
layout: center
---

```js
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// 1. Creăm o instanță a clientului
const queryClient = new QueryClient();

export default function App() {
  return (
    // 2. Furnizăm clientul întregii aplicații
    <QueryClientProvider client={queryClient}>
      {/* Restul aplicației, inclusiv navigatorii */}
      <MyAppComponent />
    </QueryClientProvider>
  );}
```

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Preluarea Datelor cu `useQuery`

:: content ::

Hook-ul `useQuery` este piesa centrală pentru citirea datelor. Are nevoie de două argumente principale:

<div class="ns-c-tight">

- **`queryKey`**: Un array care identifică unic această interogare. TanStack Query folosește această cheie pentru caching. De obicei, conține un string și orice variabile de care depinde interogarea.
- **`queryFn`**: O funcție **asincronă** care returnează o promisiune ce se rezolvă cu datele dorite. Aici se face cererea `fetch` sau `axios`.

</div>

`useQuery` returnează un obiect cu starea curentă a interogării:

<div class="ns-c-tight">

- `data`: Datele returnate cu succes.
- `isLoading`: `true` dacă este prima încărcare și nu există date în cache.
- `isFetching`: `true` dacă o reîmprospătare în fundal este în curs.
- `isError`: `true` dacă interogarea a eșuat.
- `error`: Obiectul erorii.

</div>

---
layout: center
---

```js
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
// Funcția care preia datele
const fetchTodos = async () => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos');
  return data;
};

function TodoList() {
  // Folosim hook-ul useQuery
  const { data, isLoading, isError, error } = useQuery({ 
    queryKey: ['todos'], 
    queryFn: fetchTodos 
  });

  if (isLoading) {
    return <Text>Se încarcă...</Text>;
  }
  if (isError) {
    return <Text>Eroare: {error.message}</Text>;
  }

  // Acum putem folosi 'data' pentru a randa lista
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <Text>{item.title}</Text>}
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

# Modificarea Datelor cu `useMutation`

:: content ::

Pentru operațiunile care modifică datele pe server (POST, PUT, DELETE), folosim hook-ul `useMutation`.

`useMutation` primește o funcție asincronă care efectuează modificarea și returnează un obiect cu starea mutației.

**Pașii Esențiali:**

<div class="ns-c-tight">

1.  **Definirea Mutației**: Se apelează `useMutation` cu funcția care trimite datele la server.
2.  **Apelarea Mutației**: Hook-ul returnează o funcție (`mutate`) pe care o apelăm pentru a declanșa operațiunea.
3.  **Invalidarea Query-urilor**: După ce mutația are succes, trebuie să-i spunem lui TanStack Query că datele aferente (ex: lista de postări) sunt "învechite" și trebuie reîmprospătate. Acest lucru se face cu `queryClient.invalidateQueries()`.

</div>

---
layout: center
---

```js
import { useMutation, useQueryClient } from '@tanstack/react-query';

// ...

function AddTodoComponent() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newTodo) => {
      // Funcția care face cererea POST
      return axios.post('https://jsonplaceholder.typicode.com/todos', newTodo);
    },
    onSuccess: () => {
      // La succes, invalidăm query-ul 'todos'
      // Acest lucru va face ca orice componentă care folosește ['todos'] să se reîmprospăteze automat
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      Alert.alert('Succes', 'Todo adăugat!');
    },
  });
  const handleAddTodo = () => {
    mutation.mutate({ title: 'Un nou todo', completed: false });
  };

  return (
    <Button 
      title={mutation.isPending ? 'Se adaugă...' : 'Adaugă Todo'} 
      onPress={handleAddTodo} 
      disabled={mutation.isPending}
    />);
}
```

---
layout: cover
---

<script setup>
const code = `
import { View, Text, ActivityIndicator, StyleSheet, Button, FlatList, Alert } from 'react-native';
import { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
const queryClient = new QueryClient();
const API_URL = 'https://jsonplaceholder.typicode.com/posts';
// --- Funcțiile de API ---
const getPosts = async () => {
  const { data } = await axios.get(API_URL);
  return data.slice(0, 10); // Afișăm doar primele 10
};

const addPost = async (newPost) => {
  const { data } = await axios.post(API_URL, newPost);
  return data;
};

// --- Componenta Principală ---
function PostsComponent() {
  const queryClient = useQueryClient();

  // Query pentru a prelua postările
  const { data: posts, isLoading, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  // Mutație pentru a adăuga o postare
  const mutation = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      // Invalidate și refetch
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      Alert.alert('Succes', 'Postarea a fost adăugată!');
    },
    onError: () => {
      Alert.alert('Eroare', 'Nu s-a putut adăuga postarea');
    }
  });

  const handleAddPost = () => {
    mutation.mutate({ title: 'Titlu Nou', body: 'Un nou conținut' });
  };
  
  if (isLoading) return <ActivityIndicator size="large" />;
  if (isError) return <Text style={styles.error}>A apărut o eroare.</Text>;

  return (
    <View style={styles.container}>
      <Button
        title={mutation.isPending ? 'Se adaugă...' : 'Adaugă Postare Nouă'}
        onPress={handleAddPost}
        disabled={mutation.isPending}
      />
      <FlatList
        data={posts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Text style={styles.title}>{item.id}. {item.title}</Text>
          </View>
        )}
        style={{ width: '100%25' }}
      />
    </View>
  );
}

// --- Componenta Rădăcină cu Provider ---
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PostsComponent />
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    paddingTop: 40, 
    paddingHorizontal: 10, 
    alignItems: 'center' 
  },
  post: { 
    padding: 15, 
    backgroundColor: 'white', 
    borderWidth: 1, 
    borderColor: '#eee', 
    marginVertical: 5, 
    borderRadius: 5 
    },
  title: { 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  error: { 
    color: 'red', 
    fontSize: 18, 
    textAlign: 'center' 
  }
});
`
const dependencies = '@tanstack/react-query,axios'
</script>

<ExpoPreview :code="code" :dependencies="dependencies" name="Exemplu TanStack Query" />


---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Ce este GraphQL?

:: content ::

**GraphQL** este un limbaj de interogare (query language) pentru API-uri și un runtime pentru a executa acele interogări cu datele existente. A fost creat de Facebook ca o alternativă mai flexibilă și eficientă la arhitectura tradițională **REST**.

Spre deosebire de REST, unde ai multiple endpoint-uri care returnează structuri de date fixe (ex: `/users`, `/posts/:id`), GraphQL expune un **singur endpoint** care răspunde la interogări complexe.

**REST vs. GraphQL:**

<div class="grid grid-cols-2 gap-8 mt-4 text-center">
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-admon-bg-color)] p-4 rounded-lg border border-[var(--neversink-admon-border-color)]">
    <h3 class="font-bold text-[var(--neversink-text-color)]">REST API</h3>
    <span class="text-sm">Server-ul definește ce date primești. Pentru a obține un utilizator și postările sale, ai nevoie de cel puțin două cereri (ex: `/users/1` și `/posts?userId=1`). Acest lucru poate duce la <strong>over-fetching</strong> (primirea de date inutile) sau <strong>under-fetching</strong> (nevoia de cereri suplimentare).</span>
  </div>
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-admon-bg-color)] p-4 rounded-lg border border-[var(--neversink-admon-border-color)]">
    <h3 class="font-bold text-[var(--neversink-text-color)]">GraphQL</h3>
    <span class="text-sm">Clientul specifică <strong>exact</strong> ce date dorește. Poți cere utilizatorul și postările sale într-o singură cerere, primind un singur răspuns JSON care oglindește structura interogării. Rezolvă problemele de over/under-fetching.</span>
  </div>
</div>

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Conceptele de Bază GraphQL

:: content ::

GraphQL are trei tipuri principale de operațiuni, definite într-o schemă tipizată puternic.

<div class="grid grid-cols-3 gap-8 mt-8 text-center">
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-admon-bg-color)] p-4 rounded-lg border border-[var(--neversink-admon-border-color)]">
    <h3 class="font-bold text-[var(--neversink-text-color)]">Queries (Interogări)</h3>
    <span class="text-sm">

Folosite pentru a **citi** sau a prelua date. Sunt echivalentul cererilor `GET` din REST.

</span>

<div class="text-left"> 

```graphql
query GetUser {
  user(id: "1") {
    name
    email
  }
}
```

</div>    
  </div>
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-admon-bg-color)] p-4 rounded-lg border border-[var(--neversink-admon-border-color)]">
    <h3 class="font-bold text-[var(--neversink-text-color)]">Mutations (Mutații)</h3>
    <span class="text-sm">
    
Folosite pentru a **scrie** sau a modifica date (creare, actualizare, ștergere). Sunt echivalentul `POST`, `PUT`, `DELETE`.

</span>

<div class="text-left"> 

```graphql
mutation CreatePost {
  createPost(title: "Titlu nou", content: "...") {
    id
    title
  }
}
```
</div> 

  </div>
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-admon-bg-color)] p-4 rounded-lg border border-[var(--neversink-admon-border-color)]">
    <h3 class="font-bold text-[var(--neversink-text-color)]">Subscriptions (Abonamente)</h3>
    <span class="text-sm">Permit unui client să mențină o conexiune în timp real cu serverul și să primească date noi pe măsură ce apar. Sunt echivalentul WebSockets.</span>

<div class="text-left"> 

```graphql
subscription NewComment {
  newComment(postId: "123") {
    id
    content
  }
}
```
  </div>
  </div>
</div>

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Utilizarea GraphQL cu Apollo Client

:: content ::

**Apollo Client** este clientul GraphQL de facto pentru aplicațiile React și React Native. Este o librărie completă de state management care gestionează inteligent datele GraphQL, oferind caching, sincronizare UI și multe altele.

**Pașii de Setup:**

1.  **Instalarea Pachetului:**
```bash
npm install @apollo/client graphql
```

2.  **Configurarea Provider-ului:**
    Similar cu TanStack Query, aplicația trebuie învelită într-un `ApolloProvider`, care este configurat cu o instanță a clientului. Clientul trebuie să știe URL-ul endpoint-ului GraphQL și cum să gestioneze cache-ul.

---
layout: center
---

```js

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// 1. Inițializează clientul Apollo
const client = new ApolloClient({
  uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index', // Un API GraphQL public pentru testare
  cache: new InMemoryCache(),
});

// 2. Imbrică aplicația în provider
function App() {
  return (
    <ApolloProvider client={client}>
      <MyAppComponent />
    </ApolloProvider>
  );
}
```

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Hook-urile Apollo: `useQuery` și `useMutation`

:: content ::

Apollo Client oferă hook-uri similare cu TanStack Query pentru a interacționa cu API-ul GraphQL.

<div class="grid grid-cols-2 gap-8 mt-4">
<div>

### `useQuery`

Folosit pentru a executa o interogare GraphQL. Primește interogarea (definită cu tag-ul `gql`) și returnează starea (`loading`, `error`, `data`).

```js
import { gql, useQuery } from '@apollo/client';
const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      id
      name
      description
    }
  }
`;
function Locations() {
  const { loading, error, data } = useQuery(GET_LOCATIONS);
  // ... gestionează stările și randează datele
}
```

</div>
<div>

### `useMutation`

Folosit pentru a executa o mutație. Returnează o funcție pentru a declanșa mutația și starea operațiunii.

```js
const ADD_TODO = gql`
  mutation AddTodo($text: String!) {
    addTodo(text: $text) {
      id
      text
    }
  }
`;
function AddTodo() {
  const [addTodo, { data, loading, error }] = useMutation(ADD_TODO);
  const handlePress = () => {
    addTodo({ variables: { text: "Un nou todo" } });
  };
  // ...
}
```

</div>
</div>

---
layout: cover
---

<script setup>
const code = `
import { View, Text, ActivityIndicator, StyleSheet, FlatList, Button } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';

// --- Setup Apollo Client ---
const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com/', // API public GraphQL cu țări
  cache: new InMemoryCache(),
});

// --- Interogarea GraphQL ---
const GET_COUNTRIES = gql\`
  query GetCountries {
    countries(filter: { continent: { eq: "EU" } }) {
      code
      name
      capital
    }
  }
\`;

// --- Componenta care folosește datele ---
function CountriesList() {
  const { loading, error, data } = useQuery(GET_COUNTRIES);

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text style={styles.error}>Eroare: {error.message}</Text>;

  return (
    <FlatList
      data={data.countries}
      keyExtractor={item => item.code}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{item.name} ({item.code})</Text>
          <Text>Capitala: {item.capital || 'N/A'}</Text>
        </View>
      )}
    />
  );
}

// --- Componenta Rădăcină cu Provider ---
export default function App() {
  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <Text style={styles.header}>Țări din Europa</Text>
        <CountriesList />
      </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  item: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  }
});
`
const dependencies = '@apollo/client,graphql'
</script>

<ExpoPreview :code="code" :dependencies="dependencies" name="Exemplu Apollo Client" />